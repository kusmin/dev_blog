---
author: Renan Ribeiro Lage
title: Gerenciando Autenticação com Firebase e NestJS
date: '2023-06-24T03:00:00.000Z'
tags:
  - firebase
  - nestjs
series:
  - firebase
  - nestjs
---

# Gerenciando Autenticação com Firebase e NestJS

Neste artigo, vamos discutir como você pode usar o Firebase para gerenciar autenticação de usuários em seu aplicativo NestJS. O Firebase Authentication facilita a implementação de uma variedade de métodos de autenticação, incluindo e-mail/senha, autenticação por telefone, autenticação por mídias sociais e muito mais.

## Configurando o Serviço de Autenticação

Primeiro, vamos criar um novo serviço de autenticação:

nest generate service authentication

Assim como antes, vamos injetar nossa instância Firebase neste serviço. Dentro do arquivo authentication.service.ts, adicionaremos alguns métodos para lidar com a criação e autenticação de usuários.

```javascript
import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthenticationService {
  constructor(@Inject('FIREBASE') private readonly firebase: admin.app.App) { }

  async createUser(email: string, password: string): Promise<admin.auth.UserRecord> {
    try {
      return await this.firebase.auth().createUser({
        email: email,
        password: password,
      });
    } catch (error) {
      throw error;
    }
  }

  async authenticateUser(email: string, password: string): Promise<string> {
    try {
      const user = await this.firebase.auth().getUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
      // Note: Firebase does not support server-side authentication with email and password.
      // You can use a client SDK, such as Firebase Javascript SDK, for this purpose.
      // The following code is for illustration purposes only.
      if (user.password !== password) {
        throw new Error('Invalid password');
      }
      return user.uid;
    } catch (error) {
      throw error;
    }
  }
}

```

Observe que o Firebase não suporta autenticação no lado do servidor com e-mail e senha. Você pode usar um SDK cliente, como o Firebase Javascript SDK, para isso. O código acima é apenas para fins ilustrativos.

## Trabalhando com Tokens JWT

Ao lidar com autenticação em um aplicativo NestJS, é comum usar JSON Web Tokens (JWT). Com o Firebase Authentication, você pode facilmente gerar e verificar tokens JWT.

Vamos adicionar alguns métodos ao nosso serviço de autenticação para lidar com isso:

```javascript
// Inside AuthenticationService...

async createToken(uid: string): Promise < string > {
  try {
    return await this.firebase.auth().createCustomToken(uid);
  } catch(error) {
    throw error;
  }
}

async verifyToken(token: string): Promise < admin.auth.DecodedIdToken > {
  try {
    return await this.firebase.auth().verifyIdToken(token);
  } catch(error) {
    throw error;
  }
}

```

Agora, nosso serviço de autenticação pode gerar tokens JWT personalizados para usuários e também verificar esses tokens.

## Conclusão

Neste artigo, vimos como o Firebase pode ser usado para gerenciar a autenticação de usuários em um aplicativo NestJS. O Firebase Authentication fornece uma ampla variedade de recursos para lidar com a autenticação do usuário, tornando-se uma opção atrativa para muitos desenvolvedores. Como sempre, certifique-se de entender completamente as implicações de segurança ao implementar a autenticação em sua aplicação.
