---
title: Configuração e Validação de Segurança SSL/TLS em Servidores Apache
series:
  - Segurança
---

Na era digital atual, a segurança do site é de extrema importância. A garantia de que suas conexões são seguras pode proteger seus usuários contra possíveis interceptações de dados ou ataques cibernéticos. Neste artigo, vamos mostrar como configurar o protocolo SSL/TLS em um servidor Apache e validar suas configurações para garantir uma navegação segura.

Entendendo o SSL e o TLS

O Secure Sockets Layer (SSL) e o Transport Layer Security (TLS) são protocolos criptográficos usados para aumentar a segurança durante a comunicação pela internet. Esses protocolos garantem que os dados transmitidos entre o servidor web e o cliente (navegador web) sejam criptografados e, portanto, protegidos de interceptação.

Configurando o SSL/TLS no Apache

É importante desativar as versões obsoletas e menos seguras de SSL e TLS (como SSLv2, SSLv3, TLS 1.0 e TLS 1.1) e permitir apenas versões mais seguras, como TLS 1.2 e TLS 1.3. Veja como você pode fazer isso em um servidor Apache:

1. Abra o arquivo de configuração SSL do Apache. Pode estar localizado em diferentes lugares dependendo da sua configuração, mas um local comum é /etc/apache2/mods-available/ssl.conf.
2. No arquivo de configuração, localize a linha que começa com SSLProtocol.
3. Altere essa linha para o seguinte: SSLProtocol all -SSLv2 -SSLv3 -TLSv1 -TLSv1.1. Isso desativa SSLv2, SSLv3, TLS 1.0 e TLS 1.1, enquanto permite todas as outras versões.
4. Salve o arquivo e feche-o.
5. Reinicie o Apache para aplicar as alterações com o comando sudo service apache2 restart.

Validando a Configuração SSL/TLS

Depois de configurar o SSL/TLS, é importante verificar se as alterações foram aplicadas corretamente. Aqui estão algumas maneiras de fazer isso:

1.

eopenssl s\_client -connect seuwebsite.com:443 -tls1\_1

1. Utilizando ferramentas online: Existem várias ferramentas online, como SSL Labs ou TestSSLServer, que podem verificar quais versões do SSL e TLS seu servidor está oferecendo. Porém, tenha em mente que algumas dessas ferramentas podem armazenar em cache os resultados das verificações, então pode levar algum tempo para que as alterações sejam refletidas.

Conclusão

Garantir a segurança do site é uma parte crucial da manutenção de qualquer serviço online. Configurar corretamente o SSL/TLS e validar regularmente essas configurações podem proteger seus usuários e evitar possíveis problemas futuros. Sempre esteja atento
