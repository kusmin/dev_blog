+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Gerenciamento Linux", "Linux"]
date = 2022-07-21T03:00:00Z
draft = true
math = false
redirectUrl = ""
series = []
tags = ["linux", "gerenciamentolinux"]
thumbnail = ""
title = "Linux: Permissões de arquivos e diretórios  "

+++
Continuando nossa série sobre Linux, hoje veremos como gerenciar as permissões de arquivos e diretórios. Definindo permissões de acesso a leitura, escrita e execução para grupos e usuários, veremos os comandos:

* CHMOD;
* CHOW;
* Permissões especiais e UMASK.

#### Definindo as permissões

Primeiramente vamos analisar o stat de um arquivo qualquer. Execute os comandos:

    touch arquivo && stat arquivo

Primeiro criamos um arquivo com o comando touch e depois visualizamos o status do arquivo com o comando stat.

![status arquivo](/uploads/stat_arquivo.png "status arquivo")

Como podem ver no print é retornado muitas informações uteis como o caminho relativo do arquivo, o tamanho do arquivo em memoria, o INODE que é o identificador único do arquivo dentro do Linux, etc. 

A parte que nos interessa neste momento é a linha de "Acesso", ali se encontra as permissões