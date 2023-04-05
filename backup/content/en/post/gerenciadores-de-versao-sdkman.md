+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["sdk", "sdkman", "java", "gerenciadores de versão", "programação"]
date = 2022-07-01T03:00:00Z
math = false
redirectUrl = ""
series = ["Version managers"]
tags = ["jvm", "opensource", "jdk", "java", "sdkman", "versionamento"]
thumbnail = "/uploads/images.png"
title = "Version managers: Sdkman"

+++
Today we are going to start our first series here on the site, which will be about language version managers. If you've been programming for some time, you must have gone through the little nightmare that is having a version of your jdk or your python interpreter installed on your machine, for example, and when running some other program I discovered that your version is incompatible with the program. Then you need to uninstall your version, install the new one, often change the environment variables and so on. What if you need the old version? Do it all over again....

Fortunately, nowadays almost every language has some version control tool that does this whole process for you and allows you to have several versions installed on your machine, and easily switch between them.

And to start this series let's talk about SDKMAN, which is the Java world manager.

## SDKMAN

Accessing the official website [https://sdkman.io/](https://sdkman.io/ "https://sdkman.io/"), we can see a brief introduction in which they describe themselves as a software development kit manager. Now on to the installation!

##### Installation

On the Sdkman page in the top menu you will see an option called install [https://sdkman.io/install](https://sdkman.io/install "https://sdkman.io/install"), entering the page you will have instructions on how to install depending on your operating system, as Sdkman is cross-platform and can be installed on the most diverse operating systems. In this example we will install it on Linux.

Following the commands can themselves described:

    $ curl -s "https://get.sdkman.io" | bash

With this command, sdkman is already installed on your machine, now we need to set an environment variable for Linux, with the location of the sdkman script file

    $ source "$HOME/.sdkman/bin/sdkman-init.sh"

Now just check the version.

    $ sdk version

![](/uploads/sdkversion.png)

Maybe your version is different from this tutorial, no problem, they update from time to time.

##### Using o Sdkman

Now with Sdkman installed, let's start using it. A useful command in Linux is help, we will use it here.

    sdk help

![](/uploads/sdkhelp.png)

On this screen we can see the main commands of sdkman, and how to use them, for example, we want to see a list of all available Java versions...

    sdk list java

A list of java versions available for installation will appear.

![](/uploads/listjava.png)

Clicking the down arrow or scrolling the mouse you can see more versions, to exit the screen click 'q'.

Now let's choose a version i and install it on our machine.

    sdk install java 17.0.3-zulu

And ready it will start installing this version of java. We can set this version as default by typing 'y' after installation or not.

![](/uploads/sdkinstall.png)

If you prefer you can change the default version later using the command.

    sdk default java 17.0.3-zulu

If you need to use some other version (that you have already installed by the sdk) it is very simple too.

For example:

    sdk use java 18.0.1-zulu

It will define this version of java for the terminal you are typing so that you can use it without that complication because of version. Remembering that this version will only be available in the terminal you are using, if you open a new one, it will appear with the default version.

Sdkman is a very simple tool that will help you to better deal with the different versions of the Jdk world, in the next post we will see about pyenv! To the next !