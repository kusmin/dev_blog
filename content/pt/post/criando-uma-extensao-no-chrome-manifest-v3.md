---
title: 'Criando uma extensão no Chrome Manifest V3'
date: '2023-06-18T12:51:32-03:00'
status: publish
permalink: /criando-uma-extensao-no-chrome-manifest-v3
author: 'Renan Ribeiro Lage'
excerpt: 'Neste tutorial, exploramos os passos básicos para criar uma extensão do Google Chrome utilizando o Manifest V3, a versão mais recente da plataforma de extensões do Google Chrome. Discutimos a configuração do Manifest, a criação de um popup para a extensão, a adição de funcionalidades através de um Service Worker e, finalmente, a carga da extensão no Chrome para testes. Este guia serve como uma introdução simples e direta ao desenvolvimento de extensões do Chrome com o Manifest V3.'
type: post
id: 225
category:
    - Uncategorized
tag: []
post_format: []
om_disable_all_campaigns:
    - ''
cmplz_hide_cookiebanner:
    - ''
burst_total_pageviews_count:
    - '13'
---
Neste tutorial, você aprenderá a criar uma extensão para o Google Chrome usando o Manifest V3, a última versão da plataforma de extensões do Google Chrome.

### O que é o Manifest V3?

O Manifest V3 é a terceira versão do sistema de extensões do Google Chrome. Ele introduziu uma série de mudanças para melhorar a segurança, a privacidade e o desempenho das extensões do Chrome.

### Passo 1: Configurando o Manifest

O primeiro passo para criar uma extensão do Chrome é configurar o Manifest, que é um arquivo JSON que contém informações importantes sobre a extensão.

Crie um arquivo chamado `manifest.json` no diretório raiz da sua extensão. Aqui está um exemplo de como ele pode parecer:


``` json
{
  "manifest_version": 3,
  "name": "Minha Extensão",
  "version": "1.0",
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "images/icon16.png",
      "48": "images/icon48.png",
      "128": "images/icon128.png"
    }
  },
  "permissions": ["activeTab"],
  "background": {
    "service_worker": "background.js"
  }
}
```
### Passo 2: Criando o Popup

O próximo passo é criar o popup que será exibido quando o usuário clicar no ícone da extensão. Para fazer isso, você precisa criar um arquivo HTML.

Crie um arquivo chamado `popup.html` no diretório raiz da extensão:

``` html
<html>
  <head>
    <style>
      body {
        width: 300px;
        height: 200px;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Olá, mundo!</h1>
  </body>
</html>
```

### Passo 3: Adicionando Funcionalidades com um Service Worker

Em seguida, você precisará adicionar funcionalidades à sua extensão. No Manifest V3, isso é feito usando um service worker.

Crie um arquivo chamado `background.js` no diretório raiz da sua extensão:


``` javascript
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: 'https://www.google.com'
  });
});
```

Este service worker simplesmente abre uma nova guia com a URL ‘[https://www.google.com](https://www.google.com/)‘ quando o usuário clica no ícone da extensão.

### Passo 4: Carregando a extensão no Chrome

Para testar sua extensão, você precisa carregá-la no Chrome:

1. Abra o Chrome e acesse `chrome://extensions/`.
2. Ative o Modo do desenvolvedor.
3. Clique em “Carregar sem compactação” e selecione o diretório da sua extensão.

Sua extensão agora deve estar visível na barra de ferramentas do Chrome.

### Conclusão

Agora você aprendeu o básico sobre como criar uma extensão do Chrome usando o Manifest V3! Há muito mais que você pode fazer com extensões do Chrome, então sinta-se à vontade para experimentar e adicionar mais funcionalidades à sua extensão.

