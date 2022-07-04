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
title = "Mail manager: Zoho"

+++
Often you will want your own email service for your business or personal use, there are several paid and easy to implement alternatives, perhaps the best known is Gmail. Today we will look at a free and easy to implement alternative which is Zoho.

##### What is Zoho

Zoho is a complete CRM for your business that is free to use up to a certain amount of usage [https://www.zoho.com](https://www.zoho.com "https://www.zoho.com/pt-br/"). It has many administrative tools that help you organize your company's day to day operations. In this article we will see how to configure the DNS for Zoho's email access. As a prerequisite you need a domain name.

##### Configuration

After entering the site [https://www.zoho.com/](https://www.zoho.com/ "https://www.zoho.com/"), click on free registration, register for free in the way you prefer, after registration you will fall on this page.![](/uploads/zoho.png)

Click on mail option, on the next screen if you already have the domain, choose the first option and click continue.

(/uploads/domain-zoho.png)

On the hosting option, scroll down and choose the free option.

![](/uploads/zohoplanofree.png)

On the next screen choose the "Add an existing domain" option. Fill in the details of your domain and organization. After filling out the form you will move to the domain verification screen.

![](/uploads/configurandodomain.png)

As requested we add the requested registration to our domain manager.

![](/uploads/txtverification.png)

Now wait until the records are propagated, this will depend on your domain manager. 

Note: Besides TXT there are other ways to verify, like CNAME.

On the next page choose your e-mail as administrator and click on create. 

Add new users, remembering the limits of the free plan of 5 users.

Create the groups to separate the users, by sector or in the best way that suits you, this step, as well as creating other users is optional.

Now it is time to configure the DNS record.

![](/uploads/configuredns.png)

If you are using AWS's route53 it will look something like this.

![](/uploads/mxconfigure.png)

Remember that the DNS process can take some time, depending on the propagation.

The last two parts are the final configuration, in case you want to migrate emails from another server and download Zoho's mobile apps which are a great way to monitor.

That's it! You have a professional email service for free!

