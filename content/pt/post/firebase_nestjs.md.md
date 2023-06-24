---
author: Renan Ribeiro Lage
title: Integrando NestJS com Firebase
date: '2023-06-24T03:00:00.000Z'
series:
  - firebase
  - nestjs
categories:
  - nestjs
---

# Integrando NestJS com Firebase

O Firebase é uma plataforma de desenvolvimento de aplicativos que fornece infraestrutura e serviços de back-end para desenvolver aplicativos de qualidade. Esta plataforma do Google oferece uma série de recursos, incluindo hospedagem, banco de dados em tempo real, autenticação, armazenamento em nuvem, entre outros.

Neste artigo, vamos abordar como integrar Firebase com uma aplicação NestJS.

## Configurando um Novo Aplicativo NestJS

Primeiramente, vamos criar um novo aplicativo NestJS. Se você ainda não instalou o CLI do NestJS, pode fazê-lo com o seguinte comando:

npm i -g @nestjs/cli


Agora, para criar um novo aplicativo NestJS, execute:

nest new firebase-app


Isso criará uma nova pasta firebase-app com a estrutura inicial do aplicativo NestJS.

## Configurando Firebase

Para configurar Firebase, primeiro, instale o SDK Admin do Firebase:

npm install firebase-admin --save


Em seguida, você precisa obter as credenciais do seu projeto Firebase. Vá para as Configurações do Projeto no Console Firebase e baixe o arquivo JSON da chave privada de serviço. Coloque este arquivo no diretório raiz do seu projeto.

Depois de fazer isso, você pode inicializar o Firebase da seguinte maneira:

```javascript
import * as admin from 'firebase-admin';
import * as serviceAccount from './firebase-key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
```

## Autenticação com Firebase

Para autenticar usuários com Firebase, vamos criar um serviço de autenticação:

nest generate service auth


Dentro do arquivo auth.service.ts, você pode injetar sua instância do Firebase e verificar tokens de ID de usuários como segue:

```javascript
import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(@Inject('FIREBASE') private readonly firebase: admin.app.App) { }

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedToken = await this.firebase.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw error;
    }
  }
}
```

No código acima, temos um método verifyIdToken que interage com o serviço de autenticação do Firebase para verificar o token de ID.

## Implementando Firebase Realtime Database

O Firebase Realtime Database é um banco de dados hospedado na nuvem. Os dados são armazenados como JSON e sincronizados em tempo real para cada cliente conectado.

Vamos criar um serviço simples para interagir com o Firebase Realtime Database.

nest generate service firebase


Dentro do arquivo firebase.service.ts, podemos injetar nossa instância Firebase e interagir com o banco de dados da seguinte maneira:

```javascript
import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIREBASE') private readonly firebase: admin.app.App) { }

  async getData(path: string): Promise<any> {
    try {
      const snapshot = await this.firebase
        .database()
        .ref(path)
        .once('value');
      return snapshot.val();
    } catch (error) {
      throw error;
    }
  }

  async updateData(path: string, data: any): Promise<void> {
    try {
      await this.firebase
        .database()
        .ref(path)
        .update(data);
    } catch (error) {
      throw error;
    }
  }
}

```

Neste exemplo, criamos dois métodos: getData e updateData. O método getData recupera dados de um caminho especificado, enquanto updateData atualiza os dados em um caminho específico.

## Implementando Firebase Cloud Messaging

O Firebase Cloud Messaging (FCM) é um serviço de mensagens que permite enviar notificações para dispositivos Android, iOS e aplicações web.

Vamos criar um serviço simples para enviar notificações usando FCM.

nest generate service messaging


Dentro do arquivo messaging.service.ts, podemos injetar nossa instância Firebase e enviar mensagens da seguinte maneira:

```javascript
import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class MessagingService {
  constructor(@Inject('FIREBASE') private readonly firebase: admin.app.App) { }

  async sendNotification(token: string, payload: admin.messaging.MessagingPayload): Promise<void> {
    try {
      await this.firebase.messaging().sendToDevice(token, payload);
    } catch (error) {
      throw error;
    }
  }
}

```

No exemplo acima, temos um método sendNotification que usa o serviço de mensagens do Firebase para enviar uma notificação a um dispositivo específico.

## Conclusão

Neste artigo, exploramos como integrar o Firebase em um aplicativo NestJS. O Firebase oferece uma série de serviços de back-end, e a combinação de Firebase e NestJS pode ajudar a criar aplicações web e móveis robustas e escaláveis.

Essa é apenas a ponta do iceberg de como NestJS pode ser integrado com Firebase. Com estas instruções, você já pode explorar mais recursos e implementar funcionalidades adicionais conforme necessário. Bom trabalho!
