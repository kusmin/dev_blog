
+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["sdk", "sdkman", "java", "gerenciadores de versão", "programação"]
date = 2022-07-01T03:00:00Z
math = false
redirectUrl = ""
series = ["Gerenciadores de versão"]
tags = ["jvm", "opensource", "jdk", "java", "sdkman", "versionamento"]
thumbnail = "/uploads/images.png"
title = "Gerenciadores de versão: Sdkman"

+++
Hoje vamos começar nossa primeira serie aqui no site, que será sobre os gerenciadores de versão de linguagem. Se você já programa a algum tempo deve ter passado pelo pequeno pesadelo que é ter instalado em sua maquina, uma versão de sua jdk ou de seu interpretador python por exemplo e na hora de rodar algum outro programa descobri que a sua versão é incompatível com o programa. Ai precisa desinstalar a sua versão instalar a nova, muitas vezes trocar as variáveis de ambiente e etc. E caso precise da versão antiga ? Fazer tudo de novo ....

Felizmente hoje em dia quase todas as linguagens, tem alguma ferramenta de controle de versão que faz todo esse processo para você e te permite ter varias versões instaladas na sua maquina, e trocar facilmente entre elas.

E para começar esta serie vamos falar sobre o SDKMAN, que é o gerenciador do mundo Java.

## SDKMAN

Acessando o site oficial [https://sdkman.io/](https://sdkman.io/ "https://sdkman.io/"), podemos ver logo na parte uma breve introdução em que eles mesmo se descrevem como um gerenciador de kits de desenvolvimento de software. Agora vamos a instalação!

##### Instalação

Na pagina do Sdkman no menu superior você verá uma opção chamada install [https://sdkman.io/install](https://sdkman.io/install "https://sdkman.io/install"), entrando na pagina terá instruções de como instalar dependendo do seu sistema operacional, como o Sdkman é multiplataforma pode ser instalado nos mais diversos sistemas operacionais. Neste exemplo faremos a instalação no Linux.

Seguindo os comandos por eles mesmos descritos:

    $ curl -s "https://get.sdkman.io" | bash

Com este comando o sdkman, ja esta instalado em sua maquina, agora precisamos setar uma variável de ambiente para o Linux, com a localização do arquivo de script do sdkman.

    $ source "$HOME/.sdkman/bin/sdkman-init.sh"

Agora basta conferir a versão

    $ sdk version

![](/uploads/sdkversion.png)

Talvez sua versão esteja diferente deste tutorial, não tem problema, eles atualizam de tempos em tempos.

##### Usando o Sdkman

Agora com o Sdkman instalado, vamos começar a utiliza-lo. Um comando útil no Linux é o help, vamos utiliza-lo aqui.

    sdk help

![](/uploads/sdkhelp.png)

Nesta tela podemos ver os principais comandos do sdkman, e como utiliza-los, por exemplo, queremos ver todos uma lista de todas as versões do Java disponível...

    sdk list java

Vai aparecer uma lista com as versões do java disponíveis para instalação

![](/uploads/listjava.png)

Clicando na seta para abaixo ou rolando o mouse você pode ver mais versões, para sair da tela passa clicar 'q'.

Agora vamos escolher uma versão i e instalar em nossa maquina.

    sdk install java 17.0.3-zulu

E pronto ele vai começar a instalar esta versão do java. Podemos colocar essa versão como a padrão digitando 'y' apos a instalação ou não.

![](/uploads/sdkinstall.png)

Se preferir você pode alterar a versão padrão posteriormente utilizando o comando.

    sdk default java 17.0.3-zulu

Caso precise utilizar alguma outra versão (que você ja tenha instalado pelo sdk) é bem simples também.

Por exemplo:

    sdk use java 18.0.1-zulu

Vai definir essa versão do java para o terminal que tiver digitando para que você possa utilizar sem aquela complicação por causa de versão. Lembrando que esta versão vai estar disponível apenas no terminal que estiver utilizando, caso abra um novo este vai aparecer com a versão default.

Sdkman é uma ferramenta bem simples e que vai te ajudar a lidar melhor com as diferentes versões do mundo Jdk, no proximo post veremos sobre o pyenv ! Até a proxima ! 
