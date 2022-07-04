+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["servidor", "zoho", "email"]
date = 2022-07-03T03:00:00Z
math = false
redirectUrl = ""
series = []
tags = ["email", "zoho"]
thumbnail = "/uploads/zoho.jpeg"
title = "Gestor de correo electrónico: Zoho"

+++
A menudo querrás tener tu propio servicio de correo electrónico para tu negocio o uso personal, hay varias alternativas de pago y sencillas de implementar, quizás la más conocida sea Gmail. Hoy veremos una alternativa gratuita y fácil de implementar que es Zoho.

##### ¿Qué es Zoho?

Zoho es un completo CRM para tu negocio que hasta una determinada cantidad de uso es gratuito [https://www.zoho.com](https://www.zoho.com "https://www.zoho.com/pt-br/"). Dispone de muchas herramientas administrativas que le ayudarán a organizar el día a día de su empresa. En este artículo veremos cómo configurar los DNS para el acceso al correo electrónico de Zoho. Como requisito previo, necesitará un nombre de dominio.

##### Configuración

Después de entrar en la página web [https://www.zoho.com/](https://www.zoho.com/ "https://www.zoho.com/"), haga clic en el registro gratuito, regístrese gratuitamente de la manera que prefiera, después del registro, caerá en esta página.![](/uploads/zoho.png)

Haga clic en la opción de correo, en la siguiente pantalla si ya tiene el dominio, elija la primera opción y haga clic en continuar.

(/uploads/dominio-zoho.png)

En la opción de alojamiento, desplázate hacia abajo y elige la opción gratuita.

![](/uploads/zohoplanofree.png)

En la siguiente pantalla, elija la opción "Añadir un dominio existente". Rellene los datos de su dominio y organización. Una vez completado, el formulario pasará a la pantalla de verificación del dominio.

![](/uploads/configurandodominio.png)

Tal y como se ha solicitado, hemos añadido en nuestro gestor de dominios el registro solicitado.

![](/uploads/txtverificacao.png)

Ahora hay que esperar a que se propaguen los registros, esto dependerá de su gestor de dominios. 

Nota: Además de TXT hay otras formas de verificación, como CNAME.

En la siguiente página elija su correo electrónico que será el de administrador y haga clic en crear. 

Añade nuevos usuarios, recordando los límites del plan gratuito de 5 usuarios.

Crea grupos para separar a los usuarios, por sectores o de la forma que más te convenga, este paso, al igual que la creación de otros usuarios es opcional.

Ahora es la parte de la configuración del registro DNS.

![](/uploads/configuredns.png)

Si está utilizando la ruta53 de AWS, tendrá un aspecto similar al siguiente.

![](/uploads/mxconfigure.png)

Hay que recordar que el proceso de DNS puede llevar algún tiempo, dependiendo de la propagación.

Las dos últimas partes son la configuración final, en caso de que quiera migrar los correos electrónicos desde otro servidor y descargar las aplicaciones móviles de Zoho que son una gran forma de monitoreo.

¡Eso es! Dispones de un servicio de correo electrónico profesional y gratuito.