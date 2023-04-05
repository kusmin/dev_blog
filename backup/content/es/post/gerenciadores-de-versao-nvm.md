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
El nvm(node version manager), es el gestor de versiones para el nodo. Si ya trabajas con express, angular, react, vue y millones de otros frameworks de JavaScript, en algún momento tuviste que usarlo y como sabemos hay varias versiones de node. Así que tenías que instalar esa versión específica para ese componente particular de Reactor y luego, cuando cambiabas de proyecto, tenías que instalar otra versión. ¡Qué pesadilla!

Como sabemos, gestionar varias versiones de algo puede ser aburrido.

Con NVM podemos ver las versiones de Node, elegir cuáles queremos instalar o desinstalar y definir cuál queremos usar en cada momento o proyecto.

Funciona en MacOS y Linux. Si necesitas gestionar en Windows hay otro proyecto llamado **nvm-windows** que también es muy bueno (recomendado incluso por NPM, Google y Microsoft) y los comandos son los mismos del **NVM**.

##### Instalación

Vamos a ver cómo instalar NVM en Linux.

Nota: Se recomienda desinstalar cualquier versión de Node.js presente en su máquina antes de instalar NVM para evitar colisiones.

Sigamos la instalación de la documentación de github en [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm "https://github.com/nvm-sh/nvm"), es bueno comprobar allí cual es la última versión disponible en el momento de este post la última es 0.39.1.

Para instalar NVM sólo tienes que usar curl o Wget. Ejecutar en la terminal:

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

O

    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

Esto ejecutará un script que clonará el repositorio NVM y lo dejará en un directorio llamado `~/.nvm/`, que es donde instalaremos las distintas versiones de Node.js que queramos.

En algunos casos tendrás que actualizar el shell. Ejecuta el comando:

     fuente ~/.bashrc

Para comprobar si todo se ha instalado bien y nada de la versión es correcta podemos utilizar el comando help con el que ya estamos familiarizados:

    nvm ayuda

Ayuda Nvm](/uploads/nvmhelp.png "Ayuda Nvm")

Podemos ver la versión en la pantalla justo al principio, con algunos comandos y ejemplos.

##### Usando NVM

En algunos casos, es posible que tenga que cerrar el terminal después de la instalación y abrir otro o incluso reiniciar su máquina para conseguir la instalación correcta.

###### Lista de versiones instaladas

 Para ver las versiones que están instaladas en su máquina:

    nvm ls

Versiones instaladas](/uploads/versiones-instaladas.png "Versiones instaladas")

Estas son las versiones que tengo instaladas en mi máquina hoy, si acabas de instalar nvm no aparecerá ninguna versión. Para ello, necesitamos una lista de las versiones disponibles para la instalación.

###### Lista de versiones disponibles para su instalación

Este comando muestra todas las versiones disponibles para su descarga e instalación en su máquina. Este número de versión se utilizará en el comando para realizar la instalación.

    $ nvm ls-remote

Aparecerá una lista de todas las versiones de los nodos, en particular si se trata de un proyecto de producción, utilice las versiones estables (marcadas con LTS).

###### Instalación de una versión

Para instalar usamos el comando `install` seguido del número de versión que queramos (que se muestra en el comando anterior, `ls-remote, recuerda que te dije que lo íbamos a usar después`).

    nvm install <versión-elegida>

Sólo tienes que cambiar el _version-choice_ por los números de la versión que quieres descargar como `v.0.11.5` o `v.12.4.0`.

Para instalar la última versión, utilice "nodo" en lugar del número de versión:

    nvm install node

La primera versión que instales se utilizará por defecto cada vez que abras el terminal. La versión por defecto se puede cambiar más tarde con el comando

    nvm default <versión elegida>

###### Versión actual

Si quiere saber qué versión está utilizando actualmente, ejecute el comando

    nvm actual

Devolverá la versión utilizada en el terminal que está utilizando.

###### Desinstalar una versión

El comando `uninstall` se utiliza para desinstalar una versión presente en nuestra máquina. Se utiliza de la misma manera que `install.`.

    nvm uninstall <versión-elegida>

###### Establecer el nombre de una versión

Para evitar tener que seguir llamando a una versión por su número, podemos definir algún tipo de alias para cada versión. Para ello utilizamos el comando `alias` y le pasamos el nombre del alias y la versión que queremos aliasar.

    $ nvm alias nombre-me <versión-elegida>

Esta es una buena característica para poder llamar más fácilmente a una versión para un proyecto específico, por ejemplo.

Con esto se puede llamar a la versión <elegida> por `nombre de usuario`, como en:

    nvm usar nombre de usuario


###### Definición de la versión por proyecto

La intención de usar NVM es tener una versión de Node.js para cada proyecto, pero es muy difícil recordar qué versión se usó en cada uno.

Para ello, basta con crear un archivo llamado `.nvmrc` en la raíz del proyecto y poner dentro de él el número de versión de Node.js que se está utilizando en ese proyecto, como:

    v12.4.0

Con esto, cuando abra el terminal dentro del proyecto y ejecute el comando `nvm use`, NVM encontrará automáticamente el archivo `.nvmrc` y utilizará la versión indicada.

##### Conclusión

En esta guía hemos cubierto NVM, y una vez más hemos destacado las ventajas de utilizar un gestor de versiones para trabajar en varias versiones y proyectos. El uso de gestores de versiones es una práctica que le ahorrará tiempo y le evitará varios dolores de cabeza innecesarios. Hasta la próxima vez. 