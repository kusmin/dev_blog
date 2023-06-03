---
author: Renan Ribeiro Lage
title: Entendendo o Pentest e Como Usar o WPScan em Sites WordPress
date: '2023-06-02T03:00:00.000Z'
---

Introdução

No mundo cada vez mais digitalizado de hoje, a segurança cibernética tornou-se uma necessidade incontornável. Dado o fato de que muitos sites e aplicações web são alvos atrativos para os cibercriminosos, é crucial que tais plataformas sejam regularmente avaliadas em termos de segurança. Uma das formas mais eficazes de fazer isso é através do Pentesting. Neste artigo, vamos entender o que é o Pentest e como usar a ferramenta WPScan para verificar a segurança de um site WordPress.

***

O que é Pentest?

Pentest, ou Teste de Penetração, é um método de avaliação de segurança em que especialistas tentam explorar vulnerabilidades em um sistema, rede ou aplicação web. O objetivo é descobrir pontos fracos que um invasor poderia explorar.

***

Por que WPScan?

O WPScan é uma ferramenta gratuita e de código aberto que permite aos usuários avaliar a segurança de um site WordPress. Ela foi criada especificamente para detectar vulnerabilidades comuns em sites WordPress e pode ser uma ferramenta extremamente útil na identificação de possíveis ameaças.

***

Como usar o WPScan

1\. Instalação: No Linux, você pode instalar o WPScan com os seguintes comandos:

```bash
sudo apt-get install ruby ruby-dev
sudo gem install wpscan
```

2\. Atualização da Base de Dados: É uma boa prática atualizar a base de dados do WPScan para ter as últimas informações sobre vulnerabilidades conhecidas:

wpscan --update

3\. Verificação de Vulnerabilidades: Para escanear um site WordPress em busca de vulnerabilidades, use o seguinte comando:

```bash
wpscan --url https://seusite.com
```

Substitua "[https://seusite.com](https://seusite.com/)" pelo URL do seu site.

4\. Opções Adicionais: O WPScan oferece várias outras opções para personalizar a varredura. Por exemplo, para verificar apenas vulnerabilidades de plugins, você pode usar:

```bash
wpscan --url https://seusite.com --enumerate vp
```

E para verificar apenas vulnerabilidades de temas:

```bash
wpscan --url https://seusite.com --enumerate vt
```

***

Conclusão

É importante salientar que o Pentesting e o uso do WPScan devem ser feitos com responsabilidade. Você só deve fazer a varredura de sites que possui ou para os quais tem permissão explícita para testar. A segurança cibernética é um componente essencial da presença online de qualquer organização e a manutenção dessa segurança deve ser uma prioridade. Portanto, continue verificando a segurança de seu site e mantendo-se atualizado sobre as últimas tendências em segurança cibernética.
