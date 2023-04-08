+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["nestjs"]
date = 2023-03-31T09:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["nestjs"]
thumbnail = ""
title = "Monitorando sua aplicação NestJS com Prometheus e Grafana"

+++
### Introdução

Neste artigo, aprenderemos como monitorar sua aplicação NestJS usando o Prometheus e o Grafana. O Prometheus é uma solução de monitoramento e alerta de código aberto, enquanto o Grafana é uma plataforma de análise e visualização de métricas. Juntos, eles ajudam a manter sua aplicação estável e a detectar problemas antes que afetem os usuários.

### Pré-requisitos

Para seguir este tutorial, você precisará:

* Ter um projeto NestJS existente
* Conhecimento básico de TypeScript e NestJS
* Docker e Docker Compose instalados (para executar o Prometheus e o Grafana)

Configurando o Prometheus e o Grafana

1. Crie um arquivo chamado **`docker-compose.yml`** na raiz do projeto com o seguinte conteúdo:

       version: '3.8'
       services:
       prometheus:
       image: prom/prometheus
       ports:
       - '9090:9090'
       volumes:
       - './prometheus.yml:/etc/prometheus/prometheus.yml'
       
       grafana:
       image: grafana/grafana
       ports:
       - '3001:3000'
2. Crie um arquivo chamado **`prometheus.yml`** na raiz do projeto com o seguinte conteúdo:

       global:
       scrape_interval: 15s
       
       scrape_configs:
       
       job_name: 'nestjs_app'
       static_configs:
       
       targets: ['host.docker.internal:3000']
3. Inicie o Prometheus e o Grafana com o Docker Compose:

   docker-compose up -d

Integrando o NestJS com o Prometheus

1. Instale o pacote **`@nestjs/metrics`**:

   npm install --save @nestjs/metrics
2. Importe o módulo **`MetricsModule`** no arquivo **`app.module.ts`**:

       import { MetricsModule } from '@nestjs/metrics';
       
       @Module({
         imports: [
           MetricsModule.forRoot({
             defaultLabels: {
               app: 'nestjs_app',
             },
             route: {
               path: '/metrics',
               enableGcMetrics: true,
             },
           }),
           // ...
         ],
         // ...
       })
       export class AppModule {}
3. Inicie sua aplicação NestJS:

   npm run start
4. Verifique se as métricas estão disponíveis acessando **`http://localhost:3000/metrics`**.

### Configurando o Grafana

1. Acesse o Grafana em **`http://localhost:3001`** e faça login com as credenciais padrão (usuário: **`admin`**, senha: **`admin`**).
2. Adicione o Prometheus como fonte de dados:
   * Clique em "Configuration" (ícone de engrenagem) no menu lateral.
   * Clique em "Data Sources" e depois em "Add data source".
   * Selecione "Prometheus" e configure a URL como **`http://localhost:9090`**.
   * Clique em "Save & Test" para verificar a conexão e salvar a configuração.
3. Crie um painel para visualizar as métricas:
   * Clique em "Create" (ícone de adição) no menu lateral e selecione "Dashboard".
   * Adicione um gráfico ou qualquer outro elemento visual e configure a consulta para exibir as métricas desejadas. Por exemplo, você pode usar a seguinte consulta para visualizar o tempo médio de resposta da sua aplicação:

         rate(http_request_duration_seconds_sum{app="nestjs_app"}[1m]) / rate(http_request_duration_seconds_count{app="nestjs_app"}[1m])
     1. Personalize o painel conforme necessário, adicionando mais elementos visuais e ajustando suas consultas para exibir outras métricas relevantes. Algumas métricas comuns incluem:
        * **`http_requests_total{app="nestjs_app"}`**: Total de solicitações HTTP recebidas pela aplicação.
        * **`http_request_duration_seconds_count{app="nestjs_app"}`**: Contagem de duração das solicitações HTTP.
        * **`process_cpu_seconds_total{app="nestjs_app"}`**: Tempo total da CPU gasto pelo processo.
     2. Salve seu painel para consultá-lo mais tarde. Você também pode criar alertas com base nas métricas monitoradas para notificá-lo quando algo estiver errado.

     ### Conclusão

     Neste tutorial, aprendemos como monitorar uma aplicação NestJS usando Prometheus e Grafana. Com essas ferramentas, você pode acompanhar o desempenho de sua aplicação, identificar gargalos e garantir que ela esteja funcionando de maneira eficiente.

     Agora que você sabe como monitorar sua aplicação, considere explorar outros recursos do NestJS para melhorar ainda mais seu projeto. Além disso, você pode integrar outras soluções de monitoramento, como o ELK Stack (Elasticsearch, Logstash e Kibana), para obter insights ainda mais detalhados sobre o desempenho e a saúde de sua aplicação.
