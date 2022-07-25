+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Management Linux", "Linux"]
date = 2022-07-21T03:00:00Z
math = false
redirectUrl = ""
series = ["Linux"]
tags = ["linux", "gerenciamentolinux"]
thumbnail = ""
title = "Linux: File and directory permissions"

+++
CContinuing our series on Linux, today we'll look at how to manage file and directory permissions. By defining read, write and execute access permissions for groups and users, we will look at the commands:

* CHMOD;
* CHOW;
* Special permissions and UMASK.

#### Setting permissions

First let's look at the stat of any given file. Run the commands:

    touch file && stat file

First we create a file with the touch command and then we view the file's status with the stat command.

![status file](/uploads/stat_file.png "status file")

As you can see from the printout a lot of useful information is returned, such as the relative path of the file, the size of the file in memory, the INODE which is the file's unique identifier within Linux, etc.

The part that interests us at this point is the "Access" line, there we find the permissions both in octal form (0644) and in written form (-rw-rw-r-r--). These are two ways of describing permissions and they have the same values.

* The "0" character is a special symbol that we will see later and the first "-" represents the file type.
* The character "6" and the first 3 digits of the written form (rw-) represent the permissions of the user who owns the file.
* The character "6" and the middle 3 digits of the written form (rw-) represent the permissions of the group that owns the file.
* The character "4" and the middle 3 digits of the written form (r--) represent the permissions of others.
* The Uid returns the identifier of the user owner plus the name of the user.
* The Gid returns the owner group identifier plus the owner group name.

There are other ways to view permission information, the most commonly used being the "ll" or "ls -l" commands. Example:

    ls -l

ls -l command](/uploads/ls-l.png "ls -l command")

Each symbol in this represents an action that can be performed by the user on the file, let's start by looking at writing:

* The "r" symbolizes "read", permission to read the file or list files in the directory.
* The "w" stands for "write", permission to write and alter the file or create and remove files in the directory.
* The "x" stands for "execute", permission to execute the file or access the directory.

To add a permission to the file for all users we can run the command "chmod +"permission". For example.

     chmod +x file

With this command we add the execution permission for all users. As you can see from the image below.

 ![chmod x](/uploads/chmod-x.png "chmod x")

Chmod is the command we use to change permission, remove permission or reset settings. Parameters can be passed:

* u => User.
* g => Group.
* o => Others.
* a => Everyone.

If no parameters are passed, the default is "a" for everyone. Additionally, "+" is for adding permissions, "-" is for removing them and "=" is for setting permissions. Examples:

    chmod u=rwx,g=r,o=r file

We define that the user has read, write and execute permission for the file, and the group and others are read-only.

    chmod a-r

We take away the read permission for everyone.

    chmod u+r

We add read permission for the user.

You can always confirm these changes with the commands "stat" and "ls -l". 

We can also change it to octal form, which as said before represents the same thing only in numeric form, if we run

     stat file

![ocotal](/uploads/ocotal.png "ocotal")

The value 775 represents the permissions in octal form, which has the same correspondence in written form:

* The "r" has a value of 4.
* The "w" has a value of 2.
* The "x" has a value of 1.

By the sum we can know the permission, 7 represents the sum of the 3 permissions, 4 +2 + 1 = 7, while 5 represents the sum of 4 + 1 or read and execute permission. Here we can also use the chmod command in octal form

    chmod 777 file

I set full permission for everyone.

    chmod 400 file

I set read permission for the user and none for the group or the others.

chmod also has the parameter -R that sets permissions recursively to all files in the directory.

#### Changing file owners

The user and group to which the files and directories belong can be changed by the chown command:

* chown user "file or directory".
* chown user:group "file or directory".
* chown :group "file or directory
* chgrp group "file or directory".

We can pass the -R parameter to change recursively.

Examples:

    chown root file

 I changed the user of the file to root.

    chown root:root file

I changed the user and group of the archive to root.

    chown :root file

I changed the archive group to root.

    chown -R root:root dir

I changed all files in the dir directory to have root as user and group.

#### Conclusion

In this post we have learned how to manage and how file and directory permissions work in Linux, mainly using the chmod and chown commands. See you next time!