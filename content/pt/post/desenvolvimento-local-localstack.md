---
_template: default
---


+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["devolvimento local", "localstack", "aws"]
date = 2022-09-04T03:00:00Z
draft = true
math = false
redirectUrl = ""
series = []
tags = ["localhost", "developer", "aws", "localstack"]
thumbnail = ""
title = "Desenvolvimento local: LocalStack"

+++
No desenvolvimento web utilizamos diversos serviços de clud como por exemplo a aws, google cloud, azure, digital ocen, entre outros. Como são serviços muitas vezes pago, é utilizado apenas nos ambientes de produção no máximo no de homologação, o problema é como simular estes serviços no ambiente local ? 

Neste artigo vamos ver uma opção para o ambiente da aws, o LocalStack.

## LocalStack

### O que é o LocalStack ?

É um emulador de serviço de nuvem que é executado em um único contêiner em seu laptop ou em seu ambiente de CI. Com o LocalStack, você pode executar seus aplicativos AWS ou Lambdas inteiramente em sua máquina local sem se conectar a um provedor de nuvem remoto! Esteja você testando aplicativos CDK complexos ou configurações do Terraform, ou apenas começando a aprender sobre os serviços da AWS, o LocalStack ajuda a acelerar e simplificar seu fluxo de trabalho de teste e desenvolvimento.

O LocalStack oferece suporte a um número crescente de serviços da AWS, como AWS Lambda, S3, Dynamodb, Kinesis, SQS, SNS e **muito** mais!

### Requisitos

* `python`(Python 3.7 ou maior)
* `pip`(Gerenciador de pacotes Python)
* `Docker`

### Instalação

A maneira mais fácil de instalar o LocalStack é via `pip`:

    pip install localstack
    

**Nota** : Por favor, **não** use `sudo`ou o `root`usuário - LocalStack deve ser instalado e iniciado inteiramente sob um usuário local não root. Se você tiver problemas com permissões no macOS High Sierra, instale com`pip install --user localstack`

Ele instala o `localstack-cli`que é usado para executar a imagem do Docker que hospeda o tempo de execução do LocalStack.

### Exemplo

Inicie o LocalStack dentro de um contêiner do Docker executando:

     % localstack start -d
    
         __                     _______ __             __
        / /   ____  _________ _/ / ___// /_____ ______/ /__
       / /   / __ \/ ___/ __ `/ /\__ \/ __/ __ `/ ___/ //_/
      / /___/ /_/ / /__/ /_/ / /___/ / /_/ /_/ / /__/ ,<
     /_____/\____/\___/\__,_/_//____/\__/\__,_/\___/_/|_|
    
     💻 LocalStack CLI 1.0.0
    
    [20:22:20] starting LocalStack in Docker mode 🐳
    [20:22:21] detaching
    

Você pode consultar o status dos respectivos serviços no LocalStack executando:

    % localstack status services
    ┏━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┓
    ┃ Service                  ┃ Status      ┃
    ┡━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━┩
    │ acm                      │ ✔ available │
    │ apigateway               │ ✔ available │
    │ cloudformation           │ ✔ available │
    │ cloudwatch               │ ✔ available │
    │ config                   │ ✔ available │
    │ dynamodb                 │ ✔ available │
    ...
    

Para usar o SQS, um serviço de enfileiramento de mensagens distribuído totalmente gerenciado, no LocalStack, execute:

    % awslocal sqs create-queue --queue-name sample-queue
    {
        "QueueUrl": "http://localhost:4566/000000000000/sample-queue"
    }

### Uso

Para começar a usar o LocalStack, confira nossa documentação em [docs.localstack.cloud](https://docs.localstack.cloud/) .

* [Configuração do LocalStack](https://docs.localstack.cloud/localstack/configuration/)
* [LocalStack no CI](https://docs.localstack.cloud/ci/)
* [Integrações do LocalStack](https://docs.localstack.cloud/integrations/)
* [Ferramentas LocalStack](https://docs.localstack.cloud/tools/)
* [Entendendo o LocalStack](https://docs.localstack.cloud/localstack/)
* [Solucionar problemas](https://github.com/localstack/localstack/blob/master/doc/troubleshoot/README.md)

Para usar o LocalStack com uma interface gráfica do usuário, você pode usar os seguintes clientes de interface do usuário:

* [Aplicativo de desktop Commandeer](https://getcommandeer.com/)
* [Interface de usuário da Web do administrador do DynamoDB](https://www.npmjs.com/package/dynamodb-admin)
