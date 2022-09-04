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

### 