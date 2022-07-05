+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["ferramentas", "ruby", "versionamento"]
date = 2022-07-04T03:00:00Z
math = false
redirectUrl = ""
series = ["Gerenciadores de versão"]
tags = ["rvm", "gerenciadores de versão", "ruby"]
thumbnail = ""
title = "Gerenciadores de versão: RVM"

+++
Hoje na nossa serie sobre gerenciadores de versão,vamos falar de um dos primeiros gerenciadores que foi o RVM(Ruby Version Manager), que é um gerenciador de versão para a linguagem ruby, que ficou muito conhecida pelo seu framework de Ruby on Rails.

Vamos passar pelo mesmo caminho que fizemos nos os outros posts da serie mostrando como configurar e instala-lo no Linux.

##### Instalação

O RVm ele é um gerenciador multiplataforma e pode ser instalado na maioria dos sistemas operacionais sem muita dificuldade, conforme documentado no site deles [https://rvm.io/rvm/install](https://rvm.io/rvm/install "https://rvm.io/rvm/install").

Para começar antes da instalação antes, precisamos do software-properties-common para instalar os repositórios PPA:

    sudo apt-get install software-properties-common

Após vamos adicionar o PPA do rvm e ja instalar o mesmo:

    sudo apt-add-repository -y ppa:rael-gc/rvm
    sudo apt-get update
    sudo apt-get install rvm

Em seguida adicione o seu usuário ao grupo do rvm:

     sudo usermod -a -G rvm $USER

Na sequencia adicione ao seu bashrc:

    echo 'source "/etc/profile.d/rvm.sh"' >> ~/.bashrc 

Confira se foi tudo instalado corretamente

    rvm --version

![](/uploads/rvmversion.png)

Pronto! Agora vamos conferir a sua utilização.

##### Utilizando o RVM

Vamos começar utilizando nossos velhos conhecidos os comando help e man. Como você já deve estar familiarizado o comando help da uma ajuda básica mas não menos essencial e o comando man é o manual completo do comando.

    rvm --help

![](/uploads/rvmhelp.png)

Não muito diferente dos outros gerenciadores podemos ver pelos comandos que ele nos permite instalar, listar e gerenciar diferentes versões do ruby. O comando man vou deixar por sua conta testar ai.

Para listar as versões instaladas, temos o comando.

    rvm list

![](/uploads/rvmlisrruby.png)

Como não temos nenhum versão ainda instalada, não vai aparecer nenhuma, vamos listar as opções de instalação com o comando.

    rvm list known

![](/uploads/rvmlistrubytodas.png)

Agora temos varias opções de instalação, vamos instalar a versão 3.0.0 com o comando.

    rvm install ruby-3.0.0

Algumas vezes pode aparecer problema de permissão, assim uma solução simples é reiniciar o shell, para limpar as variáveis do mesmo. Pode reiniciar o computador ou deslogar o usuário. 

Outro problema que pode ocorrer é de não conseguir instalar devido ao openssl, neste caso será necessário o comando abaixo, principalmente para versões mais recentes do ruby.

    rvmsudo rvm pkg install openssl

Caso ocorra tudo certo na sua corra.

    rvm current

E verá a sua verão instalada no terminal.

Hoje podemos ver mais um gerenciador de versão, desta vez para o mundo ruby. Na próxima veremos sobre o nvm! 