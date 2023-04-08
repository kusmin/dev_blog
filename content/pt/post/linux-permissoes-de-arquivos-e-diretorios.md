+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Gerenciamento Linux", "Linux"]
date = 2022-07-21T03:00:00Z
math = false
redirectUrl = ""
series = ["Linux"]
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

* O "r" simboliza o "read", permissão para ler o arquivo ou listar arquivos do diretório.
* O "w" representa o "write", permissão para escrever e alterar o arquivo ou criar e remover no diretório .
* O "x" representa o "execute", permissão para executar o arquivo ou acessar o diretório.

Para adicionarmos uma permissão ao arquivo para todos os usuários, podemos executar o comando "chmod +"permissão". Por exemplo.

     chmod +x arquivo

Com este comando adicionamos a permissão de execução para todos os usuários. Conforme podem verificar pela imagem abaixo.

 ![chmod x](/uploads/chmod-x.png "chmod x")

O chmod é o comando que utilizamos para alterar  a permissão, remover permissão ou redefinir as definições. Podem ser passados os parâmetros:

* u => Usuário.
* g => Grupo.
* o => Outros.
* a => Todos.

Caso não seja passado o parâmetro o padrão é o "a" para todos. Além disso o "+" serve para adicionar permissão, o "-" para remover e o "=" para definir as permissões. Exemplos:

    chmod u=rwx,g=r,o=r arquivo

Definimos que o usuario tem permissão de leitura, escrita e execução para o arquivo, e o grupo e os outros somente de leitura.

    chmod a-r

Retiramos a permissão de leitura para todos.

    chmod u+r

Adicionamos a permissão de leitura para o usuário.

Você sempre pode confirmar estas alterações com os comandos "stat" e "ls -l". 

Podemos também alterar pela forma octal, que como dito antes a representa a mesma coisa somente que da forma numérica, se executarmos.

     stat arquivo

![ocotal](/uploads/ocotal.png "ocotal")

O valor 775 representa as permissões na forma octal, que tem o mesmo correspondente na forma escrita:

* O "r" tem um valor de 4.
* O "w" tem um valor de 2.
* O "x" tem um valor de 1.

Pela soma podemos saber a permissão, o 7 representa a soma das 3 permissões, 4 +2 + 1 = 7, já o 5 representa a soma de 4 + 1 ou seja permissão de leitura e execução. Aqui podemos usar o comando chmod também na forma octal.

    chmod 777 arquivo

Defini permissão total para todos.

    chmod 400 arquivo

Defini permissão de leitura para o usuário e nenhuma para o grupo ou os outros.

O chmod também tem o parâmetro -R que defini as permissões recursivamente para todos os arquivos do diretório.

#### Alterando os donos do arquivo

O usuário e o grupo a que pertencem os arquivos e diretórios podem ser alterados pelo comando chown:

* chown usuário "arquivo ou diretório".
* chown usuario:grupo "arquivo ou diretório".
* chown :grupo "arquivo ou diretório".
* chgrp grupo "arquivo ou diretorio".

Podemos passar o parâmetro -R para alterar de forma recursiva.

Exemplos:

    chown root arquivo

 Alterei o usuário do arquivo para root.

    chown root:root arquivo

Alterei o usuário e o grupo do arquivo para o root.

    chown :root arquivo

Alterei o grupo do arquivo para root.

    chown -R root:root dir

Alterei todos os arquivos do diretório dir para terem como usuário e grupo o root.

#### Conclusão

Neste post aprendemos como gerenciar e como funciona as permissões de arquivos e diretórios no Linux, utilizando principalmente os comandos chmod e chown. Até a próxima !
