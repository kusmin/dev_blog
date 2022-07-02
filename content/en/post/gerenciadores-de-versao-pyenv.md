+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["pyenv", "gerenciadores de versão", "python"]
date = 2022-07-02T03:00:00Z
math = false
redirectUrl = ""
series = ["Gerenciadores de versão"]
tags = ["pyenv", "versionamento", "python"]
thumbnail = ""
title = "Version managers: Pyenv"

+++
Continuing our series on version managers, today we're going to take on the Python world and talk about pyenv which is my favorite version manager for Python. It is based on rbenv which is a ruby version manager.

One of the advantages I see in pyenv to other Python version managers is that it does not depend on the language itself to work, it is made and loaded from shell scripts. It allows you to easily switch between versions, and use them as needed, which on Linux helps even more since Python is already installed by default. Link to pyenv repository [https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv "https://github.com/pyenv/pyenv")

##### Installation

For Linux you need to do some installation first.

    sudo apt-get update
    sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev git

After this initial installation we can install pyenv with this simple command.

    curl https://pyenv.run | bash

At this point pyenv is already installed on your machine but we still need to configure bash. To do this go into your '\~/.bashrc' file.

    sudo nano ~/.bashrc

And paste the following code at the end of the file

    export PATH="$HOME/.pyenv/bin:$PATH"
    eval "$(pyenv init -)"
    eval "$(pyenv virtualenv-init -)"

The commands in this file are executed the moment the user starts a command terminal. The dot at the beginning of the name indicates that it is a hidden file.

Now you can either open a new terminal to start pyenv or in the terminal that did the installation run the following command.

    exec "$SHELL

##### Using Pyenv

As with sdkman, let's start with the help command.

    pyenv help

![](/uploads/pyenvhelp.png)

Here we can see the Pyenv commands, on a day to day basis the main features we will use will be: 

* List the versions available for download;
* Install a version
* View the installed versions
* Run a specific version
* Uninstall a version;

Another very useful command to use on linux is 'man', it gives a complete manual about what can be done with Pyenv.

    man pyenv

It can also be used to bring up a manual for other commands, but that is a conversation for another day.

Back to Pyenv to list the available versions we use the command.

    pyenv install --list

As we can see, there are several versions available for download. I have not yet explored this huge catalog. You can also filter what is displayed by using " | grep " combined with regex.

    $ pyenv install --list | grep "3\.[8]"

With the above command, only the versions "3.8" available for download will be displayed.

![](/uploads/versoespyenv.png)

Installing a specific version is done using the command "_pyenv_ _install_", in the command below we install version 3.8-dev.

    $ pyenv install 3.8-dev

After installing different versions on your machine, it is necessary to know what versions you have installed. After all, we will hardly memorize this information. To check which versions you have installed on your machine, type

    $ pyenv versions

The choice of interpreter that will be used in the applications is made through the command "pyenv global" followed by the version. In the example below we will choose the 3.8-dev version

    $ pyenv global 3.8-dev

Once the interpreter version has been defined, just run 'python helloWorld.py' and the file named helloWorld.py will be executed. To check the chosen version type the command:

    $ python -V

To uninstall a version, simply find a version present on the machine and type the command "_pyenv uninstall_" followed by the chosen version. Uninstalling 3.8-dev

    $ pyenv uninstall 3.8-dev

In this installation guide we have covered three points regarding Pyenv: a general description and benefits, the commands needed for installation, and the main operations, all those needed to operate the tool on a daily basis.

See you next time!
