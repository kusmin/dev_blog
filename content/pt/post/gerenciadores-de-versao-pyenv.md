+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["pyenv", "gerenciadores de versão", "python"]
date = 2022-07-02T03:00:00Z
math = false
redirectUrl = ""
series = ["Gerenciadores de versão"]
tags = ["pyenv", "versionamento", "python"]
thumbnail = ""
title = "Gerenciadores de versão: Pyenv"

+++
Em prosseguimento a nossa serie de gerenciadores de versão, hoje vamos tratar do mundo Python e conversar sobre o pyenv que é o meu gerenciador favorito de versão para o Python. Ele é baseado no rbenv que é um gerenciador ruby.

Uma das vantagens que vejo no pyenv para outros gerenciadores de versão Ptython é que ele não depende do própria linguagem para funcionar, ele é feito e carregado a partir de shell scripts. Ele permite trocar facilmente entre versões, e utiliza-las de acordo com a necessidade, o que muitas no Linux ajuda ainda mais visto que o Python já é instalado por padrão. Link para o repositório do pyenv [https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv "https://github.com/pyenv/pyenv")

##### Instalação

Para o Linux são necessárias algumas instalações antes.

    sudo apt-get update
    sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev git

Depois desta instalação inicial podemos instalar o pyenv com este comando simples.

    curl https://pyenv.run | bash

Neste momento o pyenv já se encontra instalado na sua maquina contudo ainda precisamos configurar o bash. Para isto entre no seu arquivo '\~/.bashrc'.

    sudo nano ~/.bashrc

E cole o seguindo código no final do arquivo

    export PATH="$HOME/.pyenv/bin:$PATH"
    eval "$(pyenv init -)"
    eval "$(pyenv virtualenv-init -)"

Os comandos deste arquivo são executados no momento em que o usuário inicia um terminal de comando. O ponto no início do nome indica que ele é um arquivo oculto.

Agora você pode abrir um novo terminal para inicial o pyenv ou no terminal que fez a instalação rodar o seguinte comando.

    exec "$SHELL"

##### Usando o Pyenv

Assim como utilizamos no sdkman, vamos começar pelo comando help.

    pyenv help

![](/uploads/pyenvhelp.png)

Aqui podemos ver os comandos do Pyenv, no dia-a-da as principais funcionalidades que vamos usar serão as de: 

* Listar as versões disponíveis para download;
* Instalar uma versão;
* Exibir as versões instaladas;
* Executar uma versão específica;
* Desinstalar uma versão;

Um outro comando bem útil para se utilizar no linux é o 'man', ele traz um manual completo sobre o que pode ser feito com o Pyenv.

    man pyenv

Ele pode ser utilizado também para trazer um manual para outros comandos, mas isto é conversa para outro dia.

Voltando ao Pyenv para listarmos as versões disponíveis, usamos o comando.

    pyenv install --list

Como podemos observar, são várias versões disponíveis para download. Eu ainda não explorei este imenso catálogo. Também é possível filtrar o que será exibido utilizando “ | grep “ combinado com regex.

    $ pyenv install --list | grep "3\.[8]"

Com o comando acima, serão exibidos apenas as versões "3.8” disponíveis para download.

![](/uploads/versoespyenv.png)

A instalação de uma versão específica é feita através do comando “_pyenv_ _install_”, no comando abaixo instalamos a versão 3.8-dev.

    $ pyenv install 3.8-dev

Após instalar diferentes versões em sua máquina, é necessário conhecer as versões instaladas. Afinal de contas, dificilmente iremos memorizar esta informação. Para verificar as versões instalar na máquina, digite:

    $ pyenv versions

A escolha do interpretador que será utilizado nas aplicações é feita através do comando “pyenv global” seguida da versão. No exemplo abaixo iremos escolher a versão 3.8-dev

    $ pyenv global 3.8-dev

Uma vez que a versão do interpretador foi definida, basta executar ‘python helloWorld.py’ que o arquivo de nome helloWorld.py será executado. Para verificar a versão escolhida digite o comando:

    $ python -V

Para desinstalar uma versão, basta encontrar uma versão presente na máquina e digitar o comando “_pyenv uninstall_” seguido da versão escolhida. Desinstalação da versão 3.8-dev

    $ pyenv uninstall 3.8-dev

Neste guia de instalação cobrimos três pontos a respeito do Pyenv: descrição geral e seus benefícios; comandos necessários a instalação; e as principais operações, todas aquelas necessárias para operar a ferramenta no dia a dia.

Até a próxima !

 