---
_template: default
---

+++
aliases = []
author = "Renan Ribeiro Lage"
categories = []
date = 2022-07-11T03:00:00Z
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

#### Enviando sinais aos processos

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

Em que ficamos esperando por novas escritas no arquivo, isso é muito útil para acompanhar logs. Um outro exemplo de foreground, vou criar um processo de for que vai ficar preso:

    for i in `seq 1000` ; do sleep 2 ; echo $i ; done

O comando executa um for de 0 ate 1000, imprimindo os valores a cada 2 segundos, se você executou na sua maquina, verá que não consegui executar mais nenhum comando, o processo 'prendeu' seu terminal. O comando esta em primeiro plano.

Podemos executar o mesmo comando em backgound, utilizando o mesmo comando vamos acrescentar um '&' no final. Vejam só:

    for i in `seq 1000` ; do sleep 2 ; echo $i ; done &

Agora ele esta executando o processo, em segundo plano, background e você pode executar outros comandos no terminal, enquanto este fica sendo executado em segundo plano. Quando digito jobs ele mostra todos os processos que estão sendo executados em segundo plano no terminal.

    jobs

![jobs](/uploads/jobs.png "jobs")

Retorna o numero dos jobs, o estado deles e o comando que esta executando. Se quiser passar o processo para foreground digito fg seguido do numero do job neste caso 1.

    fg 1

O processo agora esta em foreground. Caso digite agora Ctrl + Z ele pausa o processo e coloca em background novamente. Colocando ele para rodar novamente em backgound, basta digitar o comando bg seguido do numero do jobs.

    bg 1

Caso deseje matar o job, temos o comando kill. O comando kill seguido de % e o numero do job.

    kill %1

Agora para finalizar vamos falar sobre as prioridades.

#### Prioridades

As prioridades no Linux que vão de 0 a 39, em geral quando o Linux cria um novo processo este já 'nasce' com prioridade 20 é a padrão do sistema. Quanto menor o valor de prioridade do processo, vai prioritário ele da mesma forma quando maior o valor de prioridade, menor é sua prioridade. Neste caso o processo com 0 é o mais prioritário e os de 39.

Podemos definir ou alterar o valor da prioridade com o nice, que vai de -20 a 19, caso definimos o nice como -20, o processo vai ter prioridade 0, caso definimos como 19 vai ter prioridade 39.

Ao rodarmos o comando top, podemos ver os valores de prioridade e nice dos processos.

    top

![prioridades](/uploads/prioridades.png "prioridades")

A 3 coluna, 'PR' mostra os valores de prioridade e a c 4 coluna, 'NI' representa o valor do nice. Como dito antes o processo nasce com prioridade 20 e nice 0.

Para definir a prioridade manualmente podemos usar o comando nice seguido de -n, o valor do nice, seguido do comando. Por exemplo vamos executar o comando top com prioridade máxima 0.

    nice -n -20 top

Ou com a prioridade minima.

    nice -n 19 top

O nice somente pode ser utilizado ao criar um processo. Para alterar o processo depois de criado temos o renice. É executado usando renice -n numero do nice, seguido do pido do processo.

    renice -n 'NUMERO_RENICE' 'NUMERO_PID'

Um detalhe que usuários comuns somente podem utilizar o renice com valores positivos. Para valores negativos tem que ser com usuário root

#### Conclusão

Neste post fechamos os principais comandos para gerenciamento do Linux, vimos os processo ps, kill, foreground, background e como definir prioridade com o nice e renice.

Espero que com este post consiga dar mais um passo na utilização do Linux. Até a próxima !
