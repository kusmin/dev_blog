---
title: 'Gerenciando dados com Cloud Firestore e Cloud Storage no Firebase'
date: '2023-06-20T19:27:06-03:00'
status: publish
permalink: /gerenciando-dados-com-cloud-firestore-e-cloud-storage-no-firebase
author: 'Renan Ribeiro Lage'
excerpt: "Neste artigo, exploramos como gerenciar dados usando os serviços Cloud Firestore e Cloud Storage do Firebase. Primeiro, mostramos como configurar o ambiente para usar esses serviços, seguido por exemplos de criação, recuperação, modificação e exclusão de documentos no Cloud Firestore. Também discutimos a criação de índices no Firestore para consultas compostas.  \nEm seguida, demos uma visão geral de como manipular arquivos no Cloud Storage, incluindo fazer upload, download, modificar metadados e deletar arquivos.  \nFinalmente, ilustramos como integrar esses serviços com o Firebase Cloud Functions para automatizar tarefas e reagir a eventos. Esta orientação completa permite que você utilize ao máximo o gerenciamento de dados e arquivos no Firebase, formando uma base sólida para a criação de aplicações web e móveis avançadas."
type: post
id: 247
category:
    - Uncategorized
tag: []
post_format: []
om_disable_all_campaigns:
    - ''
cmplz_hide_cookiebanner:
    - ''
burst_total_pageviews_count:
    - '1'
---
O Firebase oferece dois poderosos serviços para o gerenciamento de dados: o Cloud Firestore, um banco de dados NoSQL flexível e escalável, e o Cloud Storage, um serviço de armazenamento de objetos para arquivos de qualquer tipo. Neste artigo, vamos explorar como você pode criar, recuperar, modificar e deletar dados no Cloud Firestore e no Cloud Storage, e como aproveitá-los ao máximo.

Configurando o ambiente
-----------------------

Antes de começarmos, você precisa adicionar o Firebase ao seu projeto JavaScript. Se você ainda não fez isso, pode instalar o pacote firebase com npm:

``` shell
npm install --save firebase
```
Depois de instalar o pacote, você pode importar o firebase em seu arquivo JavaScript:

``` shell
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
```

Trabalhando com o Cloud Firestore
---------------------------------

O Cloud Firestore permite criar, recuperar, modificar e deletar documentos em uma coleção.

### Criando documentos

``` shell
const db = firebase.firestore();

db.collection('users').add({
  name: 'User Name',
  email: 'user@example.com'
})
.then(docRef => console.log('Document written with ID: ', docRef.id))
.catch(error => console.error('Error adding document: ', error));
```

### Recuperando documentos

``` javascript
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
});
```

### Modificando documentos

``` shell
  name: 'New User Name'
})
.then(() => console.log('Document successfully updated!'))
.catch(error => console.error('Error updating document: ', error));
```
### Deletando documentos

``` javascript
.then(() => console.log('Document successfully deleted!'))
.catch(error => console.error('Error removing document: ', error));
```

Criando índices no Firestore
----------------------------

O Firestore automaticamente cria índices para todas as consultas simples, mas para consultas compostas, você precisa criar um índice composto manualmente. Você pode fazer isso no console do Firebase em ‘Database’ &gt; ‘Indexes’ &gt; ‘Composite’ &gt; ‘Add index’.

Trabalhando com o Cloud Storage
-------------------------------

O Cloud Storage permite fazer upload, download, modificar e deletar arquivos.

### Fazendo upload de arquivos


``` javascript
const storage = firebase.storage();
const storageRef = storage.ref();

const fileRef = storageRef.child('images/image.jpg');

fileRef.put(file).then((snapshot) => {
  console.log('Uploaded a file!');
});
```

### Fazendo download de arquivos

``` javascript
  console.log('File download URL:', url);
});
```

### Modificando metadados de arquivos

``` javascript
fileRef.updateMetadata({
  customMetadata: {
    'location': 'Yosemite, CA, USA'
  }
}).then((metadata) => {
  console.log('Updated metadata:', metadata);
});
```

### Deletando arquivos

``` shell
  console.log('File deleted!');
});
```

Gerenciando dados com Cloud Firestore e Cloud Storage no Firebase
====================================================================

O Firebase oferece dois poderosos serviços para o gerenciamento de dados: o Cloud Firestore, um banco de dados NoSQL flexível e escalável, e o Cloud Storage, um serviço de armazenamento de objetos para arquivos de qualquer tipo. Neste artigo, vamos explorar como você pode criar, recuperar, modificar e deletar dados no Cloud Firestore e no Cloud Storage, e como aproveitá-los ao máximo.

Configurando o ambiente
-----------------------

Antes de começarmos, você precisa adicionar o Firebase ao seu projeto JavaScript. Se você ainda não fez isso, pode instalar o pacote firebase com npm:

``` shell
npm install --save firebase
```

Depois de instalar o pacote, você pode importar o firebase em seu arquivo JavaScript:

``` javascript
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
```

Trabalhando com o Cloud Firestore
---------------------------------

O Cloud Firestore permite criar, recuperar, modificar e deletar documentos em uma coleção.

### Criando documentos

``` javascript
const db = firebase.firestore();

db.collection('users').add({
  name: 'User Name',
  email: 'user@example.com'
})
.then(docRef => console.log('Document written with ID: ', docRef.id))
.catch(error => console.error('Error adding document: ', error));
```

### Recuperando documentos

``` javascript
db.collection('users').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
});
```

### Modificando documentos

``` javascript
db.collection('users').doc('user-id').update({
  name: 'New User Name'
})
.then(() => console.log('Document successfully updated!'))
.catch(error => console.error('Error updating document: ', error));
```

### Deletando documentos

``` javascript
db.collection('users').doc('user-id').delete()
.then(() => console.log('Document successfully deleted!'))
.catch(error => console.error('Error removing document: ', error));
```

Criando índices no Firestore
----------------------------

O Firestore automaticamente cria índices para todas as consultas simples, mas para consultas compostas, você precisa criar um índice composto manualmente. Você pode fazer isso no console do Firebase em ‘Database’ &gt; ‘Indexes’ &gt; ‘Composite’ &gt; ‘Add index’.

Trabalhando com o Cloud Storage
-------------------------------

O Cloud Storage permite fazer upload, download, modificar e deletar arquivos.

### Fazendo upload de arquivos

``` javascript
const storage = firebase.storage();
const storageRef = storage.ref();

const fileRef = storageRef.child('images/image.jpg');

fileRef.put(file).then((snapshot) => {
  console.log('Uploaded a file!');
});
```

### Fazendo download de arquivos

``` javascript
fileRef.getDownloadURL().then((url) => {
  console.log('File download URL:', url);
});
```

### Modificando metadados de arquivos

``` javascript
fileRef.updateMetadata({
  customMetadata: {
    'location': 'Yosemite, CA, USA'
  }
}).then((metadata) => {
  console.log('Updated metadata:', metadata);
});
```

### Deletando arquivos


``` javascript
fileRef.delete().then(() => {
  console.log('File deleted!');
});
```

Integrando com Firebase Cloud Functions
---------------------------------------

Você pode usar Firebase Cloud Functions para reagir a alterações no Firestore ou no Storage. Por exemplo, você pode criar uma função que é

acionada sempre que um novo documento é adicionado ao Firestore ou um novo arquivo é carregado no Storage.

### Acionando uma função quando um documento é adicionado ao Firestore

``` javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.newUser = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
      const newValue = snap.data();
      const name = newValue.name;

      console.log('Novo usuário adicionado:', name);
      
      // Sua lógica aqui
    });
```

Esta função será acionada sempre que um novo documento for adicionado à coleção ‘users’.

### Acionando uma função quando um arquivo é carregado no Storage

``` javascript
exports.newFile = functions.storage
    .object()
    .onFinalize((object) => {
      const filePath = object.name;

      console.log('Novo arquivo carregado:', filePath);

      // Sua lógica aqui
    });
```

Esta função será acionada sempre que um novo arquivo for carregado no Storage.

Conclusão
---------

Cloud Firestore e Cloud Storage são dois serviços poderosos do Firebase que permitem gerenciar dados e arquivos de maneira eficiente e flexível. Ao combinar esses serviços com Firebase Cloud Functions, você pode automatizar tarefas e reagir a eventos de maneira muito eficiente.

Com este guia, você deve ser capaz de criar, recuperar, modificar e deletar documentos no Firestore, gerenciar arquivos no Storage e criar funções que reagem a eventos nesses serviços. Esses recursos oferecem uma base sólida para a criação de aplicações web e móveis ricas em recursos.
