+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Linux"]
date = 2022-07-14T03:00:00Z
math = false
redirectUrl = ""
series = ["Linux"]
tags = ["management", "shell", "linux"]
thumbnail = ""
title = "Linux: User Management"

+++
Managing users in Linux is not as intuitive as it is in Windows, where you can do almost everything graphically and transparently. In Linux we need to use the terminal and amazingly enough with a few commands you can manage users and user groups in a practical and powerful way.

In this post we will learn how to create a user, delete a user and change a user.

#### Managing Users

Users are stored in the file /etc/passwd. By running the cat command we can take a look at this file.

    cat /etc/passwd

![system users](/uploads/usuariodosistema.png "system users")

Probably on your system you will also have several users, this happens that users are not only the ones you log into the system or create for a person, but also users used by native programs of the operating system or that were installed later.

This file seems full of letters and complicated, so let's understand what each thing does.

First of all each line represents one user. In each line we have information separated by ':', what we have there are seven types of information, now let's understand each one of them, taking there for example the user 'renan' that was created when I put Linux on my machine.

> renan:x:1000:1000:renan,,,:/home/renan:/bin/bash

These seven fields can best be explained this way:

> Name:Password:UID:GID:Description:Home:Shell

1. The first field represents the user name, in this case 'renan'.
2. The second field which is marked with an 'x' represents the password which used to be in this space but on modern systems is now stored in /etc/shadow.

       sudo cat /etc/shadow

   You will see the passwords that are encrypted.
3. The third field represents the UID, which is a unique identifier for the user within the system.
4. The fourth field represents the GID which is the identifier of the group that user belongs to.
5. In the fifth field we have a description for that user.
6. In the sixth field we have the location (directory) where that user is.
7. And lastly we have the field that shows the shell that represents where the script for that user is.

##### Creating Users

To create a user within the system is very simple. Just execute the command usearadd "username".

    useradd test

If we go back in the passwd file, we can see the user created at the end of the file.

    cat /etc/passwd

![created user](/uploads/createdusername.png "created user")

It has been created with the default values, with the unique UID, a new group, no comments and in the default user and script path. We can set the options with the parameters:

* -s => Defines the script related to that user, the script path.
* -c => Allows defining a comment for the user, the user description part of the etc/passwd file
* -m => Request the creation of the home. Note: Most distributions create the home automatically.
* -d => Define the name of the home folder.
* -g => The primary group.
* -G => The secondary group.

An example would be:

    useradd test2 -s bin/sh -g test -c test2

Checking the etc/passwd file.

    cat /etc/passwd

Create user test](/uploads/criarusuarioteste.png "Create user test")

You can see that the user teste2 he belongs to the same group as the user teste. In addition the comment has been added, which we put and the shell path.

To change the password of a user we can run the command, passwd "name-user".

    passwd test 

Remember that to change it will have to be with 'sudo' (root) or be logged in with the user.

##### Remove users

To remove users we have the command: userdell "name-user".

    userdel test2

If you check the etc/passwd file again the user has been removed. However if we check the /home folder the user's folder still exists, to delete it we need to pass the -r parameter.

    userdel -r test

Now both the user and the folder have been removed.

##### Modify users

We have the same parameters that can be used when creating a user. The command is: usermod "options" "username".

    usermod -c test test

In the example we have added a test comment to the user test.

#### Group Management

As we saw in the first part, users belong to groups, primary and can also have a secondary group. Now we will learn how to manage the groups, which just like the users have a file with information, which is the 'group'.

    cat /etc/group

![group](/uploads/group.png "group")

Each line represents a group and each group is separated into four fields:

> Group:Password:ID:Users

The password field just like for users is in another file in /etc/gshadow

    cat /etc/gshadow

Here also the passwords for the password are encrypted.

The operation of the commands here are very similar to those of the user, so I will leave the test to you, passing only the commands to be used.

###### Create group

To create the group we have the command: groupadd "group-name

     groupadd test

###### Change primary user group

To change the primary group of a user we have the command: usermod -g "group" "user".

    usermod -g test2 test

###### Change the user's secondary group

Much like the previous command: usermod -G "group" "user".

    usermod -G test2 test

###### Add user to a group

To add user to a group we have the command: usermod -a -G "group" "user".

    usermod -G test2 test

Here we must pass the parameter -a to add, otherwise it will simply change the secondary group.

Note: A user can have only one main group and several secondary groups.

###### Show the UID and all GID of the user

We can see all groups and the UID of a user with the command: id "user

    id test

###### Show groups of the user 

To show the groups of a user we have the command: groups "user"

    group test

###### Getent

To finish we can use the getent command to consult the /etc/passwd and /etc/group files:

1. getent passwd
2. getent group

#### Conclusion

We have learned that it is easier and more practical than it seems to manage users and groups under Linux.