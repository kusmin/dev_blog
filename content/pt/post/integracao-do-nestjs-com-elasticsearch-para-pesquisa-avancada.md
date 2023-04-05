---
_template: default
---

+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Elasticsearch", "nestjs"]
date = 2023-03-31T10:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["Elasticsearch", "nestjs"]
thumbnail = ""
title = "Integração do NestJS com Elasticsearch para Pesquisa Avançada"

+++
### Introdução

O Elasticsearch é um mecanismo de pesquisa e análise distribuído e escalável, amplamente utilizado para casos de uso como pesquisa de texto completo, análise de logs e análise de métricas. Neste artigo, mostraremos como integrar o Elasticsearch ao NestJS para criar uma pesquisa avançada e eficiente para sua aplicação.

### Pré-requisitos

Para seguir este tutorial, você precisará:

* Ter conhecimento básico do NestJS
* Node.js instalado (v14+)
* Elasticsearch instalado e em execução (v7.x)

### Configurando o ambiente

Primeiro, crie um novo projeto NestJS utilizando o CLI:

    npm i -g @nestjs/cli
    nest new my-nestjs-elasticsearch-app

Entre na pasta do projeto:

    cd my-nestjs-elasticsearch-app

Instalando o Elasticsearch

Para instalar o Elasticsearch, siga as instruções oficiais na documentação do Elasticsearch: [**https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html**](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html "https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html").

Caso prefira, você pode executar o Elasticsearch usando Docker:

    docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.15.2

Adicionando o módulo Elasticsearch ao NestJS

Instale o pacote oficial do Elasticsearch para Node.js e o pacote **`@nestjs/elasticsearch`**:

    npm install --save @elastic/elasticsearch @nestjs/elasticsearch
    

Atualize o arquivo src/app.module.ts para importar o ElasticsearchModule e configurá-lo com a URL do seu servidor Elasticsearch:

    import { Module } from '@nestjs/common';
    import { ElasticsearchModule } from '@nestjs/elasticsearch';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    
    @Module({
      imports: [
        ElasticsearchModule.register({
          node: 'http://localhost:9200',
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
    

Injetando o ElasticsearchService

Agora você pode injetar o **`ElasticsearchService`** em qualquer serviço ou controlador. Por exemplo, você pode criar um novo serviço chamado **`SearchService`** e injetar o **`ElasticsearchService`** nele:

    import { Injectable } from '@nestjs/common';
    import { ElasticsearchService } from '@nestjs/elasticsearch';
    
    @Injectable()
    export class SearchService {
      constructor(private readonly elasticsearchService: ElasticsearchService) {}
    }
    

Com o **`ElasticsearchService`** injetado, você pode usar os métodos disponíveis na documentação oficial do cliente Elasticsearch para Node.js: [**https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html**](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html "https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html").

Exemplo de pesquisa

Vamos criar um exemplo simples para demonstrar como realizar uma pesquisa no Elasticsearch. Suponha que você tenha um índice chamado "articles" com documentos que contêm campos "title" e "content".

Primeiro, adicione um método no **`SearchService`** para realizar a pesquisa:

    async search(query: string) {
      const { body } = await this.elasticsearchService.search({
        index: 'articles',
        body: {
          query: {
            multi_match: {
              query,
              fields: ['title^2', 'content'],
            },
          },
        },
      });
    
      return body.hits.hits.map((hit) => hit._source);
    }

Neste exemplo, usamos a consulta \`multi_match\` para pesquisar nos campos "title" e "content". O \`^2\` após "title" aumenta a importância do campo "title" na pontuação do resultado. Agora, crie um controlador para expor a funcionalidade de pesquisa como um endpoint da API: 

    import { Controller, Get, Query } from '@nestjs/common';
    import { SearchService } from './search.service';
    
    @Controller('search')
    export class SearchController {
      constructor(private readonly searchService: SearchService) {}
    
      @Get()
      async search(@Query('query') query: string) {
        return this.searchService.search(query);
      }
    }

Atualize o arquivo src/app.module.ts para importar o SearchModule:

    import { Module } from '@nestjs/common';
    import { ElasticsearchModule } from '@nestjs/elasticsearch';
    import { SearchModule } from './search/search.module';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    
    @Module({
      imports: [
        ElasticsearchModule.register({
          node: 'http://localhost:9200',
        }),
        SearchModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
    

Inicie o servidor NestJS:

    npm run start

Acesse a aplicação em [**http://localhost:3000/search?query=something**](http://localhost:3000/search?query=something) e veja os resultados da pesquisa retornados pelo Elasticsearch.

### Conclusão

Neste artigo, você aprendeu como integrar o Elasticsearch ao NestJS para criar uma pesquisa avançada e eficiente. A partir daqui, você pode explorar mais recursos do Elasticsearch e do NestJS, bem como otimizar seu ambiente de desenvolvimento e produção.

Lembre-se de sempre consultar a documentação oficial de cada tecnologia para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* Elasticsearch: [**https://www.elastic.co/guide/index.html**](https://www.elastic.co/guide/index.html "https://www.elastic.co/guide/index.html")

Esperamos que este tutorial tenha sido útil e que você esteja animado para explorar mais o mundo do desenvolvimento de aplicações web modernas!
