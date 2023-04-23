---
author: Renan Ribeiro Lage
title: Integração do NestJS com o AWS Lambda e API Gateway
date: '2023-04-22T03:00:00.000Z'
tags:
  - nestjs
series:
  - nestjs
categories:
  - aws-lambda
  - aws
  - nestjs
---

### Introdução

Neste artigo, você aprenderá como integrar sua aplicação NestJS com o AWS Lambda e o API Gateway, permitindo que sua aplicação seja executada sem servidores e gerencie solicitações HTTP através do API Gateway. A combinação do NestJS com o AWS Lambda e o API Gateway oferece uma solução altamente escalonável e eficiente para o desenvolvimento de APIs e microservices.

### Requisitos

Para seguir este tutorial, você precisará:

1. Conta na AWS (Amazon Web Services)
2. Node.js e npm instalados
3. AWS CLI (Command Line Interface) instalada e configurada com suas credenciais da AWS
4. Serverless Framework instalado

### Passo 1: Instalando o Serverless Framework

O Serverless Framework é uma ferramenta que facilita o desenvolvimento e implantação de aplicações sem servidor. Primeiro, instale o Serverless Framework globalmente usando npm:

```powershell
npm install -g serverless
```

### Passo 2: Criando a aplicação NestJS

Crie uma nova aplicação NestJS utilizando o CLI:

```powershell
npx @nestjs/cli new nestjs-lambda
```

Entre na pasta do projeto:

```powershell
cd nestjs-lambda
```

### Passo 3: Adicionando o plugin do Serverless para NestJS

Instale o plugin @nestjs/serverless-http que permite a integração do NestJS com o AWS Lambda:

```powershell
npm install --save @nestjs/serverless-http
```

### Passo 4: Configurando o Serverless Framework

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

Esta configuração define um serviço chamado nestjs-lambda usando o AWS Lambda e o API Gateway. O arquivo src/lambda.ts será usado como o ponto de entrada para o Lambda.

### Passo 5: Criando o arquivo de entrada para o Lambda

Crie um arquivo chamado lambda.ts na pasta src com o seguinte conteúdo:

```typescript
import { ServerlessHttp } from '@nestjs/serverless-http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const serverlessHttp = new ServerlessHttp(app);
  return serverlessHttp.handler;
};

export const handler = bootstrap();
```

### Passo 6: Testando localmente a aplicação NestJS

Antes de fazer o deploy da aplicação na AWS, você deve testá-la localmente para garantir que tudo funcione corretamente. Para isso, utilize o plugin serverless-offline do Serverless Framework.

Primeiro, instale o plugin como uma dependência de desenvolvimento:

```powershell
yarn add --dev serverless-offline
```

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

```powershell
serverless offline
```

Agora, sua aplicação NestJS estará disponível localmente no endereço http://localhost:3000. Você pode testá-la usando seu navegador ou um aplicativo como o Postman.

Depois de garantir que a aplicação esteja funcionando corretamente no ambiente local, siga para o próximo passo para implantá-la na AWS.

### Passo 7: Fazendo o deploy da aplicação na AWS

Com sua aplicação pronta para o deploy, execute o seguinte comando para implantá-la no AWS Lambda e no API Gateway:

```powershell
serverless deploy
```

O Serverless Framework cuidará do processo de implantação e fornecerá a URL do seu API Gateway assim que a implantação for concluída. Você pode usar essa URL para acessar sua aplicação NestJS na AWS.

### Conclusão

Neste artigo, você aprendeu como integrar o NestJS com o AWS Lambda e o API Gateway, utilizando o Serverless Framework para facilitar o processo de desenvolvimento e implantação. Essa abordagem permite que você tire proveito dos benefícios das arquiteturas sem servidor e crie aplicações escalonáveis e eficientes com o NestJS.
