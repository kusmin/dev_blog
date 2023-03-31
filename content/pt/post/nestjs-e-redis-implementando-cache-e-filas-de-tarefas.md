+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["redis", "nestjs"]
date = 2023-03-31T22:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["redis", "nestjs"]
thumbnail = ""
title = "NestJS e Redis: Implementando Cache e Filas de Tarefas"

+++
### Introdução

Neste artigo, vamos explorar como integrar o NestJS com o Redis, uma poderosa e flexível solução de armazenamento em cache e gerenciamento de filas de tarefas. Vamos criar uma aplicação que utiliza o cache Redis para melhorar o desempenho e implementar uma fila de tarefas para executar processos em segundo plano.

### Pré-requisitos

Para seguir este tutorial, você precisará:

* Node.js instalado (v14+)
* Docker e Docker Compose instalados
* Yarn ou NPM (gerenciadores de pacotes)
* Conhecimento básico de NestJS e TypeScript

### Configurando o ambiente

1. Crie um novo projeto NestJS utilizando o CLI:

    npm i -g @nestjs/cli
    nest new my-nestjs-redis-app
    

2. Entre na pasta do projeto:

    cd my-nestjs-redis-app

3. Instale as dependências necessárias:

    yarn add @nestjs/redis redis

Configurando o Docker e o Redis

1. Crie um arquivo chamado **`docker-compose.yml`** na raiz do projeto com o seguinte conteúdo:

    version: '3.8'
    services:
      redis:
        image: redis:latest
        ports:
          - '6379:6379'
    

2. Inicie o container do Redis:

    docker-compose up -d

Integrando o NestJS com o Redis

1. Atualize o arquivo **`src/app.module.ts`** para importar o RedisModule e configurá-lo:

    import { Module } from '@nestjs/common';
    import { RedisModule } from '@nestjs/redis';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    
    @Module({
      imports: [
        RedisModule.forRoot({
          type: 'redis',
          host: 'localhost',
          port: 6379,
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
    

2. Crie um novo serviço chamado **`CacheService`** para lidar com as operações de cache Redis:

    nest generate service cache

3. Atualize o arquivo **`src/cache/cache.service.ts`** para injetar o **`RedisService`** e implementar os métodos de cache:

    import { Injectable } from '@nestjs/common';
    import { RedisService } from '@nestjs/redis';
    
    @Injectable()
    export class CacheService {
      constructor(private readonly redisService: RedisService) {}
    
      async set(key: string, value: any, ttl: number) {
        const client = this.redisService.getClient();
        await client.set(key, JSON.stringify(value), 'EX', ttl);
      }
    
      async get(key: string) {
        const client = this.redisService.getClient();
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
      }
    
      async delete(key: string) {
        const client = this.redisService.getClient();
        await client.del(key);
      }
    }
    

Implementando o Cache e Filas de Tarefas

1. Utilize o **`CacheService`** no seu aplicativo para armazenar e recuperar dados do cache Redis. Por exemplo, você pode armazenar dados de consulta do banco de dados no cache para melhorar o desempenho da aplicação.
2. Para implementar uma fila de tarefas, crie um novo módulo chamado **`TaskQueueModule`**:

    nest generate module taskQueue

3. Crie um novo serviço chamado **`TaskQueueService`** para lidar com as operações da fila de tarefas:

    nest generate service taskQueue

4. Atualize o arquivo **`src/task-queue/task-queue.service.ts`** para injetar o **`RedisService`** e implementar os métodos da fila de tarefas:

    import { Injectable } from '@nestjs/common';
    import { RedisService } from '@nestjs/redis';
    
    @Injectable()
    export class TaskQueueService {
      constructor(private readonly redisService: RedisService) {}
    
      async enqueue(queueName: string, task: any) {
        const client = this.redisService.getClient();
        await client.lpush(queueName, JSON.stringify(task));
      }
    
      async dequeue(queueName: string): Promise<any> {
        const client = this.redisService.getClient();
        const data = await client.rpop(queueName);
        return data ? JSON.parse(data) : null;
      }
    }

5. Utilize o **`TaskQueueService`** para adicionar tarefas à fila e processá-las em segundo plano. Por exemplo, você pode criar um serviço para enviar e-mails e adicionar tarefas de envio de e-mail à fila para serem processadas em segundo plano.
6. Implemente um mecanismo para processar tarefas em segundo plano, como um worker, que consome tarefas da fila e as executa. Você pode usar a biblioteca **`Bull`** para gerenciar filas de tarefas de maneira eficiente e escalável.

Testando a aplicação

1. Inicie o servidor NestJS:

    yarn start

2. Acesse a aplicação em [**http://localhost:3000**](http://localhost:3000/) e teste a funcionalidade de cache e fila de tarefas usando uma ferramenta como o Postman ou o Insomnia.

### Conclusão

Parabéns! Você acabou de criar uma aplicação NestJS com integração Redis, implementando cache e filas de tarefas. A combinação dessas tecnologias ajuda a melhorar o desempenho e a escalabilidade de suas aplicações. A partir daqui, você pode explorar mais recursos do NestJS e do Redis, bem como otimizar seu ambiente de desenvolvimento e produção.

Algumas sugestões para melhorar ainda mais sua aplicação:

* Adicionar autenticação e autorização (por exemplo, JWT)
* Implementar validação de dados (usando o pacote class-validator)
* Criar testes unitários e de integração para garantir a qualidade do código
* Configurar um ambiente de produção com Docker e CI/CD

Lembre-se de sempre consultar a documentação oficial de cada tecnologia para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* Redis: [**https://redis.io/documentation**](https://redis.io/documentation "https://redis.io/documentation")
* Docker: [**https://docs.docker.com/**](https://docs.docker.com/ "https://docs.docker.com/")

Esperamos que este tutorial tenha sido útil para você e que você esteja animado para explorar mais o mundo do desenvolvimento de aplicações web modernas!