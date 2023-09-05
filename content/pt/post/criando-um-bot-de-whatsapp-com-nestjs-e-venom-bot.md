---
title: 'Criando um Bot de WhatsApp com NestJS e Venom-Bot'
date: '2023-07-04T22:07:25-03:00'
status: publish
permalink: /criando-um-bot-de-whatsapp-com-nestjs-e-venom-bot
author: 'Renan Ribeiro Lage'
excerpt: 'Neste post, exploramos como criar um bot para WhatsApp usando o Venom-Bot em conjunto com o NestJS, um popular framework de backend para Node.js. Começamos configurando nosso ambiente com Node.js, npm e a CLI do NestJS. Depois, criamos um novo projeto NestJS e instalamos o Venom-Bot. Em seguida, criamos um serviço de bot e configuramos o bot para responder a uma simples mensagem de "Oi". Finalmente, inicializamos nosso serviço de bot. Como resultado, conseguimos um bot funcional do WhatsApp, pronto para ser expandido com novas funcionalidades. Este post serve como um guia passo a passo para qualquer pessoa interessada em desenvolver bots para WhatsApp utilizando NestJS e Venom-Bot.'
type: post
id: 294
category:
    - Nestjs
tag:
    - bot
    - nestjs
post_format: []
om_disable_all_campaigns:
    - ''
cmplz_hide_cookiebanner:
    - ''
burst_total_pageviews_count:
    - '17'
---
Hoje vamos explorar como criar um bot para WhatsApp usando o Venom-Bot em conjunto com o NestJS, um framework de backend para Node.js. Vamos dividir este tutorial em etapas fáceis de seguir para ajudá-lo a criar seu primeiro bot.

Configuração do ambiente
------------------------

Para começar, precisamos ter o Node.js e npm (Node Package Manager) instalados na nossa máquina. Se você ainda não tem, pode fazer o download [aqui](https://nodejs.org/en/download/).

Uma vez que você tenha o Node.js e npm instalados, vamos instalar a CLI (Command Line Interface) do NestJS globalmente em nosso sistema:

``` shell
npm i -g @nestjs/cli
```

Em seguida, criaremos um novo projeto NestJS usando o comando:

``` shell
nest new whatsapp-bot
```
Isso irá gerar um novo projeto NestJS chamado “whatsapp-bot”. Vamos entrar no diretório do projeto:

``` shell
cd whatsapp-bot
```

E, finalmente, vamos instalar o Venom-bot em nosso projeto:

``` shell
npm install venom-bot
```

Criando o Serviço de Bot
------------------------

Agora que já temos nosso ambiente pronto, vamos criar um serviço para lidar com nosso bot do WhatsApp. Dentro do diretório do projeto, execute o seguinte comando para criar um novo serviço:

``` shell
nest g service bot
```

Isso irá criar um arquivo `bot.service.ts` dentro de uma pasta `services` no diretório `src`.

Configurando nosso Bot do WhatsApp
----------------------------------

Agora que temos nosso serviço de bot pronto, podemos começar a configurar nosso bot do WhatsApp. Vamos começar importando o venom-bot em nosso serviço:

``` Javascript
import { Injectable } from '@nestjs/common';
import * as venom from 'venom-bot';

```

Em seguida, vamos criar uma função para inicializar nosso bot:

``` TypeScript
@Injectable()
export class BotService {
  private client;

  constructor() {
    venom.create().then((client) => this.start(client));
  }

  private start(client) {
    this.client = client;

    this.client.onMessage((message) => {
      if (message.body === 'Oi') {
        this.client.sendText(message.from, 'Olá! Este é um bot criado usando Venom-bot e NestJS.');
      }
    });
  }
}
```
Correção
--------

Como bem salientado pelo Kuuh, a maneira correta de instanciar o cliente é passando uma string com o nome da sessão ou um objeto, como os exemplos abaixo:

``` Javascript
venom
      .create({
        session: 'mySession',
        browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      .then((client) => this.start(client));
```

Ou

``` Javascript
 venom
      .create("mySession")
      .then((client) => this.start(client));
```

nicializando nosso Serviço de Bot
----------------------------------

Finalmente, precisamos inicializar nosso serviço de bot em nosso aplicativo. Para isso, vamos importar o `BotService` em nosso `AppModule`. Abra o arquivo `app.module.ts` e adicione o `BotService` ao array de `providers`:

``` Javascript
import { Module } from '@nestjs/common';
import { BotService } from './bot.service';

@Module({
  imports: [],
  controllers: [],
  providers: [BotService],
})
export class AppModule {}
```

E pronto! Agora temos um bot de WhatsApp simples, mas funcional, pronto para ser executado. Inicie seu servidor com o comando:

``` shell
npm run start
```

Seu bot está pronto para responder a mensagens com ‘Oi’ com uma resposta amigável. Claro, este é apenas um exemplo básico. Com a base estabelecida, agora você pode explorar ainda mais o Venom-bot e NestJS para adicionar novas funcionalidades e criar um bot mais complexo e interativo.
