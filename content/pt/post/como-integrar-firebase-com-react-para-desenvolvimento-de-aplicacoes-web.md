---
title: 'Como integrar Firebase com React para desenvolvimento de aplicações web'
date: '2023-06-20T18:45:21-03:00'
status: publish
permalink: /como-integrar-firebase-com-react-para-desenvolvimento-de-aplicacoes-web
author: 'Renan Ribeiro Lage'
excerpt: "Este artigo aborda o processo de integração do Firebase, uma plataforma de desenvolvimento de aplicativos web do Google, com o React, uma popular biblioteca JavaScript para criação de interfaces de usuário.  \nPassamos pelas etapas de preparação do ambiente, configuração do Firebase e autenticação de usuários. Além disso, abordamos como gerenciar a sessão do usuário em aplicações React utilizando o Firebase.  \nEssas orientações servem como um guia inicial para você começar a criar aplicações web robustas e com recursos completos, sem a necessidade de um back-end separado, utilizando a combinação eficaz de React e Firebase."
type: post
id: 243
category:
    - Uncategorized
tag: []
post_format: []
om_disable_all_campaigns:
    - ''
cmplz_hide_cookiebanner:
    - ''
burst_total_pageviews_count:
    - '2'
---
Este artigo guiará você através dos passos necessários para integrar o Firebase, uma plataforma de desenvolvimento de aplicativos da Google, com React, uma biblioteca JavaScript para construção de interfaces de usuário. Vamos construir uma aplicação simples de autenticação de usuários para ilustrar os conceitos.

Preparação do Ambiente
----------------------

Antes de começar, certifique-se de ter o Node.js e o npm (gerenciador de pacotes do Node) instalados em sua máquina. Também é necessário ter uma conta no Google para acessar o Firebase.

1. Primeiro, vamos criar um novo projeto React usando `create-react-app`. Abra seu terminal e execute:

``` shell
npx create-react-app firebase-react-app
```

2. Navegue até o diretório do novo projeto:

``` shell
cd firebase-react-app
```

3. Em seguida, vamos instalar o Firebase em nosso projeto React com o seguinte comando:

``` shell
npm install firebase
```

Configurando o Firebase
-----------------------

Agora, você precisa criar um novo projeto Firebase.

1. Vá para o [console do Firebase](https://console.firebase.google.com/), clique em “Add Project” e siga as instruções.
2. Após a criação do projeto, clique em “Adicionar Firebase ao seu aplicativo web”.
3. Copie as credenciais fornecidas. Elas serão algo como:

``` shell
var firebaseConfig = {
  apiKey: "AIzaSy***************",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "************",
  appId: "1:************:web:**********"
};
```

Agora, vamos inicializar o Firebase em nosso projeto React. No diretório `src`, crie um novo arquivo chamado `firebase.js` e cole o código de configuração que você obteve do Firebase. Seu código deve ficar assim:

``` shell
import firebase from 'firebase';

var firebaseConfig = {
  // Sua configuração aqui
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
```

Autenticação com Firebase
-------------------------

Agora, vamos configurar a autenticação de usuários com o Firebase. Para este exemplo, usaremos a autenticação por e-mail/senha, mas o Firebase oferece diversas outras opções, como Google, Facebook, Twitter, entre outros.

1. No console do Firebase, selecione “Authentication” no menu lateral.
2. Clique na guia “Sign-in method” e ative a opção “Email/Password”.

No React, você pode usar os métodos `firebase.auth().createUserWithEmailAndPassword(email, password)` e `firebase.auth().signInWithEmailAndPassword(email, password)` para criar e autenticar usuários, respectivamente.

``` shell
import React, { useState } from 'react';
import firebase from './firebase';

function Authentication() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert('Usuário criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar usuário:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert('Usuário autenticado com sucesso!');
    } catch (error) {
      alert('Erro ao autenticar usuário:', error);
    }
  };

  return (
    <div>
      <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>
        Cadastrar
      </button>
      <button onClick={handleSignIn}>
        Entrar
      </button>
    </div>
  );
}

export default Authentication;
```

Aqui, criamos um componente React que possui dois campos de entrada, para o email e a senha, e dois botões, um para o registro e outro para o login. Os handlers `handleSignUp` e `handleSignIn` utilizam os métodos do Firebase para registrar e autenticar usuários, respectivamente.

Lidando com a sessão do usuário
-------------------------------

Para gerenciar a sessão do usuário, você pode utilizar o método `firebase.auth().onAuthStateChanged()`. Ele recebe uma função que será chamada sempre que o estado de autenticação do usuário mudar.

Você pode criar um Hook personalizado para isso:

``` shell
import { useState, useEffect } from 'react';
import firebase from './firebase';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}
```

Neste código, `useAuth` é um Hook que retorna o usuário atual. Ele configura um observador para o estado de autenticação do usuário quando o componente é montado, e o remove quando é desmontado.

Conclusão
---------

Neste artigo, apresentamos os passos básicos para a integração entre Firebase e React. Embora tenhamos focado na autenticação de usuários, o Firebase oferece uma série de outros recursos, como banco de dados em tempo real, armazenamento de arquivos, análise de uso e muito mais.

A combinação de React e Firebase permite que você crie aplicações web robustas e com recursos completos, sem a necessidade de um back-end separado. Certamente, é uma opção valiosa a ser considerada para o seu próximo projeto.
