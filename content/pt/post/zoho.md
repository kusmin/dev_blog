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
title = "Zoho"

+++
Muitas vezes você vai querer o seu próprio serviço de e-mail para sua empresa ou para utilização pessoal, tem varias alternativas pagas e simples de implementar, talvez o mais conhecido seja o Gmail. Hoje veremos uma alternativa gratuita e fácil de implementar que é o Zoho.

##### O que é o Zoho

O Zoho é um CRM completo para usa empresa que até determinada quantidade de utilização é utilizado de forma gratuita [https://www.zoho.com](https://www.zoho.com "https://www.zoho.com/pt-br/"). Ele tem varias ferramentas administrativas que ajudam a organizar o dia-a-dia da sua empresa. Neste artigo vamos ver como configurar o DNS para este acesso ao e-mail pelo Zoho. Como pre-requisito é necessário um domínio.

##### Configuração

Depois de entrar no site [https://www.zoho.com/](https://www.zoho.com/ "https://www.zoho.com/"), clique em inscrição gratuita, inscreva-se de forma gratuita da forma que preferir, depois da inscrição, vai cair nesta pagina.![](/uploads/zoho.png)

Clique na opção de mail, na próxima tela caso já tenha o domínio, escolha a primeira opção e clique em prosseguir.

![](/uploads/dominio-zoho.png)

na opção de hospedagem, role a tela para baixo e escolha a opção gratuita.

![](/uploads/zohoplanofree.png)

Na próxima tela escolha a opção de "Adicionar um domínio existente". Preencha com os dados do seu domínio e organização. Depois de preenchido o formulário vai passar para a tela de verificação do domínio.

![](/uploads/configurandodominio.png)

Conforme solicitado acrescentamos no nosso gerenciador de domínio o registro solicitado.

![](/uploads/txtverificacao.png)

Agora é esperar ate os registros serem propagados, isto vai depender do seu gerenciador de domínio. 

Obs: Além do TXT a outras formas de verificação como pelo CNAME.

Na próxima página escolha o seu e-mail que vai ser o de administrador e clique em criar. 

Adicione novos usuários, lembrando dos limites do plano gratuito de 5 usuários.

Crie os grupos para separar os usuários, por setor ou da melhor forma que lhe convir, esta etapa, assim como a de criar outros usuários é opcional.

Agora é a parte da configuração do registro DNS.

![](/uploads/configuredns.png)

Se tiver utilizando o route53 da AWS ficara algo assim.

![](/uploads/mxconfigure.png)

Lembrando que o processo do DNS pode levar algum tempo, dependendo da propagação.

As duas últimas partes são a configuração final, caso deseje migrar emails de outro servidor e baixar os aplicativos moveis do Zoho que são uma ótima maneira de monitoramento.

E pronto! Você tem um serviço de e-mail profissional de forma gratuita !