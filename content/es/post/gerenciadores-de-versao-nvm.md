+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["javascript", "nvm"]
date = 2022-07-06T03:00:00Z
math = false
redirectUrl = ""
series = ["Administradores de versiones"]
tags = ["administradores de versiones", "javascript", "node", "nvm"]
thumbnail = ""
title = "Administradores de versiones: NVM"

+++
O nvm(node version manager), é o gerenciador de versão para o node. Se você já trabalho com express, angular, react, vue entre outros dos milhões de framework Javascript, em algum momento teve que utiliza-lo e como sabemos existem diversas versões do node. Ai você teve que instalar aquela versão especifica para aquele componente react e depois quando mudou de projeto, teve que instalar outra versão. Que pesadelo !

Como bem sabemos ficar gerenciando várias versões de algo pode ser chato.

Com o NVM a gente pode ver as versões do Node, escolher quais queremos instalar ou desinstalar e definir qual queremos usar em cada momento ou projeto.

Ele funciona em MacOS e Linux. Caso você precise gerenciar no Windows existe um outro projeto chamado **nvm-windows** que também é muito bom (recomendado até mesmo por NPM, Google e Microsoft) e os comandos são iguais aos do **NVM**.

##### Instalação

Veremos a instalar do NVM no Linux.

Obs: É recomendado desinstalar qualquer versão do Node.js presente em sua máquina antes de instalar o NVM para evitar colisões.

Vamos acompanha a instalação da documentação do github em [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm "https://github.com/nvm-sh/nvm"), é bom conferir por lá qual a última versão disponível no momento deste post a ultima é a 0.39.1.

Para instalar o NVM basta usar o curl ou Wget. Execute no terminal:

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

Ou

    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

Isso vai executar um script que vai clonar o repositório do NVM e jogar em um diretório chamado `~/.nvm/`, que é onde serão instaladas as várias versões do Node.js que quisermos.

Em alguns casos vai ser necessário atualizar o shell. Execute o comando:

     source ~/.bashrc

Para conferir se foi tudo instalado certinho e nada versão correta podemos usar o comando help a qual já estamos familiarizados que é o help:

    nvm help

![Nvm Help](/uploads/nvmhelp.png "Nvm Help")

Podemos ver na tela a versão logo no inicio, com alguns comandos e exemplos.

##### Usando o NVM

Em alguns caso, pode ser que você precise logo após instalar, fechar o terminal e abrir outro ou mesmo reiniciar a sua máquina para pegar a instalação certinha.

###### Listar versões instaladas

 Para ver as versões que estão instaladas em sua máquina:

    nvm ls

![Versões instaladas](/uploads/versoes-instaladas.png "Versões instaladas")

Essas são as versões que tenho hoje instalado na minha maquina, caso tenha acabado de instalar o nvm não vai aparecer nenhuma versão. Para isto precisamos listar as versões disponíveis para instalação.

###### Listar versões disponíveis para instalação

Este comando lista todas as versões disponíveis para baixar e instalar na sua máquina. Esse número de versão será usado no comando para realizar a instalação.

    $ nvm ls-remote

Vai aparecer uma lista com todas as versões do node, em especial caso seja um projeto de produção, utilize as versões estáveis(marcadas com LTS).

###### Instalar uma versão

Para instalar usamos o comando `install` seguido pelo número da versão que queremos (mostrada no comando anterior, `ls-remote, lembrando que te avisei que íamos utiliza-lo depois `).

    nvm install <versão-escolhida>

Basta mudar a _versão-escolhida_ pelos números da versão que quer baixar como `v.0.11.5` ou `v.12.4.0`.

Para instalar a versão mais recente, utilize `node` no lugar do número da versão:

    nvm install node

A primeira versão que você instalar será usada por padrão sempre que você abrir o terminal. A versão padrão pode ser alterada depois utilizando o comando:

    nvm default <versão-escolhida>

###### Versão corrente

Caso deseje saber qual versão esta utilizando no momento, execute o comando:

    nvm current

Ele vai te retornar a versão utilizada no terminal que estiver usando.

###### Desinstalar uma versão

O comando `uninstall` é usado para desinstalar uma versão presente em nossa máquina. É utilizado da mesma maneira que o `install.`

    nvm uninstall <versão-escolhida>

###### Definir nome para uma versão

Para não ter que ficar chamando uma versão pelo seu número, podemos definir um tipo de apelido para cada versão. Para isso usamos o comando `alias` e passamos o nome do apelido e a versão que queremos apelidar.

    $ nvm alias meunome <versão-escolhida>

É um recurso bem interessante para poder chamar com mais facilidade uma versão para um projeto especifico por exemplo.

Com isso você poderá chamar a versão <versão-escolhida>por `meunome`, como em:

    nvm use meunome

###### Definição de versão por projeto

A intenção de usar o NVM é poder ter uma versão do Node.js para cada projeto, mas é muito difícil conseguir lembrar qual a versão foi usada em cada um.

Para isso, basta criar na raiz do projeto um arquivo com o nome `.nvmrc` e colocar dentro dele o número da versão do Node.js que está sendo utilizada nesse projeto, como:

    v12.4.0

Com isso, ao abrir o terminal dentro do projeto e executar o comando `nvm use`, o NVM vai automaticamente encontrar o arquivo `.nvmrc` e utilizar a versão indicada.

##### Conclusão

Neste guia cobrimos sobre o NVM, e mais salientamos mais uma vez as vantagens de se utilizar um gerenciador de versão para o trabalhar em diversões versões e projetos. Utilizar os gerenciadores de versão é uma pratica que vai te economizar tempo e te poupar de varias dores de cabeça desnecessárias. Até a próxima ! 