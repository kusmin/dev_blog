+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Gestión Linux", "Linux"]
date = 2022-07-21T03:00:00Z
math = false
redirectUrl = ""
series = ["Linux"]
tags = ["linux", "gerenciamentolinux"]
thumbnail = ""
title = "Linux: Permisos de archivos y directorios"

+++
Continuando con nuestra serie sobre Linux, hoy veremos cómo gestionar los permisos de archivos y directorios. Definiendo los permisos de acceso de lectura, escritura y ejecución para grupos y usuarios, veremos los comandos:

* CHMOD;
* CHOW;
* Permisos especiales y UMASK.

#### Definir los permisos

Primero veamos las estadísticas de cualquier archivo. Ejecuta los comandos:

    touch file && stat file

Primero creamos un archivo con el comando touch y luego vemos el estado del archivo con el comando stat.

![archivo de estado](/uploads/stat_file.png "archivo de estado")

Como puede ver en la impresión, se devuelve mucha información útil como la ruta relativa del archivo, el tamaño del archivo en memoria, el INODE que es el identificador único del archivo dentro de Linux, etc.

La parte que nos interesa en este momento es la línea "Acceso", allí encontramos los permisos tanto en forma octal (0644) como en forma escrita (-rw-rw-r-r--). Hay dos formas de describir los permisos y tienen los mismos valores.

* El carácter "0" es un símbolo especial que veremos más adelante y el primer "-" representa el tipo de archivo.
* El carácter "6" y los 3 primeros dígitos de la forma escrita (rw-) representan los permisos del usuario propietario del archivo.
* El carácter "6" y los 3 dígitos centrales de la forma escrita (rw-), representan los permisos del grupo propietario del archivo.
* El carácter "4" y los 3 dígitos centrales de la forma escrita (r--), representan los permisos de los demás.
* Uid devuelve el identificador del propietario del usuario más el nombre del propietario.
* El Gid devuelve el identificador del grupo propietario más el nombre de ese grupo.

Hay otras formas de ver la información de los permisos, las más utilizadas son los comandos "ll" o "ls -l". Ejemplo:

    ls -l

ls -l comando](/uploads/ls-l.png "ls -l comando")

Cada símbolo en esto representa una acción que puede ser realizada por el usuario en el archivo, vamos a empezar por ver el por escribir:

* La "r" simboliza "lectura", permiso para leer el archivo o listar archivos en el directorio.
* La "w" representa la "escritura", permiso para escribir y alterar el archivo o crear y eliminar en el directorio.
* La "x" significa "ejecutar", permiso para ejecutar el archivo o acceder al directorio.

Para añadir un permiso al archivo para todos los usuarios, podemos ejecutar el comando "chmod +"permission". Por ejemplo.

     chmod +x archivo

Con este comando añadimos el permiso de ejecución para todos los usuarios. Como puedes ver en la imagen de abajo.

 ![chmod x](/uploads/chmod-x.png "chmod x")

El chmod es el comando que utilizamos para cambiar el permiso, eliminar el permiso o restablecer la configuración. Se pueden pasar parámetros:

* u => Usuario.
* g => Grupo.
* o => Otros.
* a => Todos.

Si no se pasa ningún parámetro, el valor por defecto es "a" para todos. Además, "+" sirve para añadir permisos, "-" para eliminarlos y "=" para establecerlos. Ejemplos:

    chmod u=rwx,g=r,o=r archivo

Definimos que el usuario tiene permisos de lectura, escritura y ejecución para el archivo, y el grupo y otros son de sólo lectura.

    chmod a-r

Quitamos el permiso de lectura para todos.

    chmod u+r

Añadimos permiso de lectura para el usuario.

Siempre puedes confirmar estos cambios con los comandos "stat" y "ls -l". 

También podemos cambiar la forma octal, que como hemos dicho antes representa lo mismo sólo en forma numérica, si ejecutamos

     archivo de estadísticas

![ocotal](/uploads/ocotal.png "ocotal")

El valor 775 representa los permisos en forma octal, que tiene la misma correspondencia en forma escrita:

* La "r" tiene un valor de 4.
* La "w" tiene un valor de 2.
* La "x" tiene un valor de 1.

Por la suma podemos saber el permiso, el 7 representa la suma de los 3 permisos, 4 +2 + 1 = 7, ya el 5 representa la suma de 4 + 1 o permiso de lectura y ejecución. Aquí también podemos utilizar el comando chmod en forma octal

    chmod 777 archivo

He establecido un permiso total para todos.

    chmod 400 archivo

Pongo permiso de lectura para el usuario y ninguno para el grupo o los demás.

Chmod también tiene el parámetro -R que establece los permisos de forma recursiva a todos los archivos del directorio.

#### Cambio de propietarios de archivos

El usuario y el grupo al que pertenecen los archivos y directorios se pueden cambiar con el comando chown:

* chown usuario "archivo o directorio".
* chown usuario:grupo "archivo o directorio".
* chown usuario:grupo "archivo o directorio".
* chgrp grupo "archivo o directorio".

Podemos pasar el parámetro -R para cambiar recursivamente.

Ejemplos:

    chown archivo raíz

 He cambiado el usuario del archivo a root.

    chown root:file root

He cambiado el usuario y el grupo del archivo a root.

    chown :root archivo

He cambiado el grupo de archivo a root.

    chown -R root:root dir

He cambiado todos los archivos del directorio dir para que el usuario y el grupo sean root.

#### Conclusión

En este post hemos aprendido cómo gestionar y cómo funcionan los permisos de archivos y directorios en Linux, principalmente utilizando los comandos chmod y chown. Hasta la próxima.