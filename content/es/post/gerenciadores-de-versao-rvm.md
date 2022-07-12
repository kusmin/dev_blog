+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["ferramentas", "ruby", "versionamento"]
date = 2022-07-04T03:00:00Z
math = false
redirectUrl = ""
series = ["administradores de versiones"]
tags = ["rvm", "gerenciadores de versão", "ruby"]
thumbnail = ""
title = "Administradores de versiones: RVM"

+++
Hoy en nuestra serie sobre gestores de versiones, hablaremos de uno de los primeros gestores que fue RVM (Ruby Version Manager), que es un gestor de versiones para el lenguaje ruby, que se hizo muy conocido por su framework Ruby on Rails.

Vamos a recorrer el mismo camino que hicimos en los otros posts de la serie mostrando cómo configurarlo e instalarlo en Linux.

##### Instalación

RVm es un gestor multiplataforma y se puede instalar en la mayoría de los sistemas operativos sin mucha dificultad, como se documenta en su página web [https://rvm.io/rvm/install](https://rvm.io/rvm/install "https://rvm.io/rvm/install").

Para empezar antes de la instalación, necesitamos el software-properties-common para instalar los repositorios PPA:

    sudo apt-get install software-properties-common

A continuación, vamos a añadir el PPA de rvm e instalarlo:

    sudo apt-add-repository -y ppa:rael-gc/rvm
    sudo apt-get update
    sudo apt-get install rvm

A continuación, añada su usuario al grupo rvm:

     sudo usermod -a -G rvm $USER

Luego agrega a tu bashrc:

    echo 'source "/etc/profile.d/rvm.sh"' >> ~/.bashrc 

Compruebe si todo se ha instalado correctamente

    rvm --versión

![](/uploads/rvmversion.png)

¡Eso es! Ahora vamos a comprobar su uso.

##### Usando RVM

Empecemos por utilizar nuestros viejos amigos los comandos help y man. Como ya debes estar familiarizado, el comando help es una ayuda básica pero no menos esencial y el comando man es el manual completo del comando.

    rvm --help

![](/uploads/rvmhelp.png)

No muy diferente de los otros gestores podemos ver por los comandos que nos permite instalar, listar y gestionar diferentes versiones de ruby. El comando hombre lo dejaré para que lo pruebes allí.

Para listar las versiones instaladas, tenemos el comando

    lista rvm

![](/uploads/rvmlisrruby.png)

Como aún no tenemos ninguna versión instalada, no veremos ninguna, así que vamos a listar las opciones de instalación con el comando

    lista rvm conocida

![](/uploads/rvmlistrytodas.png)

Ahora tenemos varias opciones de instalación, vamos a instalar la versión 3.0.0 con el comando

    rvm install ruby-3.0.0

A veces puede aparecer un problema de permisos, por lo que una solución sencilla es reiniciar el shell, para limpiar sus variables. Puede reiniciar el ordenador o cerrar la sesión del usuario. 

Otro problema que puede ocurrir es no poder instalar debido a openssl, en este caso necesitarás el comando de abajo, especialmente para las versiones más nuevas de ruby.

    rvmsudo rvm pkg install openssl

Si todo va bien en tu carrera.

    corriente rvm

Y verás tu verano instalado en el terminal.

Hoy podemos ver un gestor de versiones más, esta vez para el mundo ruby. ¡La próxima vez veremos sobre nvm! 
