+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["pyenv", "administradores de versiones", "python"]
date = 2022-07-02T03:00:00Z
math = false
redirectUrl = ""
series = ["Administradores de versiones"]
tags = ["pyenv", "versionamento", "python"]
thumbnail = ""
title = "Administradores de versiones: Pyenv"

+++
Continuando con nuestra serie sobre gestores de versiones, hoy vamos a tratar el mundo de Python y hablaremos de pyenv que es mi gestor de versiones favorito para Python. Está basado en rbenv que es un gestor de versiones de ruby.

Una de las ventajas que le veo a pyenv respecto a otros gestores de versiones de Python es que no depende del propio lenguaje para funcionar, se hace y se carga desde los scripts de la shell. Le permite cambiar fácilmente entre las versiones, y utilizarlas según sea necesario, lo que en Linux ayuda aún más ya que Python ya está instalado por defecto. Enlace al repositorio pyenv [https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv "https://github.com/pyenv/pyenv")

##### Instalación

En el caso de Linux es necesario realizar primero algunas instalaciones.

    sudo apt-get update
    sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev git

Después de esta instalación inicial podemos instalar pyenv con este sencillo comando.

    curl https://pyenv.run | bash

En este punto, pyenv ya está instalado en su máquina, pero todavía tenemos que configurar bash. Para hacer esto vaya a su archivo '\~/.bashrc'.

    sudo nano ~/.bashrc

Y pegar el siguiente código al final del archivo

    export PATH="$HOME/.pyenv/bin:$PATH"
    eval "$(pyenv init -)"
    eval "$(pyenv virtualenv-init -)"

Los comandos de este archivo se ejecutan en el momento en que el usuario inicia un terminal de comandos. El punto al principio del nombre indica que se trata de un archivo oculto.

Ahora puedes abrir una nueva terminal para iniciar pyenv o en la terminal que hizo la instalación ejecutar el siguiente comando.

    exec "$SHELL

##### Usando Pyenv

Al igual que usamos en sdkman, vamos a empezar con el comando de ayuda.

    Ayuda de pyenv

![](/uploads/pyenvhelp.png)

Aquí podemos ver los comandos de Pyenv, en el día a día las principales funciones que utilizaremos serán 

* Enumerar las versiones disponibles para su descarga;
* Instalar una versión
* Mostrar las versiones instaladas
* Ejecutar una versión específica
* Desinstalar una versión;

Otro comando muy útil para usar en linux es 'man', trae un manual completo sobre lo que se puede hacer con Pyenv.

    man pyenv

También se puede utilizar para sacar un manual de otros comandos, pero eso es una conversación para otro día.

Volviendo a Pyenv para listar las versiones disponibles, utilizamos el comando

    pyenv install --list

Como podemos ver, hay varias versiones disponibles para su descarga. Todavía no he explorado este enorme catálogo. También es posible filtrar lo que se mostrará utilizando " | grep " combinado con regex.

    $ pyenv install --list | grep "3\.[8]"

Con el comando anterior, sólo se mostrarán las versiones "3.8" disponibles para su descarga.

![](/uploads/versoespyenv.png)

La instalación de una versión específica se realiza mediante el comando "_pyenv_ _install_", en el comando de abajo instalamos la versión 3.8-dev.

    $ pyenv install 3.8-dev

Después de instalar diferentes versiones en su máquina, es necesario conocer las versiones instaladas. Al fin y al cabo, difícilmente memorizaremos esta información. Para comprobar las versiones instaladas en la máquina, escriba:

    $ pyenv versions

La elección del intérprete que se utilizará en las aplicaciones se realiza mediante el comando "pyenv global" seguido de la versión. En el ejemplo siguiente elegiremos la versión 3.8-dev

    $ pyenv global 3.8-dev

Una vez definida la versión del intérprete, basta con ejecutar 'python helloWorld.py' y se ejecutará el archivo llamado helloWorld.py. Para comprobar la versión elegida escriba el comando

    $ python -V

Para desinstalar una versión, basta con encontrar una versión presente en la máquina y escribir el comando "_pyenv uninstall_" seguido de la versión elegida. Desinstalar 3.8-dev

    $ pyenv uninstall 3.8-dev

En esta guía de instalación hemos cubierto tres puntos relativos a Pyenv: descripción general y sus beneficios; comandos necesarios para la instalación; y las principales operaciones, todas aquellas necesarias para operar la herramienta en el día a día.

Hasta la próxima.

 