+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["Linux"]
date = 2022-07-09T03:00:00Z
math = false
redirectUrl = ""
series = ["Linux"]
tags = ["process", "Linux"]
thumbnail = ""
title = "Linux: Process Management - Part 1"

+++
In today's post we will talk about some useful process management commands in Linux.

#### Introduction

All processes on linux have a unique identifier called PID and have a parent process called PPID. The first process that runs on the system and father of all other processes is init, today it is replaced by systemd with PID = 1.

One command we can use to check this process tree is pstree.

    pstree

It will show a tree of commands, in some distributions it doesn't come installed by default, in these cases you must install _psmisc_.

You can see that systemd is the father of all of them.

If you want to see the PID of the processes, you must pass the parameter -p.

     pstree -p

This will show you the process tree again, but now with the PID of each process.

#### Monitoring the processes

##### top

Now let's take a look at the _top_ command, which is a process that is used a lot in the day, and allows us to observe what is being executed in real time.

    top

![top](/uploads/top.png "top command")

It will show and update the processes that are running on the system. One very important piece of data it shows is the _load average,_ which is the average load on the system. The first number in it shows the last minute, the second the last five minutes and the third the last fifteen minutes. If the first number is higher than the others the load is going up, if it is lower it is going down over time.

Inside the command if you type one, it shows the Cpu, and the load on each of them.

Cpus](/uploads/cpus.png "Cpus")

The id inside the cpu shows the idle usage of the cpu, if it is high it is ok, but if it is high, it means that one is doing some heavy processing. The wa shows the waiting to write to disk, if it is low no problem, but if it is high it is writing to disk. An example is if you have a low id and a high wa it can be a bottleneck for disk writing.

With practice you will learn the meaning of each value.

Two commands that are important to know for sorting are the **_Schift + M_** that sorts by memory, so you can see which process is consuming more memory. And the **_Schift + C_** shows the command that is consuming the most cpu.

To exit top just type 'q'.

##### free

Another important command to keep track of the server management is the free command which shows the memory consumption of the machine.

    free

![free](/uploads/free.png "free")

In this case it is showing in bytes to show in megabytes, we can pass the parameter -m.

    free -m

![](/uploads/free-m.png)

Linux has a tendency to use as much memory as it can to maximize processes, often caching in the filesystem, you can't rely only on free but mainly on avaliable.

##### uptime

This is a command that shows how long the machine is on and the average load.

![uptime](/uploads/uptime.png "uptime")

##### pidof pgrep

The last commands we will look at today are pidof and pgrep.

The pidof returns the process pid by the exact name by the process, in pgrep it returns based on a regex just like normal grep that can be used in other commands. For example:

> pidof snap-store

![pidof](/uploads/pidof.png "pidof")

    pgrep snap

![](/uploads/pgrep.png)

You can see that pgrep returned more than one result found for that regex value. 

#### Conclusion

We have seen some very useful commands for you to manage your Linux server or system on a daily basis. See you next time!