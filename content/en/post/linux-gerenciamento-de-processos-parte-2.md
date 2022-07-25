+++
aliases = []
author = "Renan Ribeiro Lage"
categories = []
date = 2022-07-11T03:00:00Z
math = false
redirectUrl = ""
series = ["Linux"]
tags = ["linux", "process"]
thumbnail = ""
title = "Linux: Process Management - Part 2"

+++
In this post continuing with useful Linux management commands, we will learn how to check processes with the 'ps' command, send signals to processes with the 'kill', 'killall' and 'pkill' commands, foreground and background processes and how to change their priorities.

#### PS

The ps command lists the current processes in the user terminal.

    ps

![ps](/uploads/ps.png "ps")

As you can see in my case, I only had ps and bash running on my terminal at the time, and it returns the PID of these processes.

We can pass some parameters next to _ps_ for more detailed information. Running the command:

    ps --help all

It brings a list of parameters that we can use, the most important of which are

* -u => Show more information related to the user.
* -x => Show processes that have not been started directly on your terminal.
* -a => Show all the user's processes.

If we type the command:

    ps aux

![ps aux](/uploads/ps-aux.png "ps aux")

This returns a list of all the processes in great detail, it is a very useful command for everyday use.

It is quite common along with ps aux command, we use grep to be able to filter this list which is quite long. Here is an example:

    ps aux | grep nginx

![ps nginx](/uploads/ps-nginx.png "ps nginx")

With grep we can see only the processes that we are interested in, in this case, it did not return the nginx processes that are running on my machine.

#### Sending signals to the processes

##### kill

The kill command is used to send signals to the processes, signals can be of various types, to end, pause, resume a process and others, with the command:

    kill -l

It will return a list of signals that we can send to the processes.

![](/uploads/kill-list.png)

An example of a signal is when we are starting to type a command or even when we are executing a command and we type Crtl + C, in this case we are sending a signal, which is the 2) SIGINT interrupt signal.

Another two examples we have of very used signals is the 15 is SIGTERM which ends a process and the 9 SIGKILL which ends the process abruptly. The most recommended is to always run 15 first as it will send the process to terminate and the process will finish whatever it is doing at that moment and then terminate. On 9 it will terminate the process regardless, which can lead to problems if the process is doing something important like a commit to the database, in which case if it had used 15 it would have finished the commit and only then terminated the process.

There are two ways to send the signals to the processes:

1. kill -s SIGTERM "PID-PROCESS"
2. kill -15 "PID-PROCESS"

You can either send it by the signal name or by the signal number followed by the process name.

By default the kill is 15 SIGTERM, if you want to send this signal to the process you can write it in short:

    kill "NAME-PROCESS"

##### killall and pkill

killall kills the process based on the exact process name and pkill is a form of grep it will kill all processes found with that regex.

    killall "PROCESS-NAME"
    
    pkill "REGEX-PROCESSES


#### Foreground(fg) and Background(bg)

The foreground is the process that appears to be running on your terminal at that moment, "locking" your terminal to it. On the other hand, the background is the process that happens behind, without you "seeing" it, in this case it frees the terminal for you.

An example of a foreground process is when we use the command

     tail -f "file-name"

In which we wait for new writes to the file, this is very useful for tracking logs. Another example of foreground, I will create a for process that will get stuck:

    for i in `seq 1000` ; do sleep 2 ; echo $i ; done

The command runs a for from 0 to 1000, printing out the values every 2 seconds, if you ran it on your machine, you will see that you can't run any more commands, the process has "stuck" your terminal. The command is in the foreground.

We can run the same command in backgound, using the same command we will add an '&' at the end. Check it out:

    for i in `seq 1000` ; do sleep 2 ; echo $i ; done &

Now it is running the process, in the background, and you can run other commands in the terminal, while it is running in the background. When I type jobs it shows all the processes that are running in the background on the terminal.

    jobs

jobs](/uploads/jobs.png "jobs")

Returns the number of jobs, their state and the command they are running. If you want to move the process to the foreground type fg followed by the job number, in this case 1.

    fg 1

The process is now in foreground. If you now type Ctrl + Z it will pause the process and put it in the background again. To put it back in backgound just type the command bg followed by the job number.

    bg 1

If you want to kill the job, we have the kill command. The kill command followed by % and the job number.

    kill %1

Now let's talk about priorities.

#### Priorities

The priorities in Linux go from 0 to 39, in general when Linux creates a new process it is 'born' with priority 20. The lower the priority value of the process, the higher the priority value, the lower its priority. In this case the process with 0 is the highest priority and those with 39.

We can set or change the priority value with nice, which goes from -20 to 19, if we set nice to -20, the process will have priority 0, if we set it to 19 it will have priority 39.

By running the top command, we can see the priority and nice values of the processes.

    top

![priorities](/uploads/priorities.png "priorities")

The 3 column, 'PR' shows the priority values and the c 4 column, 'NI' represents the nice value. As said before the process is born with priority 20 and nice 0.

To set the priority manually we can use the nice command followed by -n, the nice value, followed by the command. For example let's execute the top command with priority 0.

    nice -n -20 top

Or with the minimum priority.

    nice -n 19 top

nice can only be used when creating a process. To change the process after it has been created we have renice. It is executed using renice -n nice number, followed by the process name.

    renice -n 'NUMERO_RENICE' 'NUMERO_PID'

One detail is that normal users can only use renice with positive values. For negative values, you must be root.

#### Conclusion

In this post we have covered the main commands for managing Linux, we saw the ps process, kill, foreground, background and how to set priority with nice and renice.

I hope that with this post you can take another step in using Linux. See you next time!