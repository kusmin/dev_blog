+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Linux"]
date = 2022-07-14T03:00:00Z
draft = true
math = false
redirectUrl = ""
series = []
tags = ["gerenciamento", "shell", "linux"]
thumbnail = ""
title = "Linux: Gerenciamento de Usuarios e "

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
5.  No quinto campo temos uma descrição para aquele usuário. 
6. No sexto temos a localização (diretório) onde esta aquele usuário.
7.  E por último temos o campo que mostra o shell representa onde esta o script daquele usuário.

##### Criar usuários 

Para criar um usuário dentro do sistema é bem simples. Basta executar o comando usearadd "nome-do-usuario".

    useradd teste

Se a gente voltar no arquivo passwd, podemos ver o usuário criado no final do arquivo.

    cat /etc/passwd

![usuário criado](/uploads/criadousuario.png "usuário criado")

Ele foi criado com os valores padrões, com o UID unico, um novo grupo, sem comentários e no caminho padrão de usuário e script. Podemos definir as opções com os parâmetros:

* 

   

 