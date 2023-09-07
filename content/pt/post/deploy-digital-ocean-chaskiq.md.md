---
author: Renan Ribeiro Lage
title: 'Como Instalar o Chaskiq no DigitalOcean: Um Guia Completo'
date: '2023-09-07T03:00:00.000Z'
tags:
  - chaskiq
---

## Introdução

O Chaskiq é uma plataforma de suporte ao cliente e gestão de conversas que oferece um conjunto robusto de recursos para negócios de todos os tamanhos. Neste artigo, vamos explorar como você pode facilmente instalar o Chaskiq no DigitalOcean, uma das mais populares plataformas de nuvem.

## Requisitos

Antes de começar, é necessário ter em mãos algumas informações de configuração de banco de dados. O Chaskiq utiliza duas bases de dados: Redis e Postgres. Se você ainda não possui esses bancos de dados, pode criá-los na seção de bancos de dados gerenciados do DigitalOcean. As strings de conexão serão algo parecidas com isso:

postgresql://user:pass@db-postgresql-nyc1-xxxxx.db.ondigitalocean.com:25060/yourdatabase?sslmode=require

## Passo a Passo

### 1. Acessar o Painel do DigitalOcean

Vá para [DigitalOcean Apps](https://cloud.digitalocean.com/apps/new) e escolha a opção DockerHub.

### 2. Configurar o Repositório

No campo "Repository", adicione chaskiq/chaskiq. Você pode usar a tag latest ou uma tag específica que pode ser encontrada [aqui](https://hub.docker.com/r/chaskiq/chaskiq "docker hub chakiq").

### 3. Configurar Comando de Execução e Porta HTTP

* Comando de execução: bundle exec rails s -b 0.0.0.0 -p 3000
* Porta HTTP: Deve ser a mesma porta mencionada no comando de execução, que é 3000.

### 4. Variáveis de Ambiente

Certifique-se de adicionar as variáveis de ambiente corretas. Se você não tiver certeza sobre quais variáveis utilizar, consulte o artigo sobre variáveis de ambiente do Chaskiq.

### 5. Iniciar o Build

Depois de preencher todas as configurações, clique em "Next". O aplicativo será construído em poucos minutos.

## Configuração Adicional: Sidekiq Worker

O Chaskiq usa o Sidekiq para tarefas em segundo plano. Para configurar o Sidekiq, vá até o painel do DO e adicione um novo "App Worker component". O comando de inicialização será:

bundle exec sidekiq -C config/sidekiq.yml

## Domínios

O DigitalOcean fornecerá um domínio padrão terminando em .ondigitalocean.app. Você também pode configurar seu próprio domínio personalizado.

## Migração e Criação do Admin

Finalmente, você deverá executar as migrações e criar um usuário admin:

```bat
bundle exec rails db:migrate
bundle exec rails db:seed
bundle exec rails admin_generation
```

## Conclusão

Parabéns! Você agora tem uma instância do Chaskiq rodando no DigitalOcean. Este guia deveria fornecer todas as informações necessárias para você colocar sua plataforma de suporte ao cliente em produção de forma eficaz.
