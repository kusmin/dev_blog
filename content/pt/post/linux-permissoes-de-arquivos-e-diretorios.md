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

A parte que nos interessa neste momento é a linha de "Acesso", ali se encontram as permissões tanto na forma octal(0644), quanto na forma escrita (-rw-rw-r--). São duas maneiras de descrever as permissões e que possuem os mesmos valores.

* O caractere "0" 'um simbolo especial que veremos mais a frente e o primeiro "-" representa o tipo de arquivo.
* O caractere "6" e os 3 primeiros dígitos da forma escrita (rw-), representam as permissões do usuário  dono do arquivo.
* O caractere "6" e os 3 dígitos do meio da forma escrita (rw-), representam as permissões do grupo dono do arquivo.
* O caractere "4" e os 3 dígitos do meio da forma escrita (r--), representam as permissões de outros.
* O Uid retorna o identificador do usuário dono mais o nome do mesmo.
* O Gid retorna o identificador do grupo dono mais o nome do mesmo.

A outras formas de ver as informações de permissão, os mais usados sendo os comandos "ll" ou "ls -l". Exemplo:

    ls -l

![comando ls -l](/uploads/ls-l.png "comando ls -l")

Cada simbolo deste representa uma ação que pode ser realizada pelo usuário no arquivo, vamos começar vendo a por escrita:

* O "r" simboliza o "read", permissão para ler o arquivo.
* O "w" representa o "write", permissão para escrever e alterar o arquivo.
* O 