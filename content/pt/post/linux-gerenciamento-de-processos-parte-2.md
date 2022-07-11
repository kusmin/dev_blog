+++
aliases = []
author = "Renan Ribeiro Lage"
categories = []
date = 2022-07-11T03:00:00Z
draft = true
math = false
redirectUrl = ""
series = ["Linux"]
tags = ["linux", "processos"]
thumbnail = ""
title = "Linux: Gerenciamento de Processos - Parte 2"

+++
Neste post dando prosseguimento aos comandos úteis para gerenciamento do Linux, vamos aprender como verificar os processos com o comando 'ps', enviar sinais aos processos com os comandos 'kill', 'killall' e 'pkill', processos em foreground e background e como alterar as prioridades dos mesmos.

#### PS

O comando ps lista os processos correntes no terminal do usuário.

    ps

![ps](/uploads/ps.png "ps")

Como pode ser visto no meu caso, tinha somente o próprio ps e o bash executando no meu terminal naquele momento, além disso retorna o PID destes processos.

Podemos passar alguns parâmetros junto ao _ps_ para maior detalhe de informações. Rodando o comando:

    ps --help all

Ele trás  uma lista de parâmetros que podemos utilizar, sendo os mais importantes de sabermos:

* -u => Mostra mais informações relacionadas ao usuário.
* -x => Mostra processos que não foram iniciados diretamente em seu terminal. 
* -a => Mostra os processos de todos os usuários.

Se digitarmos o comando:

    ps aux

![ps aux](/uploads/ps-aux.png "ps aux")

Retorna a lista de todos os processos bem detalhadamente, é um comando bem útil para o dia-a-dia.

É bem comum junto com comando ps aux, utilizarmos o grep para podermos filtrar esta lista que é bem longa. Um exemplo:

    ps aux | grep nginx

![ps nginx](/uploads/ps-nginx.png "ps nginx")

Com o grep podemos ver apenas os processos que nos interessam, neste caso, ele não retornou os processos do nginx que estão sendo executados na minha maquina.

####  Enviando sinais aos processos

##### kill

O comando kill é utilizado para enviar sinais aos processos, sinais podem ser dos tipos mais variados, para terminar, pausar, retomar um processo e entre outros, com o comando:

    kill -l

Ele vai nos retornar uma lista de sinais que podemos enviar aos processos.

![](/uploads/kill-lista.png)

Um exemplo de sinal é quando estamos começando a digitar um comando ou mesmo estamos executando um comando e digitamos Crtl + C, neste caso estamos enviado um sinal, que é o 2) SIGINT sinal de interrupção.

Outro dois exemplos que temos de sinais muito utilizados é o 15 é o SIGTERM que termina um processo e o 9 SIGKILL que termina o processo de forma abrupta. O mais recomendável é sempre executar primeiramente o 15 que ele vai enviar ao processo para terminar e o processo vai acabar o que estiver fazendo naquele momento e depois terminar. No 9 ele vai terminar o processo independente de qualquer coisa, o que pode levar a problemas caso o processo esteja fazendo algo importante como um commit no banco de dados, no caso se tivesse usado o 15 ele teria acabado o commit e somente depois terminado o processo.

Tem duas maneira de enviar os sinais para os processos:

1. kill -s SIGTERM "PID-PROCESSO"
2. kill -15 "PID-PROCESSO"

Ou seja pode mandar pelo nome do sinal ou pelo numero dele seguido do nome do processo.

Por padrão o kill é o 15 SIGTERM, caso deseja enviar este sinal para o processo pode escrever de forma resumida:

    kill "NOME-PROCESSO"

##### killall e pkill

O killall mata o processo baseado no nome exato do processo e o pkill é uma forma de grep ele vai matar todos os processos encontrados com aquele regex.

    killall "NOME-PROCESSO"

    pkill "REGEX-PROCESSOS"

#### Foreground(fg) e Background(bg)

O foreground é o processo que aparece executando no seu terminal naquele momento, "prendendo" o seu terminal a ele. Por outro lado o background é o processo que acontece por trás, sem você "ver", nesse caso ele libera o terminal para você. 

Um exemplo de processo em foreground é quando utilizamos o comando:

     tail -f "nome-arquivo"

Em que ficamos esperando por novas escritas no arquivo, isso é muito útil para acompanhar logs. Um outro exemplo de foreground: