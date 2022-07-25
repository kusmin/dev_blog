+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Linux"]
date = 2022-07-14T03:00:00Z
math = false
redirectUrl = ""
series = ["Linux"]
tags = ["gestion", "shell", "linux"]
thumbnail = ""
title = "Linux: Gestión de usuarios"

+++
Gestionar usuarios en Linux, no es tan intuitivo como lo tenemos en Windows donde se puede hacer casi todo de forma gráfica y transparente. En Linux tenemos que usar la terminal y sorprendentemente con unos pocos comandos puedes gestionar usuarios y grupos de usuarios de una manera práctica y potente.

En este post aprenderemos a crear un usuario, eliminar un usuario y cambiar un usuario.

#### Gestión de usuarios

Los usuarios se almacenan en el archivo /etc/passwd. Ejecutando el comando cat podemos echar un vistazo a este archivo.

    cat /etc/passwd

![usuarios del sistema](/uploads/usuariodosistema.png "usuarios del sistema")

Probablemente en su sistema, también tendrá varios usuarios, esto sucede que los usuarios no son sólo los que usted ingresa al sistema o crea para una persona, sino también los usuarios utilizados por programas nativos del sistema operativo o que fueron instalados posteriormente.

Este archivo parece lleno de letras y complicado, vamos a entender lo que hace cada cosa.

En primer lugar, cada línea representa un usuario. En cada línea tenemos información separada por ':', lo que tenemos ahí son siete tipos de información, ahora vamos a entender cada uno de ellos, tomando ahí por ejemplo el usuario 'renan' que fue creado cuando puse Linux en mi máquina.

> renan:x:1000:1000:renan,,,:/home/renan:/bin/bash

Estos siete campos pueden explicarse mejor de esta manera:

> Nombre:Contraseña:UID:GID:Descripción:Inicio:Shell

1. El primer campo representa el nombre del usuario, en este caso 'renan'.
2. El segundo campo, marcado con una "x", representa la contraseña que solía estar en este espacio, pero que en los sistemas modernos se almacena ahora en /etc/shadow.

       sudo cat /etc/shadow

   Verás las contraseñas que están encriptadas.
3. El tercer campo representa el UID que es un identificador único para el usuario dentro del sistema.
4. El cuarto campo representa el GID que es el identificador del grupo al que pertenece ese usuario.
5. En el quinto campo tenemos una descripción para ese usuario.
6. En el sexto campo tenemos la ubicación (directorio) donde se encuentra ese usuario.
7. Y por último tenemos el campo que muestra el shell donde está el script de ese usuario.

##### Crear usuarios

Crear un usuario dentro del sistema es muy sencillo. Basta con ejecutar el comando usearadd "nombre de usuario".

    prueba useradd

Si volvemos al archivo passwd, podemos ver el usuario creado al final del archivo.

    cat /etc/passwd

![usuario creado](/uploads/criadousuario.png "usuario creado")

Se ha creado con los valores por defecto, con el UID único, un nuevo grupo, sin comentarios y en la ruta de usuario y script por defecto. Podemos establecer las opciones con los parámetros:

* -s => Define el script relacionado con ese usuario, la ruta del script.
* -c => Permite definir un comentario para el usuario, la parte de descripción del usuario del archivo etc/passwd
* -m => Solicitar la creación de la vivienda. Nota: La mayoría de las distribuciones crean el hogar automáticamente.
* -d => Definir el nombre de la carpeta de inicio.
=> El grupo primario.
* -G => El grupo secundario.

Un ejemplo sería:

    useradd test2 -s bin/sh -g test -c test2

Comprobando el archivo etc/passwd.

    cat /etc/passwd

Crear prueba de usuario](/uploads/criarusuarioteste.png "Crear prueba de usuario")

Puede observar que el usuario teste2 pertenece al mismo grupo que el usuario teste. Además se ha añadido el comentario, que ponemos y la ruta del shell.

Para cambiar la contraseña de un usuario podemos ejecutar el comando, passwd "nombre-usuario".

    prueba de passwd 

Recordando que para cambiarlo tendrá que ser con 'sudo' (root) o estar logueado con el usuario.

##### Eliminar usuarios

Para eliminar usuarios tenemos el comando: userdell "nombre-usuario".

    userdel test2

Si consultamos de nuevo el archivo etc/passwd el usuario ha sido eliminado. Sin embargo, si comprobamos la carpeta /home la carpeta de usuario sigue existiendo, para eliminarla necesitamos pasar el parámetro -r.

    userdel -r test

Ahora tanto el usuario como la carpeta han sido eliminados.

##### Modificar usuarios

Tenemos los mismos parámetros que se pueden utilizar al crear un usuario. El comando es: usermod "options" "username".

    usermod -c prueba prueba

En el ejemplo añadimos un comentario de prueba a la prueba de usuario.

#### Dirección del grupo

Como vimos en la primera parte, los usuarios pertenecen a grupos, primarios y también pueden tener un grupo secundario. Ahora aprenderemos a gestionar los grupos, que al igual que los usuarios tienen un archivo con información que es el 'grupo'.

    cat /etc/group

![grupo](/cargas/grupo.png "grupo")

Cada línea representa un grupo y cada grupo está separado en cuatro campos:

> Grupo:Contraseña:ID:Usuarios

El campo de la contraseña, como en el caso de los usuarios, se encuentra en otro archivo en /etc/gshadow

    cat /etc/gshadow

Aquí también se encriptan las contraseñas.

El funcionamiento de los comandos aquí son muy similares a los del usuario, por lo que voy a dejar la prueba para usted, pasando sólo los comandos a utilizar.

###### Crear grupo

Para crear el grupo tenemos el comando: groupadd "group-name

     prueba de groupadd

###### Cambiar el grupo de usuarios principal

Para cambiar el grupo primario de un usuario tenemos el comando: usermod -g "grupo" "usuario".

    usermod -g test2 test

###### Cambiar el grupo secundario del usuario

Bastante similar al comando anterior: usermod -G "grupo" "usuario".

    usermod -G test2 test

###### Añadir un usuario a un grupo

Para añadir un usuario a un grupo tenemos el comando: usermod -a -G "grupo" "usuario".

    usermod -G test2 test

Aquí debemos pasar el parámetro -a para añadir, de lo contrario simplemente cambiará el grupo secundario.

Nota: Un usuario puede tener un solo grupo principal y varios grupos secundarios.

###### Mostrar el UID y todos los GID del usuario

Podemos ver todos los grupos y el UID de un usuario con el comando: id "usuario

    prueba de identidad

###### Mostrar los grupos del usuario 

Para mostrar los grupos de un usuario tenemos el comando: grupos "usuario"

    prueba de grupo

###### Getent

Para terminar podemos utilizar el comando getent para consultar los archivos /etc/passwd y /etc/group:

1. getent passwd
2. grupo getent

#### Conclusión

Podemos aprender cómo es más fácil y práctico de lo que parece la gestión de usuarios y grupos dentro de Linux.