+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["nestjs"]
date = 2023-04-02T03:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["elk stack", "nestjs"]
thumbnail = ""
title = "Monitorando e Exibindo Logs Centralizados com NestJS e ELK Stack"

+++
### Introdução 

Neste artigo, vamos aprender como monitorar e exibir logs centralizados com NestJS e a ELK Stack (Elasticsearch, Logstash e Kibana). A ELK Stack é uma solução popular e eficiente para agregar, analisar e visualizar logs de aplicativos. Vamos explorar como configurar e utilizar essa poderosa combinação para monitorar e gerenciar logs em uma aplicação NestJS.

### Pré-requisitos 

Antes de começar, certifique-se de ter o seguinte instalado em seu sistema:

* Node.js (v14+)
* Yarn ou NPM (gerenciadores de pacotes)
* Docker e Docker Compose
* Uma aplicação NestJS existente (você pode usar um projeto anterior ou criar um novo)

### Configurando o ambiente ELK com Docker

1. Crie um arquivo **`docker-compose.yml`** na raiz do seu projeto NestJS com o seguinte conteúdo:

    version: '3.7'
    services:
      elasticsearch:
        image: docker.elastic.co/elasticsearch/elasticsearch:7.16.2
        environment:
          - discovery.type=single-node
        ports:
          - "9200:9200"
        networks:
          - elk
    
      kibana:
        image: docker.elastic.co/kibana/kibana:7.16.2
        ports:
          - "5601:5601"
        networks:
          - elk
    
      logstash:
        build: logstash/
        ports:
          - "5000:5000"
        networks:
          - elk
    
    networks:
      elk:
        driver: bridge
    

2. Crie uma pasta chamada **`logstash`** na raiz do seu projeto e crie um arquivo **`Dockerfile`** dentro dela com o seguinte conteúdo:

    dockerfileCopy codeFROM docker.elastic.co/logstash/logstash:7.16.2
    COPY logstash.conf /usr/share/logstash/pipeline/
    

3. Ainda na pasta **`logstash`**, crie um arquivo chamado **`logstash.conf`** com a seguinte configuração:

    input {
      tcp {
        port => 5000
        codec => json
      }
    }
    
    output {
      elasticsearch {
        hosts => ["elasticsearch:9200"]
        index => "nestjs-logs-%{+YYYY.MM.dd}"
      }
    }
    

4. Inicie o ambiente ELK usando o Docker Compose:

    docker-compose up -d
    

Agora você deve ter os serviços Elasticsearch, Kibana e Logstash em execução no seu ambiente local.

Integrando NestJS com Logstash

1. Instale o pacote **`winston`** e seus respectivos transportes:

    yarn add winston
    yarn add winston-transport
    yarn add @types/winston
    

2. Crie um arquivo **`winston-logger.ts`** na pasta **`src`** do seu projeto NestJS e adicione o seguinte conteúdo:

    import { createLogger, format, transports } from 'winston';
    
    const { combine, timestamp, printf } = format;
    
    const myFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    });
    
    export const winstonLogger = createLogger({
      level: 'info',
      format: combine(timestamp(), myFormat),transports: [
          new transports.Console(),
          new transports.Http({
          host: 'localhost',
          port: 5000,
          path: '/',
          format: format.combine(format.logstash()),
      	}),
      ],
    });
     
    

3\. Atualize o arquivo \`main.ts\` para usar o \`winstonLogger\` como o logger do NestJS: 

    ```typescript
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { winstonLogger } from './winston-logger';
    
    async function bootstrap() {
      const app = await NestFactory.create(AppModule, {
        logger: winstonLogger,
      });
      await app.listen(3000);
    }
    bootstrap();

Com isso, todos os logs gerados pela aplicação NestJS serão enviados para o Logstash, que por sua vez, os armazenará no Elasticsearch. Você pode visualizar e analisar os logs usando o Kibana, acessando **`http://localhost:5601`**.

### Conclusão 

Neste tutorial, vimos como monitorar e exibir logs centralizados com NestJS e a ELK Stack. Essa combinação é uma solução poderosa para gerenciar logs de aplicativos e oferece uma maneira eficiente de analisar e solucionar problemas em tempo real. Agora você pode aplicar essa abordagem em seus projetos NestJS para melhorar o monitoramento e a análise de logs.
