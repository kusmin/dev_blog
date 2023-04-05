---
_template: default
---


+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["nestjs"]
date = 2023-03-29T03:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["nestjs"]
thumbnail = ""
title = "Construindo uma API de Chat em Tempo Real com NestJS, WebSocket e Prisma"

+++
## Introdução

Neste artigo, vamos explorar como criar uma aplicação de chat em tempo real usando NestJS, WebSocket e Prisma. Vamos criar uma API REST para gerenciar usuários e salas de chat, enquanto o WebSocket permitirá comunicação bidirecional em tempo real entre os clientes e o servidor.

### Pré-requisitos

Para seguir este tutorial, você precisará:

* Conhecimento básico de TypeScript e JavaScript
* Node.js instalado (v14+)
* Docker e Docker Compose instalados (opcional)
* Yarn ou NPM (gerenciadores de pacotes)

### Configurando o ambiente

Primeiro, crie um novo projeto NestJS utilizando o CLI:

    npm i -g @nestjs/cli
    nest new my-nestjs-chat-app
    

Entre na pasta do projeto:

    cd my-nestjs-chat-app
    

#### Configurando o Prisma

Siga as etapas de configuração do Prisma descritas no primeiro artigo desta série. Certifique-se de criar os modelos **`User`** e **`Room`** no arquivo **`prisma/schema.prisma`**.

Instalando dependências do WebSocket

Instale as dependências necessárias para trabalhar com WebSocket:

    yarn add @nestjs/websockets @nestjs/platform-socket.io socket.io

Criando módulos, serviços e controladores

Vamos criar módulos, serviços e controladores para usuários e salas de chat:

    bashCopy codenest generate module users
    nest generate service users
    nest generate controller users
    
    nest generate module rooms
    nest generate service rooms
    nest generate controller rooms
    

Edite os arquivos gerados conforme necessário, implementando as operações CRUD com o Prisma Client.

#### Configurando o WebSocket

Primeiro, crie um novo arquivo chamado **`chat.gateway.ts`** na pasta **`src/chat`** e adicione o seguinte conteúdo:

    import {
      SubscribeMessage,
      WebSocketGateway,
      WebSocketServer,
      OnGatewayInit,
      OnGatewayConnection,
      OnGatewayDisconnect,
    } from '@nestjs/websockets';
    import { Socket, Server } from 'socket.io';
    
    @WebSocketGateway()
    export class ChatGateway
      implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
      @WebSocketServer()
      server: Server;
    
      afterInit(server: Server) {
        console.log('WebSocket initialized');
      }
    
      handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
      }
    
      handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
      }
    
      @SubscribeMessage('message')
      handleMessage(client: Socket, payload: any): void {
        this.server.emit('message', payload);
      }
    }
    

Em seguida, adicione o **`ChatGateway`** ao arquivo **`src/app.module.ts`**:

    import { Module } from '@nestjs/common';
    import { UsersModule } from './users/users.module';
    import { RoomsModule } from './rooms/rooms.module';
    import { ChatGateway } from './chat/chat.gateway';
    
    @Module({
      imports: [UsersModule, RoomsModule],
      providers: [ChatGateway],
    })
    export class AppModule {}
    

#### Testando a aplicação

Inicie o servidor NestJS:

    yarn start

Acesse a aplicação em [**http://localhost:3000**](http://localhost:3000/) e use uma ferramenta como o Postman ou o Insomnia para testar as operações CRUD de usuários e salas de chat.

Para testar a comunicação em tempo real, você pode criar um cliente WebSocket simples usando JavaScript puro ou bibliotecas como o socket.io-client. Aqui está um exemplo básico de cliente WebSocket:

    htmlCopy code<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Chat Client</title>
    </head>
    <body>
      <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
      <script>
        const socket = io('http://localhost:3000');
        
        socket.on('connect', () => {
          console.log('Connected to server');
        });
    
        socket.on('message', (payload) => {
          console.log('Received message:', payload);
        });
    
        function sendMessage() {
          const message = 'Hello, NestJS WebSocket!';
          socket.emit('message', message);
          console.log('Sent message:', message);
        }
      </script>
    
      <button onclick="sendMessage()">Send Message</button>
    </body>
    </html>
    

Salve este arquivo como **`index.html`** e abra-o no navegador. Clique no botão "Send Message" para enviar mensagens através do WebSocket. Você verá as mensagens enviadas e recebidas no console do navegador.

## Conclusão

Parabéns! Você criou com sucesso uma aplicação de chat em tempo real usando NestJS, WebSocket e Prisma. A partir daqui, você pode adicionar mais recursos, como autenticação de usuário, suporte a múltiplas salas de chat e histórico de mensagens.

Aqui estão algumas sugestões para expandir ainda mais a aplicação:

* Adicionar autenticação e autorização (por exemplo, JWT)
* Implementar suporte a múltiplas salas de chat
* Salvar o histórico de mensagens no banco de dados
* Implementar uma interface de usuário amigável para o chat
* Adicionar notificações em tempo real para eventos importantes (por exemplo, novos usuários se juntando, usuários saindo)

Lembre-se de sempre consultar a documentação oficial de cada tecnologia para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* Prisma: [**https://www.prisma.io/docs/**](https://www.prisma.io/docs/ "https://www.prisma.io/docs/")
* WebSocket: [**https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API**](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API")

Esperamos que este tutorial tenha sido útil para você e que você esteja animado para explorar ainda mais o mundo do desenvolvimento de aplicações web modernas!
