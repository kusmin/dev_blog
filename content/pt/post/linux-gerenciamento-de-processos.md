+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Linux"]
date = 2022-07-09T03:00:00Z
math = false
redirectUrl = ""
series = ["Linux"]
tags = ["processos", "Linux"]
thumbnail = ""
title = "Linux: Gerenciamento de Processos - Parte 1"

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

##### top

Agora vamos ver o comando _top_, que é um processo muito utilizado no dia, que nos permite observar o que esta sendo executado em tempo real.

    top

![top](/uploads/top.png "Comando top")

Ele vai mostrando e atualizando os processos que estão rodando no sistema. Um dado muito importante que ele mostra é o _load average,_ que é a carga média no sistema. O primeiro numero nele mostra o ultimo minuto, o segundo os últimos cinco minutos e o terceiro os últimos quinze minutos. Caso o primeiro seja maior que os outros a carga esta subindo, caso esteja mais baixa esta caindo ao longo do tempo.

Dentro do comando se você digitar um, ele mostra as Cpu, e a carga em cada uma delas.

![Cpus](/uploads/cpus.png "Cpus")

O id dentro da cpu mostra o uso ocioso da Cpu, caso esteja alto tudo bem, mas caso esteja alto, quer dizer um esta fazendo algum processo mais pesado. O wa mostra a espera para escrever em disco, caso esteja baixo não tem problema, mas caso esteja alto esta escrevendo em disco. Um Exemplo é caso tenha um id baixo e wa alto pode ser um gargalho para escrita em disco.

Estes valores com a pratica você vai pegando o significado de cada valor.

Dois comandos que são importantes de se conhecer para ordenar é os **_Schift + M_** que ordena pela memoria, assim você ver o processo que esta consumindo mais memoria. E o **_Schift + C_** mostra o comando que esta consumindo mais Cpu.

Para sair do comando top basta digitar 'q'.

##### free

Outro comando importante para acompanhar o gerenciamento do servidor é o free que mostra o consumo de memoria da maquina.

    free

![free](/uploads/free.png "free")

Neste caso ele esta mostrando em bytes para mostra em megabytes, podemos passar o parâmetro -m.

    free -m

![](/uploads/free-m.png)

O Linux tem uma tendencia a usar o máximo de memoria que ele puder para maximizar os processos, muitas vezes armazenando em cache no filesystem, não se pode basear apenas no free mas principalmente no avaliable.

##### uptime

É um comando que mostra o quanto tempo o quanto tempo a maquina esta ligada e o load average.

![uptime](/uploads/uptime.png "uptime")

##### pidof pgrep

Os últimos comandos que vamos ver hoje é o pidof e o pgrep.

O pidof retorna o o pid do processo pelo nome exato pelo processo, no pgrep retorna baseado em um regex igual ao grep normal que pode ser usado em outros comandos. Por exemplo:

> pidof snap-store

![pidof](/uploads/pidof.png "pidof")

    pgrep snap

![](/uploads/pgrep.png)

Pode observar que o pgrep retornou mais de um resultado encontrado para aquele valor de regex. 

#### Conclusão

Vimos alguns comandos muitos úteis para que você consiga gerencias o seu servidor ou sistema Linux no dia-a-dia. Até a próxima !
