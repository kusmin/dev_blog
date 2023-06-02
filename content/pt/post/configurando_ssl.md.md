---
author: Renan Ribeiro Lage
title: >-
  Configurando SSL com Certificado da Cloudflare em um Servidor Apache na AWS
  EC2
date: '2023-06-01T03:00:00.000Z'
tags:
  - ssl
categories:
  - infra
---

![](/cloudflare.png)

# Introdução

Neste tutorial, vamos aprender como configurar um certificado SSL da Cloudflare no Apache em uma instância AWS EC2. SSL (Secure Sockets Layer) é uma tecnologia que protege o site ao estabelecer uma conexão criptografada entre o servidor web e o navegador do visitante.

# Pré-requisitos

* Uma instância AWS EC2 rodando Ubuntu.
* Servidor Apache instalado na instância EC2.
* Certificado SSL da Cloudflare.

# Passo 1: Instalar o módulo SSL no Apache

Se ainda não estiver instalado, podemos instalar o módulo SSL do Apache com o seguinte comando:

```
sudo apt-get install apache2
sudo a2enmod ssl
```

Após a instalação, é necessário reiniciar o Apache para que o módulo SSL possa ser ativado.

```
sudo systemctl restart apache2
```

# Passo 2: Adicionar Certificado SSL da Cloudflare

Assumindo que você já tem o certificado SSL da Cloudflare, precisamos copiar esses arquivos para o servidor. A maneira mais segura de fazer isso é por meio de uma conexão SSH segura.

No seu servidor, crie um diretório onde você armazenará os arquivos do certificado:

```
sudo mkdir /etc/ssl
```

Em seguida, copie os arquivos do certificado para o servidor:

```
sudo nano /etc/ssl/cloudflare.crt
sudo nano /etc/ssl/cloudflare.key
```

# Passo 3: Configurar o arquivo Virtual Host

Agora, precisamos dizer ao Apache para usar nosso certificado SSL para o site em questão. Isso é feito no arquivo de configuração Virtual Host do Apache para o seu site.

```bash
sudo nano /etc/apache2/sites-available/000-default.conf
```

E adicione a configuração do VirtualHost para SSL:

```
<VirtualHost \*:443>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html

    ServerName yourdomain.com
    ServerAlias www.yourdomain.com

    SSLEngine on
    SSLCertificateFile /etc/ssl/cloudflare.crt
    SSLCertificateKeyFile /etc/ssl/cloudflare.key

    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"

    ErrorLog ${APACHE\_LOG\_DIR}/error.log
    CustomLog ${APACHE\_LOG\_DIR}/access.log combined
\</VirtualHost>
```

Salve e feche o arquivo.

# Passo 4: Teste a Configuração do Apache

Antes de reiniciar o Apache, devemos verificar se a configuração está correta:

```
sudo apache2ctl configtest
```

Se tudo estiver OK, você deve ver "Syntax OK" como resultado.

# Passo 5: Reiniciar Apache

Para que as alterações entrem em vigor, reinicie o Apache mais uma vez:

```
sudo systemctl restart apache2
```

Agora seu site deve estar acessível via HTTPS, com uma conexão segura fornecida pelo certificado SSL da Cloudflare.

# Conclusão

Com o Apache e a Cloudflare, você pode garantir que seu site ou aplicação web esteja seguro e acessível por meio de uma conexão HTTPS. A segurança do site é uma consideração crucial para a prote
