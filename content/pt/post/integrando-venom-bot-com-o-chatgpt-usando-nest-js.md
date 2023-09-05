---
title: 'Integrando Venom Bot com o ChatGPT usando Nest.js'
date: '2023-07-09T15:10:55-03:00'
status: publish
permalink: /integrando-venom-bot-com-o-chatgpt-usando-nest-js
author: 'Renan Ribeiro Lage'
excerpt: 'Este post ensina como integrar o Venom Bot, uma ferramenta de automação do WhatsApp, com o ChatGPT, um avançado modelo de linguagem gerativo, usando o framework Nest.js. Começando com a instalação das dependências necessárias, passamos por como configurar o Venom Bot e integrá-lo com o ChatGPT usando a biblioteca da OpenAI. Depois, o post detalha como processar mensagens recebidas e gerar respostas utilizando o modelo ChatGPT. Ao final do tutorial, os leitores serão capazes de criar bots de WhatsApp inteligentes, capazes de responder de forma natural e conversacional.'
type: post
id: 314
category:
    - Nestjs
tag:
    - venom-bot
post_format: []
om_disable_all_campaigns:
    - ''
cmplz_hide_cookiebanner:
    - ''
burst_total_pageviews_count:
    - '3'
---
Neste artigo, aprenderemos como integrar o Venom Bot, uma solução de automação de WhatsApp, com o ChatGPT, um modelo de linguagem gerativo avançado, usando o Nest.js, um framework Node.js robusto e eficiente.

Pré-requisitos
--------------

Para seguir este tutorial, você precisará:

1. Uma conta ativa na OpenAI e uma chave de API.
2. Node.js e NPM instalados em seu ambiente de desenvolvimento.
3. O Nest.js CLI instalado globalmente em sua máquina.

Configurando o projeto
----------------------

Primeiro, crie um novo projeto Nest.js usando o CLI do Nest.js. Execute o seguinte comando:


``` shell
nest new my-venom-bot
```
Navegue até o diretório do projeto e instale as seguintes dependências:

``` shell
npm install venom-bot @nestjs/config openai
```

Configurando o Venom Bot
------------------------

No arquivo `app.service.ts`, importe o módulo Venom Bot. Crie uma nova instância do Venom Bot na função `constructor` e utilize o método `create` para iniciar uma nova sessão.

``` javascript
import * as venom from 'venom-bot';

constructor() {
  venom.create().then((client) => this.start(client));
}

private async start(client) {
  // Aqui será inserido nosso código para lidar com as mensagens
}
```

Integrando com o ChatGPT
------------------------

Para integrar com o ChatGPT, precisamos instalar a biblioteca da OpenAI. A configuração para a biblioteca da OpenAI é feita fornecendo a chave de API e o ID da organização.

Primeiro, instale a biblioteca da OpenAI:

``` shell
npm install openai
```

Em seguida, importe a biblioteca da OpenAI e configure a chave da API e o ID da organização:

``` javascript
import { Configuration, OpenAIApi } from 'openai';

private readonly configuration: Configuration;
private openai: OpenAIApi;

constructor(private configService: ConfigService) {
  this.configuration = new Configuration({
    apiKey: this.configService.get<string>('OPENAI_KEY'),
    organization: this.configService.get<string>('ORGANIZATION_ID'),
  });
  this.openai = new OpenAIApi(this.configuration);
}
```

Em seguida, criamos um método para pegar a resposta do ChatGPT. Aqui, estou usando o modelo `text-davinci-003`:

``` typescript
private async getChatGptResponse(clientText) {
  const options = {
    model: 'text-davinci-003',
    prompt: clientText,
    max_tokens: 200,
  };
  const response = await this.openai.createCompletion(options);
  let botResponse = '';
  response.data.choices.forEach(({ text }) => {
    botResponse += text;
  });
  return botResponse.trim();
}
```

Processando as mensagens
------------------------

Agora, estamos prontos para processar as mensagens recebidas. No método `start` que criamos antes, adicione o seguinte código:

``` typescript
this.client = client;

this.client.onMessage(async (message) => {
  if (message.body.startsWith('/bot')) {
    const question = message.body.slice('/bot'.length).trim();
    const response = await this.getChatGptResponse(question);
    await this.client.sendText(message.from, response);
  }
});
```

Com este código, o bot responderá a qualquer mensagem que comece com `/bot`.

Conclusão
---------

Este artigo oferece um guia simples de como integrar o Venom Bot com o ChatGPT usando Nest.js. A integração permitirá que você crie bots de WhatsApp inteligentes que podem responder de maneira natural e conversacional. Lembre-se de que o ChatGPT e o Venom Bot são ferramentas poderosas, portanto, use-as com responsabilidade.

**Nota:** Este guia é um ponto de partida e pode exigir ajustes e melhorias para atender às suas necessidades específicas, incluindo o tratamento de erros e casos de uso mais complexos. Além disso, lembre-se de seguir as diretrizes de uso da OpenAI e do WhatsApp ao desenvolver seu bot.

- - - - - -
