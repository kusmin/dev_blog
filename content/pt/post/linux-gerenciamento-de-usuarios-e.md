+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Linux"]
date = 2022-07-14T03:00:00Z
math = false
redirectUrl = ""
series = []
tags = ["gerenciamento", "shell", "linux"]
thumbnail = ""
title = "Linux: Gerenciamento de Usuários"

+++
Fazer a gestão de usuários no Linux, não é tão intuitiva quanto a que temos no Windowns onde consegue fazer praticamente tudo de modo gráfico e transparente. No Linux precisamos utilizar o terminal e por incrível que pareça com alguns poucos comandos é possível gerenciar usuários e grupos de usuários de forma pratica e poderosa.

Neste post vamos aprender como criar um usuário, deletar um usuário e alterar um usuário.

#### Gerenciamento de usuários

Os usuários são armazenados no arquivo /etc/passwd. Executando o comando cat podemos dar uma olhada neste arquivo.

    cat /etc/passwd

![usuários do sistema](/uploads/usuariodosistema.png "usuários do sistema")

Provavelmente no seu sistema, também vai ter vários usuários, isso acontece que os usuários não são apenas aqueles em que você loga no sistema ou cria para uma pessoa, mas também usuários utilizados por programas nativos do sistema operacional ou que foram instalados depois.

Este arquivo parece cheio de letras e complicados, vamos entender o que cada coisa faz.

Antes de mais nada cada linha representa um usuário. Em cada linha temos informações separadas por ':', o que temos ali sete tipos de informação, agora vamos entender cada uma delas, pegando ali por exemplo o usuário 'renan' que foi o que foi criado quando coloquei o Linux na minha maquina.

> renan:x:1000:1000:renan,,,:/home/renan:/bin/bash

Estes sete campos podem ser melhor explicados desta forma:

> Nome:Senha:UID:GID:Descrição:Home:Shell

1. O primeiro campo representa o nome do usuário, neste caso 'renan'
2. O segundo campo que esta marcado com  o 'x' representa a senha que anteriormente ficava neste espaço mas hoje em dia nos sistemas mais modernos é armazenada no arquivo /etc/shadow.

       sudo cat /etc/shadow

   Você vai ver as senhas que estão criptografadas.
3. O terceiro campo representa o  UID que é um identificador único do usuário dentro do sistema.
4. O quarto campo representa o GID que é o identificador do grupo a qual aquele usuário faz parte.
5. No quinto campo temos uma descrição para aquele usuário.
6. No sexto temos a localização (diretório) onde esta aquele usuário.
7. E por último temos o campo que mostra o shell representa onde esta o script daquele usuário.

##### Criar usuários

Para criar um usuário dentro do sistema é bem simples. Basta executar o comando usearadd "nome-do-usuario".

    useradd teste

Se a gente voltar no arquivo passwd, podemos ver o usuário criado no final do arquivo.

    cat /etc/passwd

![usuário criado](/uploads/criadousuario.png "usuário criado")

Ele foi criado com os valores padrões, com o UID unico, um novo grupo, sem comentários e no caminho padrão de usuário e script. Podemos definir as opções com os parâmetros:

* -s => Define o script relacionado aquele usuário, o caminho do script.
* -c => Permite definir um comentário para o usuário, a parte de descrição do usuário do arquivo etc/passwd
* -m => Solicita a criação do home. Obs: A maioria das distribuições cria a home automaticamente.
* -d => Defini o nome da pasta home.
* -g => O grupo primário.
* -G => O grupo secundário.

Um exemplo seria:

    useradd teste2 -s bin/sh -g teste -c teste2

Conferindo no arquivo etc/passwd.

    cat /etc/passwd

![Criar usuário teste](/uploads/criarusuarioteste.png "Criar usuário teste")

Pode observar que o usuário teste2 ele pertence ao mesmo grupo do usuário teste. Além disso foi acrescentado o comentário, que colocamos e o caminho do shell.

Para alterar a senha de um usuário podemos executar o comando, passwd "nome-usuario".

    passwd teste 

Lembrando que para alterar vai ter que ser com o 'sudo'(root) ou estar logado com o usuário.

##### Remover usuários

Para remover usuários temos o comando: userdell "nome-usuario".

    userdel teste2

Se consultar novamente o arquivo etc/passwd o usuário foi removido. Contudo se verificarmos a pasta /home a pasta do usuário ainda existe, para deletarmos ela precisamos passar o parâmetro -r.

    userdel -r teste

Agora tanto o usuário quanto a pasta foram removidos.

##### Modificar usuários

Temos os mesmo parâmetros que podem ser usados na criação do usuário. O comando seria: usermod "opções" "nome-usuário".

    usermod -c teste teste

No exemplo adicionamos um comentário de teste ao usuário teste.

#### Gerenciamento de grupos

Como podemos ver na primeira parte, os usuários pertencem a grupos, primário e podendo também ter um grupo secundário. Agora vamos aprender como gerenciar os grupos, que assim como os usuários tem um arquivo com de informações que é o 'group'.

    cat /etc/group

![group](/uploads/group.png "group")

Cada linha representa um grupo e cada grupo é separado em quatro campos:

> Grupo:Senha:ID:Usuários

O campo de senha assim como acontece nos usuarios fica em outro arquivo no /etc/gshadow

    cat /etc/gshadow

Aqui também a senhas para a senha são criptografadas.

O funcionamento dos comandos aqui são bem parecidos com os do usuário, por isso vou deixar o teste para vocês, passando apenas os comandos a serem usados.

###### Cria grupo

Para criar o grupo temos o comando: groupadd "nome-grupo"

     groupadd teste

###### Alterar grupo primário do usuário

Para alterar o grupo principal de um usuário temos o comando: usermod -g "grupo" "usuário".

    usermod -g teste2 teste

###### Alterar grupo secundário do usuário

Bem parecido com o comando anterior: usermod -G "grupo" "usuário".

    usermod -G teste2 teste

###### Adicionar usuário em grupo

Para adicionar usuário a um grupo temos o comando: usermod -a -G "grupo" "usuário".

    usermod -G teste2 teste

Aqui temos que passar o parâmetro -a para adicionar senão ele vai simplesmente alterar o grupo secundário.

Obs: Um usuário pode ter somente um grupo principal e vários grupos secundários.

###### Mostrar o UID e todos os GID do usuário

Podemos ver todos os grupos e o UID de um usuário com o comando: id "usuário"

    id teste

###### Mostra grupos do usuário 

Para mostrar os grupos de um usuário temos o comando: groups "usuario"

    group teste

###### Getent

E para finalizar podemos usar o comando getent para consultar os arquivos /etc/passwd e /etc/group, para acesso temos dois comandos:

1. getent passwd
2. getent group

#### Conclusão

Podemos aprender como é mais fácil e pratico do que aparenta o gerenciamento de usuários e grupos dentro do Linux.