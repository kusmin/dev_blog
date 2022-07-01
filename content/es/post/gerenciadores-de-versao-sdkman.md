+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["sdk", "sdkman", "java", "gerenciadores de versão", "programação"]
date = 2022-07-01T03:00:00Z
math = false
redirectUrl = ""
series = ["Administradores de versiones"]
tags = ["jvm", "opensource", "jdk", "java", "sdkman", "versionamento"]
thumbnail = "/uploads/images.png"
title = "Administradores de versiones: Sdkman"

+++
Hoy vamos a comenzar nuestra primera serie aquí en el sitio, que será sobre los administradores de versiones de idiomas. Si llevas tiempo programando, seguro que has pasado por la pequeña pesadilla que es tener instalada en tu máquina una versión de tu jdk o de tu intérprete de python, por ejemplo, y al ejecutar algún otro programa descubrí que tu versión es incompatible con el programa. Luego, debe desinstalar su versión, instalar la nueva, cambiar a menudo las variables de entorno, etc. ¿Qué sucede si necesita la versión anterior? Hazlo todo de nuevo....

Afortunadamente, hoy en día casi todos los idiomas tienen alguna herramienta de control de versiones que hace todo este proceso por usted y le permite tener varias versiones instaladas en su máquina y cambiar fácilmente entre ellas.

Y para comenzar esta serie, hablemos de SDKMAN, que es el administrador mundial de Java.

## SDKMAN

Accediendo a la web oficial [https://sdkman.io/](https://sdkman.io/ "https://sdkman.io/"), podemos ver una breve introducción en la que se describen a sí mismos como un desarrollador de software. administrador de equipos ¡Ahora a la instalación!

##### Instalación

En la página de Sdkman en el menú superior, verá una opción llamada instalar [https://sdkman.io/install](https://sdkman.io/install "https://sdkman.io/install"), ingresando la página tendrá instrucciones sobre cómo instalar dependiendo de su sistema operativo, ya que Sdkman es multiplataforma y se puede instalar en los más diversos sistemas operativos. En este ejemplo lo instalaremos en Linux.

Siguiendo los comandos se pueden describir:

    $ curl -s "https://get.sdkman.io" | bash

Con este comando, sdkman ya está instalado en su máquina, ahora debemos configurar una variable de entorno para Linux, con la ubicación del archivo de script sdkman.

    $ source "$HOME/.sdkman/bin/sdkman-init.sh"

Ahora solo revisa la versión.

    $ sdk version

![](/uploads/sdkversion.png)

Tal vez tu versión sea diferente a la de este tutorial, no hay problema, se actualizan de vez en cuando.

##### Usando  Sdkman


Ahora con Sdkman instalado, comencemos a usarlo. Un comando útil en Linux es ayuda, lo usaremos aquí.

    sdk help

![](/uploads/sdkhelp.png)

En esta pantalla podemos ver los comandos principales de sdkman y cómo usarlos, por ejemplo, queremos ver una lista de todas las versiones de Java disponibles...

    sdk list java

Aparecerá una lista de versiones de Java disponibles para la instalación.

![](/uploads/listjava.png)

Al hacer clic en la flecha hacia abajo o desplazar el mouse, puede ver más versiones, para salir de la pantalla, haga clic en 'q'.

Ahora elijamos una versión i e instálela en nuestra máquina.

    sdk install java 17.0.3-zulu

Y listo empezará a instalar esta versión de java. Podemos configurar esta versión como predeterminada escribiendo 'y' después de la instalación o no.

![](/uploads/sdkinstall.png)

Si lo prefiere, puede cambiar la versión predeterminada más tarde usando el comando.

    sdk default java 17.0.3-zulu

Si necesitas usar alguna otra versión (que ya hayas instalado por el sdk) también es muy simple.

Por ejemplo:

    sdk use java 18.0.1-zulu

Definirá esta versión de Java para la terminal que está escribiendo para que pueda usarla sin esa complicación debido a la versión. Recordando que esta versión solo estará disponible en el terminal que estés utilizando, si abres uno nuevo, aparecerá con la versión por defecto.

Sdkman es una herramienta muy simple que te ayudará a lidiar mejor con las diferentes versiones del mundo Jdk, ¡en la próxima publicación veremos sobre pyenv! Hasta la próxima !