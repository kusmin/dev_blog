+++
aliases = []
author = "Renan Ribeiro Lage"
categories = []
date = 2022-07-11T03:00:00Z
math = false
redirectUrl = ""
series = ["Linux"]
tags = ["linux", "procesos"]
thumbnail = ""
title = "Linux: Gestión de procesos - Parte 2"

+++
En este post continuando con los comandos útiles para la gestión de Linux, aprenderemos a comprobar los procesos con el comando 'ps', enviar señales a los procesos con los comandos 'kill', 'killall' y 'pkill', los procesos en primer y segundo plano y cómo cambiar sus prioridades.

#### PS

El comando ps lista los procesos actuales en la terminal del usuario.

    ps

![ps](/uploads/ps.png "ps")

Como puedes ver en mi caso, sólo tenía ps y bash corriendo en mi terminal en ese momento, también devuelve el PID de estos procesos.

Podemos pasar algunos parámetros junto a _ps_ para obtener información más detallada. Ejecutando el comando:

    ps --help all

Trae una lista de parámetros que podemos utilizar, los más importantes son

* -u => Mostrar más información relacionada con el usuario.
* -x => Muestra los procesos que no se han iniciado directamente en su terminal.
* -a => Mostrar los procesos de todos los usuarios.

Si escribimos el comando

    ps aux

![ps aux](/uploads/ps-aux.png "ps aux")

Devuelve una lista de todos los procesos en detalle, es un comando muy útil para el día a día.

Es bastante común que junto con el comando ps aux, usemos grep para poder filtrar esta lista que es bastante larga. He aquí un ejemplo:

    ps aux | grep nginx

![ps nginx](/uploads/ps-nginx.png "ps nginx")

Con grep podemos ver sólo los procesos que nos interesan, en este caso, no devolvió los procesos de nginx que se están ejecutando en mi máquina.

#### Envío de señales a los procesos

##### matar

El comando kill se utiliza para enviar señales a los procesos, las señales pueden ser de los más variados tipos, para terminar, pausar, reanudar un proceso y otros, con el comando:

    kill -l

Devolverá una lista de señales que podemos enviar a los procesos.

![](/uploads/kill-list.png)

Un ejemplo de señal es cuando estamos empezando a teclear un comando o incluso cuando estamos ejecutando un comando y tecleamos Crtl + C, en este caso estamos enviando una señal, que es la señal de interrupción 2) SIGINT.

Otros dos ejemplos que tenemos de señales muy usadas es la 15 es SIGTERM que termina un proceso y la 9 SIGKILL que termina el proceso abruptamente. Lo más recomendable es ejecutar siempre primero el 15 que enviará al proceso para que termine y el proceso termine lo que está haciendo en ese momento y luego termine. El 9 terminará el proceso independientemente de cualquier cosa, lo que puede llevar a problemas si el proceso está haciendo algo importante como un commit en la base de datos, en caso de que si hubiera usado el 15 hubiera terminado el commit y sólo después terminara el proceso.

Hay dos maneras de enviar las señales a los procesos:

1. kill -s SIGTERM "PID-PROCESS"
2. kill -15 "PID-PROCESO"

Se puede enviar por el nombre de la señal o por su número seguido del nombre del proceso.

Por defecto el kill es 15 SIGTERM, si quieres enviar esta señal al proceso puedes escribirla de forma corta:

    kill "NOMBRE-PROCESO"

##### killall y pkill

killall mata el proceso basado en el nombre exacto del proceso y pkill es una forma de grep que matará todos los procesos encontrados con esa regex.

    killall "NOMBRE DEL PROCESO"
    
    pkill "REGEX-PROCESOS"


#### Foreground(fg) e Background(bg)

El primer plano es el proceso que aparece ejecutándose en su terminal en ese momento, "bloqueando" su terminal a él. Por otro lado, el fondo es el proceso que ocurre detrás, sin que tú lo "veas", en este caso libera el terminal para ti.

Un ejemplo de proceso en primer plano es cuando utilizamos el comando

     tail -f "nombre-archivo"

donde esperamos nuevas escrituras en el archivo, esto es muy útil para seguir los registros. Otro ejemplo de primer plano, crearé un proceso for que se atascará:

    for i in `seq 1000` ; do sleep 2 ; echo $i ; done

El comando ejecuta un for de 0 a 1000, imprimiendo los valores cada 2 segundos, si lo ejecutas en tu máquina, verás que no puedes ejecutar más comandos, el proceso ha 'atascado' tu terminal. El comando está en primer plano.

Podemos ejecutar el mismo comando en backgound, usando el mismo comando añadiremos un '&' al final. Compruébalo:

    for i in `seq 1000` ; do sleep 2 ; echo $i ; done &

Ahora está ejecutando el proceso en segundo plano y puedes ejecutar otros comandos en la terminal mientras se ejecuta en segundo plano. Cuando escribo jobs me muestra todos los procesos que se están ejecutando en segundo plano en la terminal.

    puestos de trabajo

jobs](/uploads/jobs.png "jobs")

Devuelve el número de trabajos, su estado y el comando que están ejecutando. Si quieres pasar el proceso a primer plano escribe fg seguido del número de trabajo, en este caso 1.

    fg 1

El proceso está ahora en primer plano. Si tecleas Ctrl + Z se pausará el proceso y se pondrá de nuevo en segundo plano. Para ponerlo en marcha de nuevo en backgound, basta con escribir el comando bg seguido del número de trabajo.

    bg 1

Si quieres matar el trabajo, tenemos el comando kill. El comando kill seguido de % y el número de trabajo.

    matar %1

Ahora, para terminar, hablemos de prioridades.

#### Prioridades

Las prioridades en Linux que van de 0 a 39, en general cuando Linux crea un nuevo proceso este ya 'nace' con prioridad 20 es la predeterminada del sistema. Cuanto más bajo sea el valor de prioridad del proceso, menor será su prioridad. En este caso el proceso con 0 es el de mayor prioridad y los de 39.

Podemos establecer o cambiar el valor de la prioridad con nice, que va de -20 a 19, si establecemos nice como -20, el proceso tendrá prioridad 0, si lo establecemos como 19 tendrá prioridad 39.

Al ejecutar el comando top, podemos ver los valores de prioridad y nice de los procesos.

    top

![prioridades](/cargas/prioridades.png "prioridades")

La columna 3, "PR", muestra los valores de prioridad y la columna c 4, "NI", representa el valor agradable. Como se ha dicho antes el proceso nace con prioridad 20 y bonito 0.

Para establecer la prioridad manualmente podemos utilizar el comando nice seguido de -n, el valor de nice, seguido del comando. Por ejemplo, ejecutamos el comando superior con prioridad 0.

    nice -n -20 top

O con una prioridad mínima.

    nice -n 19 top

Nice sólo puede utilizarse al crear un proceso. Para cambiar el proceso después de que se haya creado tenemos renice. Se ejecuta mediante renice -n número agradable, seguido del nombre del proceso.

    renice -n 'NUMERO_RENICE' 'NUMERO_PID'

Un detalle que los usuarios comunes sólo pueden utilizar renice con valores positivos. Para los valores negativos debe ser la raíz.

#### Conclusión

En este post hemos cubierto los principales comandos para la gestión de Linux, vimos el proceso ps, kill, foreground, background y cómo establecer la prioridad con nice y renice.

Espero que con este post puedas dar un paso más en el uso de Linux. Hasta la próxima.