+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Linux"]
date = 2022-07-09T03:00:00Z
draft = true
math = false
redirectUrl = ""
series = []
tags = ["processos", "Linux"]
thumbnail = "/uploads/linux.jpeg"
title = "Linux: Gerenciamento de Processos"

+++
Neste post de hoje vamos falar sobre alguns comando uteis de gerenciamento de processos no Linux.

#### Introdução

Todos os processos no linux te um identificador único chamado de PID e possuem um processo pai chamado PPID. O primeiro processo executado no sistema e pai de todos os outros processos é o init, hoje quem o substitui o systemd de PID = 1. 

Um comando que podemos utilizar para verificar esta arvore de processos é o pstree.

    pstree

Vai mostrar uma árvore de comandos, em algumas distribuições ele não veem instalado por padrão devendo nestes casos instalar _psmisc_.

Por ele da pra ver que o systemd é o pai de todos eles. 

Caso desejar ver o PID dos processos, tem que passar o parâmetro -p.

     pstree -p

Vai mostrar novamente a árvore de processos, mas agora com o PID de cada processo.

#### Acompanhando os processos

Agora vamos ver o comando _top_, que é um processo muito utilizado no dia, que nos permite observar o que esta sendo executado em tempo real.

    top

![top](/uploads/top.png "Comando top")

Ele vai mostrando e atualizando os processos que estão rodando no sistema. Um dado muito importante que ele mostra é o _load average,_ que é a carga média no sistema