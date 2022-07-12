+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["ferramentas", "ruby", "versionamento"]
date = 2022-07-04T03:00:00Z
math = false
redirectUrl = ""
series = ["Version managers"]
tags = ["rvm", "gerenciadores de versão", "ruby"]
thumbnail = ""
title = "Version managers: RVM"

+++
Today in our series about version managers, we'll talk about one of the first managers that was RVM (Ruby Version Manager), which is a version manager for the ruby language, which became well known for its Ruby on Rails framework.

We will go through the same path we did in the other posts of the series showing how to configure and install it on Linux.

##### Installation

RVm it is a cross-platform manager and can be installed on most operating systems without much difficulty, as documented on their website [https://rvm.io/rvm/install](https://rvm.io/rvm/install "https://rvm.io/rvm/install").

To get started before installation first, we need the software-properties-common to install the PPA repositories:

    sudo apt-get install software-properties-common

Then let's add the rvm PPA and install it:

    sudo apt-add-repository -y ppa:rael-gc/rvm
    sudo apt-get update
    sudo apt-get install rvm

Then add your user to the rvm group:

     sudo usermod -a -G rvm $USER

Then add to your bashrc:

    echo 'source "/etc/profile.d/rvm.sh"' >> ~/.bashrc 

Check if everything was installed correctly

    rvm --version

![](/uploads/rvmversion.png)

That's it! Now let's check it out.

##### Using RVM

Let's start by using our old acquaintances the help and man commands. As you may already be familiar with, the help command gives basic but no less essential help and the man command is the complete manual for the command.

    rvm --help

![](/uploads/rvmhelp.png)

Not unlike the other managers we can see from the commands that it allows us to install, list and manage different versions of ruby. I'll leave the man command up to you to test it out.

To list the installed versions we have the command.

    rvm list

![](/uploads/rvmlisrruby.png)

As we don't have any version installed yet, we will not see any, so we will list the installation options with the command.

    rvm list known

![](/uploads/rvmlistrubytodas.png)

Now we have several installation options, let's install version 3.0.0 with the command.

    rvm install ruby-3.0.0

Sometimes a permission problem can appear, so a simple solution is to restart the shell, to clear the shell variables. You can either restart the computer or log off the user. 

Another problem that may occur is that you can't install it due to openssl, in this case you will need the command below, especially for newer versions of ruby.

    rvmsudo rvm pkg install openssl

If everything goes right in your run.

    rvm current

And you will see your summer installed in the terminal.

Today we can see one more version manager, this time for the ruby world. Next time we will see about nvm! 
