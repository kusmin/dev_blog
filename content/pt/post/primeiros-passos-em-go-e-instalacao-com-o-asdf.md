---
title: 'Primeiros Passos em Go e Instalação com o ASDF'
date: '2023-07-13T20:47:37-03:00'
status: publish
permalink: /primeiros-passos-em-go-e-instalacao-com-o-asdf
author: 'Renan Ribeiro Lage'
excerpt: "Este artigo apresentou a linguagem de programação Go e a ferramenta de gerenciamento de versões ASDF. Primeiramente, descreveu-se brevemente o que é a linguagem Go, destacando sua simplicidade, eficiência e foco em desempenho e concorrência.  \nEm seguida, o artigo detalhou o processo de instalação do Go usando o ASDF. Para instalar o ASDF, é necessário clonar o repositório do Github e adicionar algumas linhas ao arquivo .bashrc ou .zshrc. Após a instalação do ASDF, o plugin Go deve ser adicionado, permitindo a instalação da linguagem. Ao final da instalação, uma versão padrão de Go é definida para o sistema.  \nPor fim, o artigo guiou o leitor através de seus primeiros passos na programação Go, apresentando um exemplo simples de um programa \"Hello, World!\". A execução desse programa confirma que a instalação foi bem-sucedida e prepara o leitor para explorar mais a fundo a linguagem Go."
type: post
id: 318
category:
    - Golang
tag: []
post_format: []
om_disable_all_campaigns:
    - ''
cmplz_hide_cookiebanner:
    - ''
burst_total_pageviews_count:
    - '6'
---
Neste artigo, você aprenderá como dar seus primeiros passos com a linguagem de programação Go, também conhecida como Golang, e como fazer a instalação da linguagem usando a ferramenta ASDF.

Introdução à Go
---------------

Go é uma linguagem de programação de código aberto criada pelo Google em 2007. Ela é conhecida por ser uma linguagem simples, eficiente e fácil de usar, com um foco forte na concorrência e no desempenho.

A linguagem Go tem uma sintaxe limpa e clara, tornando-a fácil para os novatos aprenderem. Além disso, Go foi projetada para lidar com programas de grande escala e para aproveitar ao máximo o hardware moderno, o que a torna uma ótima opção para o desenvolvimento de aplicações de alto desempenho.

Instalando Go com ASDF
----------------------

ASDF é um gerenciador de versões para múltiplas linguagens de programação. Ele permite que você instale, gerencie e alterne facilmente entre diferentes versões de uma linguagem de programação em seu sistema. Para instalar Go usando o ASDF, siga os passos a seguir.

### Instalação do ASDF

1. **Baixe o ASDF**

Para instalar o ASDF, você primeiro precisa clonar o repositório no Github. Para fazer isso, abra um terminal e digite:

``` shell
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.1
```

2. **Configure o ASDF**

Para começar a usar o ASDF, você precisa adicionar algumas linhas ao seu arquivo .bashrc ou .zshrc. Para fazer isso, digite:

``` shell
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bashrc
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
```
Após isso, reinicie seu terminal para que as mudanças entrem em vigor.

### Instalação de Go com ASDF

1. **Adicione o plugin Go**

Antes de poder instalar Go, você precisa adicionar o plugin Go ao ASDF. Para fazer isso, digite:

``` shell
asdf plugin-add go https://github.com/kennyp/asdf-golang.git
```

2. **Instale Go**

Depois de adicionar o plugin Go, você pode instalar Go. Para instalar a versão mais recente de Go, digite:

``` shell
asdf install go latest
```

3. **Defina a versão global de Go**

Depois de instalar Go, você pode definir a versão que deseja usar como padrão em seu sistema. Para fazer isso, digite:

``` shell
asdf global go <versão_instalada>
```

Pronto! Agora você tem Go instalado em seu sistema e pode começar a programar. Para verificar se a instalação foi bem-sucedida, tente executar `go version` no terminal. Você deve ver a versão do Go que você instalou.

Primeiros Passos em Go
----------------------

Agora que você tem Go instalado, você pode começar a explorar a linguagem. A sintaxe de Go é bastante direta e você pode começar com um simples “Hello, World!”.

Crie um novo arquivo chamado `hello.go` e adicione o seguinte código:

``` golang
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Você pode executar este programa digitando `go run hello.go` no terminal. Você deve ver “Hello, World!” impresso na tela.

Conclusão
---------

Neste artigo, mostramos como instalar Go usando ASDF e como dar seus primeiros passos na linguagem Go. Agora você está pronto para explorar ainda mais a linguagem e começar a construir suas próprias aplicações. Lembre-se, a prática é a chave para se tornar proficientes em qualquer linguagem de programação, então continue praticando e construindo!

- - - - - -
