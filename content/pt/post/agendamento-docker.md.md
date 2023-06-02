---
author: Renan Ribeiro Lage
title: Agendamento de limpeza no Docker com Docker GC
date: '2023-04-23T03:00:00.000Z'
tags:
  - infra
  - docker
series:
  - docker
  - infraestrutura
categories:
  - linux
  - infraestrutura
  - docker
---

\# Agendamento de limpeza no Docker com Docker GC

\## Introdução

O Docker é uma plataforma popular para desenvolvimento, implantação e execução de aplicações em contêineres. No entanto, com o uso contínuo, imagens e contêineres não utilizados podem acumular-se, ocupando espaço em disco e tornando o ambiente menos eficiente. O Docker GC é uma ferramenta de terceiros que ajuda a eliminar automaticamente contêineres e imagens não utilizados com base em diferentes critérios. Neste artigo, explicaremos como agendar a limpeza do Docker utilizando o Docker GC.

\## Passo 1: Instalar Docker GC

O Docker GC é um projeto open-source desenvolvido pela Spotify. Para instalá-lo, siga os passos abaixo:

```powershell
git clone https://github.com/spotify/docker-gc.git
sudo cp docker-gc/docker-gc /usr/local/bin/
sudo chmod +x /usr/local/bin/docker-gc
```

## Passo 2: Configurar Docker GC

O Docker GC utiliza variáveis de ambiente para personalizar seu comportamento. Para eliminar imagens e contêineres não utilizados nos últimos 3 dias, crie um arquivo chamado docker-gc.env em /etc/ com o seguinte conteúdo:

```powershell
GRACE_PERIOD_SECONDS=259200
```

A variável GRACE\_PERIOD\_SECONDS define o tempo em segundos que deve passar antes de eliminar um contêiner ou imagem não utilizados. O valor 259200 equivale a 3 dias (3 \* 24 \* 60 \* 60).

## Passo 3: Criar um script para executar Docker GC

Crie um arquivo chamado run-docker-gc.sh em /usr/local/bin/ com o seguinte conteúdo:

```powershell
#!/bin/bash
source /etc/docker-gc.env
/usr/local/bin/docker-gc
```

Torne o script executável:

```powershell
sudo chmod +x /usr/local/bin/run-docker-gc.sh
```

## Passo 4: Agendar a limpeza com uma tarefa programada (cron job)

Para agendar a execução do script run-docker-gc.sh todos os dias às 9:20, abra o arquivo crontab com o seguinte comando:

```powershell
sudo crontab -e
```

Adicione a seguinte linha ao final do arquivo crontab:

```powershell
20 9 * * * /usr/local/bin/run-docker-gc.sh
```

Salve as alterações e feche o editor. Agora, o script run-docker-gc.sh será executado diariamente às 9:20.

## Funcionalidades adicionais do Docker GC

* Limpeza de imagens específicas: O Docker GC permite especificar uma lista de imagens a serem excluídas da limpeza, mesmo que não estejam em uso. Para fazer isso, adicione a variável IMAGE\_EXCLUDE\_PATTERN ao arquivo docker-gc.env:

```powershell
IMAGE_EXCLUDE_PATTERN="^myrepo\/myimage:.*"
```

* Limpeza de contêineres específicos: Similarmente, você pode excluir contêineres específicos da limpeza. Adicione a variável CONTAINER\_EXCLUDE\_PATTERN ao arquivo docker-gc.env:

```powershell
CONTAINER_EXCLUDE_PATTERN="^mycontainerprefix-.*"
```

* Forçar a remoção de imagens: O Docker GC não remove imagens em uso por padrão. Se desejar forçar a remoção de todas as imagens, incluindo as em uso, adicione a variável FORCE\_IMAGE\_REMOVAL ao arquivo docker-gc.env:

```javascript
FORCE_IMAGE_REMOVAL = 1
```

* Forçar a remoção de contêineres : Semelhante à remoção de imagens, você pode forçar a remoção de todos os contêineres, incluindo os em uso, adicionando a variável FORCE\_CONTAINER\_REMOVAL ao arquivo docker-gc.env:

```powershell
CLEAN_UNUSED_NETWORKS=1
```

* Para habilitar a limpeza de volumes, adicione a variável CLEAN\_UNUSED\_VOLUMES ao arquivo docker-gc.env:

```powershell
CLEAN_UNUSED_VOLUMES=1
```

## Conclusão

O Docker GC é uma ferramenta útil para manter seu ambiente Docker limpo e eficiente. Ao seguir os passos deste artigo, você pode configurar e personalizar a limpeza automática de contêineres, imagens, redes e volumes não utilizados. Isso ajudará a evitar o acúmulo de recursos não utilizados e a otimizar o uso do espaço em disco.
