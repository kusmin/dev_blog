+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Linux"]
date = 2022-07-09T03:00:00Z
math = false
redirectUrl = ""
series = ["Linux"]
tags = ["procesos", "Linux"]
thumbnail = ""
title = "Linux: Gestión de procesos - Parte 1"

+++
En este post hoy hablaremos de algunos comandos útiles de gestión de procesos en Linux.

#### Introducción

Todos los procesos en linux tienen un identificador único llamado PID y tienen un proceso padre llamado PPID. El primer proceso que se ejecuta en el sistema y padre de todos los demás procesos es init, hoy es reemplazado por systemd con PID = 1.

Un comando que podemos utilizar para comprobar este árbol de procesos es pstree.

    pstree

Mostrará un árbol de comandos, en algunas distribuciones no viene instalado por defecto, en estos casos debes instalar _psmisc_.

Puedes ver que el systemd es el padre de todos ellos.

Si quiere ver el PID de los procesos, debe pasar el parámetro -p.

     pstree -p

Esto le mostrará el árbol de procesos de nuevo, pero ahora con el PID de cada proceso.

#### Seguimiento de los procesos

##### top

Ahora veamos el comando _top_, que es un proceso muy utilizado en el día, nos permite observar lo que se está ejecutando en tiempo real.

    top

![top](/uploads/top.png "comando top")

Mostrará y actualizará los procesos que se están ejecutando en el sistema. Una cosa muy importante que muestra es la _carga media,_ que es la carga media del sistema. El primer número muestra el último minuto, el segundo los últimos cinco minutos y el tercero los últimos quince minutos. Si el primero es más alto que los otros, la carga está subiendo, si es más bajo, está bajando con el tiempo.

Dentro del comando si escribes uno, te muestra las Cpu, y la carga en cada una de ellas.

Cpus](/uploads/cpus.png "Cpus")

El id dentro de la cpu muestra el uso en reposo de la cpu, si es alto está bien, pero si es alto, significa que uno está haciendo algún proceso pesado. La wa muestra la espera para escribir en el disco, si es baja está bien, pero si es alta está escribiendo en el disco. Un ejemplo es que si tienes un id bajo y un wa alto puede ser un cuello de botella para la escritura en disco.

Con la práctica aprenderás el significado de cada valor.

Dos comandos que es importante conocer para ordenar es el **_Schift + M_** que ordena por memoria, para que veas el proceso que está consumiendo más memoria. Y el **_Schift + C_** muestra el comando que está consumiendo más cpu.

Para salir de la parte superior sólo tienes que teclear 'q'.

##### libre

Otro comando importante para monitorizar la gestión del servidor es el free que muestra el consumo de memoria de la máquina.

    gratis

![free](/uploads/free.png "free")

En este caso se está mostrando en bytes para mostrar en megabytes, podemos pasar el parámetro -m.

    libre -m

![](/uploads/free-m.png)

Linux tiene una tendencia a utilizar toda la memoria que pueda para maximizar los procesos, muchas veces almacenándola en caché en el sistema de archivos, no se puede confiar sólo en la libre sino principalmente en la disponible.

##### tiempo de actividad

Es un comando que muestra el tiempo que la máquina está encendida y el promedio de carga.

![uptime](/uploads/uptime.png "uptime")

##### pidof pgrep

Los últimos comandos que veremos hoy son pidof y pgrep.

El pidof devuelve el pid del proceso por el nombre exacto por el proceso, en pgrep devuelve en base a una regex al igual que el grep normal que puede ser utilizado en otros comandos. Por ejemplo:

> pidof snap-store

![pidof](/uploads/pidof.png "pidof")

    pgrep snap

![](/uploads/pgrep.png)

Puede ver que pgrep devolvió más de un resultado encontrado para ese valor regex. 

#### Conclusión

Vimos algunos comandos muy útiles para que usted pueda administrar su servidor o sistema Linux en el día a día. Hasta la próxima vez.