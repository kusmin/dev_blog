---
author: Renan Ribeiro Lage
title: Integrando NestJS com AWS Lambda e API Gateway usando o Serverless Framework
date: '2023-06-11T03:00:00.000Z'
tags:
  - nestjs
series:
  - nestjs
---

## Introdução

Este tutorial, foi motivado pelo feedback do  Henrique Guedes que agradeço a colaboração, apresentou o erro no passo 3 do tutotial de [http://updevblog.com/pt/post/aws-lambda-nestjs.md/](http://updevblog.com/pt/post/aws-lambda-nestjs.md/)  e aqui corrijo este ponto e entro em mais detalhes sobre os demais. Você aprenderá como integrar sua aplicação NestJS com o AWS Lambda e o API Gateway usando o Serverless Framework. Esta combinação fornece uma solução altamente escalonável e eficiente para o desenvolvimento de APIs e microservices.

## Requisitos

Para seguir este tutorial, você precisará de:

* Conta na AWS (Amazon Web Services)
* Node.js e npm instalados
* AWS CLI (Command Line Interface) instalada e configurada com suas credenciais da AWS
* Serverless Framework instalado

## Passo 1: Instalando o Serverless Framework

Instale o Serverless Framework globalmente usando npm:

`npm install -g serverless`

## Passo 2: Criando a aplicação NestJS

Crie uma nova aplicação NestJS utilizando o CLI:

`npx @nestjs/cli new nestjs-lambda`

Entre na pasta do projeto:

`cd nestjs-lambda`

## Passo 3: Configurando o Serverless Framework

Crie um arquivo chamado serverless.yml na raiz do projeto com o seguinte conteúdo:

```yaml
service: nestjs-lambda

provider:
  name: aws
  runtime: nodejs14.x
  stage: ${opt:stage, 'dev'}
  region: ${opt:region, 'us-east-1'}

functions:
  main:
    handler: src/lambda.handler
    events:
      - http:
          path: /
          method: ANY
          cors: true
      - http:
          path: /{proxy+}
          method: ANY
          cors: true

plugins:
  - serverless-offline

```

## Passo 4: Criando o arquivo de entrada para o Lambda

Crie um arquivo chamado lambda.ts na pasta src com o seguinte conteúdo:

```typescript
import * as serverlessHttp from 'serverless-http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer = null;

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  await app.init();
  return app.getHttpAdapter().getInstance();
}

export const handler = async (event, context) => {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = serverlessHttp(server);
  }
  return cachedServer(event, context);
};
```

## Passo 5: Testando localmente a aplicação NestJS

Antes de fazer o deploy da aplicação na AWS, você deve testá-la localmente para garantir que tudo funcione corretamente. Para isso, utilize o plugin serverless-offline do Serverless Framework.

Primeiro, instale o plugin como uma dependência de desenvolvimento:

`npm install --save-dev serverless-offline`

`npm install --save-dev serverless-plugin-typescript`

Em seguida, atualize o arquivo serverless.yml para incluir o plugin:

```yaml
plugins:
  - serverless-plugin-typescript
  - serverless-offline

custom:
  serverless-offline:
    httpPort: 3000
```

Agora, você pode executar a aplicação NestJS localmente usando o seguinte comando:

`serverless offline`

Agora, sua aplicação NestJS estará disponível localmente no endereço [http://localhost:3000](http://localhost:3000/). Você pode testar os endpoints da API usando Postman ou CURL.

## Passo 6: Configurando um usuário IAM para o deploy

Antes de implantar sua aplicação na AWS, é necessário configurar um usuário IAM (Identity and Access Management) com as permissões necessárias.

1. Faça login no console da AWS e navegue até o serviço IAM.
2. Clique em "Users" no menu lateral e depois em "Add user".
3. Escolha um nome de usuário e selecione a opção "Programmatic access".
4. No próximo passo, em "Set permissions", selecione a opção "Attach existing policies directly". Procure por "AdministratorAccess" e selecione-a.
5. Continue clicando em "Next" até que você chegue à página de revisão. Clique em "Create user" para criar o usuário.
6. Na página de conclusão, você terá acesso ao seu Access Key ID e Secret Access Key. Guarde essas informações, você precisará delas para configurar o AWS CLI.

Observação: O ideal é criar o usuário com permissões especificas, foi feito no tutorial com acesso de administrador, apenas como demonstração.

Para configurar o AWS CLI com suas credenciais da AWS, use o seguinte comando:

`aws configure`

Isso iniciará um prompt interativo solicitando sua Access Key ID, Secret Access Key, região padrão e formato de saída. Insira as informações solicitadas.

## Passo 7: Fazendo deploy da aplicação NestJS na AWS

Agora que você tem tudo configurado, pode fazer deploy da sua aplicação na AWS. O Serverless Framework facilita esse processo. Na raiz do seu projeto, execute o seguinte comando:

`serverless deploy`

Isso irá empacotar sua aplicação e implantá-la na AWS. Ao final do processo, o Serverless Framework irá fornecer a URL da sua API na AWS. Você pode usar essa URL para testar sua API.

## Passo 8: Monitorando sua função Serverless

Depois de implantar sua aplicação, você pode querer monitorá-la para entender o comportamento da aplicação e rastrear possíveis erros. O Serverless Framework fornece um comando muito útil para este propósito: serverless --console.

Para começar a monitorar sua aplicação, execute o seguinte comando no terminal:

`serverless --console`

Isso abrirá o console Serverless Dashboard, onde você pode monitorar sua aplicação em tempo real. Você verá informações detalhadas sobre cada execução da função, incluindo logs, duração, uso de memória e muito mais.

Você pode filtrar os logs por tempo, etiquetas ou mesmo pesquisar termos específicos. Além disso, é possível ver os rastreamentos de erros quando algo dá errado, o que é extremamente útil para o diagnóstico de problemas.

Além disso, o Serverless Dashboard oferece uma visão geral do desempenho da aplicação, com informações sobre a latência, o número de invocações e possíveis erros.

Ao usar o comando serverless --console, lembre-se de que você precisa ter uma conta no Serverless Dashboard e que o comando abrirá o dashboard no navegador padrão do seu sistema operacional.

Lembre-se de que o monitoramento contínuo pode gerar custos adicionais na sua conta AWS, então use com moderação e sempre de acordo com as necessidades da sua aplicação.

## Conclusão

Neste tutorial, você aprendeu a desenvolver uma aplicação NestJS integrada com o AWS Lambda e o API Gateway usando o Serverless Framework. Além disso, você também aprendeu como monitorar a sua aplicação em tempo real utilizando o console Serverless Dashboard. Essas ferramentas podem ajudar a desenvolver e operar APIs e microservices altamente escaláveis e eficientes.
