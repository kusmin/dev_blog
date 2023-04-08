+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["docker", "deploy"]
date = 2022-07-31T03:00:00Z
math = false
redirectUrl = ""
series = ["docker"]
tags = ["docker", "javascript", "nodejs"]
thumbnail = ""
title = "Docker: Dockerizando o nodejs"

+++
Uma tecnologia que veio para ficar e facilitar a vida do desenvolvedor é o docker. Se você é desenvolvedor e não conhece o que é o docker recomendo que pesquise urgentemente a respeito e comece a usar, vai mudar sua visão sobre programação.

#### Introdução

Hoje vamos ver como criar e implantar facilmente uma imagem docker de uma aplicação node. Para  seguir é necessario ter uma aplicação do nodejs, para fins didáticos vamos criar um servidor micro.

Antes de qualquer coisa é necessario ter o node instalado, caso não tenha você pode seguir este tutorial [http://updevblog.com/pt/post/gerenciadores-de-versao-nvm/](http://updevblog.com/pt/post/gerenciadores-de-versao-nvm/ "http://updevblog.com/pt/post/gerenciadores-de-versao-nvm/").

Com o node instalado vamos criar uma pasta.

    mkdir teste-app

Vamos agora inicializar a nossa aplicação com os parâmetros default.

    npm init -y

Agora vamos instalar o express que é um micro-framework node.

    npm install express

Instalado o express, criaremos um arquivo index.js

    nano index.js

E dentro deste arquivo coloque o seguinte codigo:

    var express = require('express');
    var app = express();
    
    app.get('/', (req, res) => {
        res.send("Hello from Docker!");
    });
    
    app.listen(8080, () => {
        console.log("Listening on port 8080!");
    });

Salvando o arquivo com o ctrl + o e saindo com o ctrl + x, podemos subir a aplicação com:

    node index.js

pronto, já temos nossa aplicação de teste que vamos usar para "dockerizar".

#### Dockerfile

Neste próximo passo vamos criar um arquivo dockerfile, que vai buildar a imagem da api para a gente.

    nano Dockerfile

Escrevendo o seguinte código:

    FROM node:16
    WORKDIR /usr/src/app
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE 8080
    CMD [ "node", "index.js" ]

Entendendo os comandos:

* FROM node:16 - Vai pegar a versão do node 16, poderia ser outra versão.
* WORKDIR /usr/src/app - Vai ser o diretório onde vai ficar nossa api dentro do container.
* COPY package*.json ./ - Copia  os arquivos package para dentro do container.
* RUN npm install - Roda o comando npm install que instala os componentes do node que estão no arquivo package.json.
* COPY . . - Copia tudo para dentro do container.
* EXPOSE 8080 - Porta que vai ser exposta nossa api dentro do container.
* CMD \[ "node", "index.js" \] - Os comandos que vão subir nossa aplicação

#### Criando e rodando uma imagem docker

Feito nosso arquivo Dockerfile, vamos buildar nossa imagem.

     docker build -t exemplo-nome/exemplo-api .

Este comando vai gerar uma imagem docker com o nome e tag que atribuímos, pode demorar alguns minutos ou vários ! As vezes quase sempre demora muito...

Depois de gerada a imagem vamos criar um arquivo docker-compose para rodar esta imagem.

    nano docker-compose.yml

E dentro dele vamos escrever o seguinte:

    version: '3.8'
    services:
      web:
        image: exemplo-nome/exemplo-api
        container_name: core
        command: npm run start
        ports:
          - 3000:8080

Ele vai pegar a imagem que criamos e rodar o comando npm run start inicializando nossa api, por fim ela será exposta externamente na porta 3000.

Agora para finalizar rodamos o comando.

     docker-compose up -d

Ele vai subir nossa aplicação, e você já pode acessa-la pela porta 3000.

#### Conclusão

Neste post aprendemos de forma rápida a como criar e buildar nossa aplicação nodejs utilizando o docker.
