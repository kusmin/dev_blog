+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["javascript", "nvm"]
date = 2022-07-06T03:00:00Z
math = false
redirectUrl = ""
series = ["Version managers"]
tags = ["gerenciador de versão", "javascript", "node", "nvm"]
thumbnail = ""
title = "Version managers: NVM"

+++
The nvm(node version manager), is the version manager for node. If you already work with express, angular, react, vue and other of the millions of Javascript frameworks, at some point you had to use it and as we know there are several versions of node. So you had to install that specific version for that particular react component and then when you changed projects, you had to install another version. What a nightmare!

As we well know, managing several versions of something can be a pain.

With NVM we can see the Node versions, choose which ones we want to install or uninstall and define which one we want to use in each moment or project.

It works on MacOS and Linux. If you need to manage on Windows there is another project called **nvm-windows** which is also very good (recommended even by NPM, Google and Microsoft) and the commands are the same as for **NVM**.

##### Installation

We will see how to install NVM on Linux.

Note: It is recommended to uninstall any version of Node.js present in your machine before installing NVM to avoid collisions.

Let's follow the installation from github documentation at [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm "https://github.com/nvm-sh/nvm"), it's good to check there which is the latest version available at the time of this post the latest is 0.39.1.

To install NVM just use curl or Wget. Run in terminal:

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

Or

    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

This will run a script that will clone the NVM repository and drop it into a directory called `~/.nvm/` which is where we will install the various versions of Node.js we want.

In some cases you will need to update the shell. Run the command:

     source ~/.bashrc

To check that everything has been installed correctly and that nothing is the right version we can use the help command which we are already familiar with:

    nvm help

Nvm Help](/uploads/nvmhelp.png "Nvm Help")

We can see the version on the screen right at the beginning, with some commands and examples.

##### Using NVM

In some cases, you may need to close the terminal after installation and open another one or even reboot your machine to get the installation right.

###### List installed versions

 To see which versions are installed on your machine:

    nvm ls

![Installed versions](/uploads/versions-installed.png "Installed versions")

These are the versions I have installed on my machine today, if you have just installed nvm no version will appear. To do this we need to list the versions available for installation.

###### List versions available for installation

This command lists all the versions available for download and installation on your machine. This version number will be used in the command to perform the installation.

    $ nvm ls-remote

A list of all node versions will appear, in particular if it is a production project, use the stable versions (marked with LTS).

###### Installing a version

To install we use the `install` command followed by the version number we want (shown in the previous command, `ls-remote, remember I told you we were going to use it later `).

    nvm install <version-choose>

Just change the _version-chosen_ by the numbers of the version you want to download like `v.0.11.5` or `v.12.4.0`.

To install the latest version, use `node` in place of the version number:

    nvm install node

The first version you install will be used by default whenever you open the terminal. The default version can be changed later using the command:

    nvm default <chosen-version>

###### Current version

If you want to know which version you are currently using, run the command:

    nvm current

This will return the version used on the terminal you are using.

###### Uninstalling a version

The `uninstall` command is used to uninstall a version present on our machine. It is used in the same way as `install.`

    nvm uninstall <version-choose>

###### Define name for a version

To avoid having to keep calling a version by its number, we can define some sort of alias for each version. To do this we use the `alias` command and pass the name of the alias and the version we want to alias.

    $ nvm alias meername <chosen-version>

This is a very interesting feature to be able to more easily call a version for a specific project for example.

With this you can call the version <chosen-version> by `name meername`, as in:

    nvm use meername

###### Version definition per project

The intention of using NVM is to have a version of Node.js for each project, but it is very difficult to remember which version was used in each one.

To do this, just create a file named `.nvmrc` in the root of the project and put inside it the version number of Node.js that is being used in this project, like:

    v12.4.0

With this, when you open the terminal inside the project and run the `nvm use` command, NVM will automatically find the `.nvmrc` file and use the indicated version.

##### Conclusion

In this guide we have covered NVM, and once again highlighted the advantages of using a version manager for working on various versions and projects. Using version managers is a practice that will save you time and save you from several unnecessary headaches. Until next time ! 