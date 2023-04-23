---
author: Renan Ribeiro Lage
title: Integrando NestJS com GraphQL e MongoDB
date: '2023-04-23T03:00:00.000Z'
tags:
  - nestjs
series:
  - nestjs
categories:
  - mongodb
  - nestjs
---

### Introdução

Neste artigo, vamos explorar como integrar o NestJS com o GraphQL, uma linguagem de consulta e execução de API, e o MongoDB, um banco de dados NoSQL orientado a documentos. Combinando essas tecnologias, você pode criar APIs flexíveis e escaláveis que podem se adaptar facilmente às necessidades do seu projeto.

### Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em seu computador:

1. Node.js (v14+)
2. Yarn ou NPM (gerenciadores de pacotes)
3. MongoDB local ou remoto

### Passo 1: Criar um novo projeto NestJS

Primeiro, instale o CLI do NestJS e crie um novo projeto:

```powershell
npm i -g @nestjs/cli
nest new my-nestjs-graphql-mongodb-app
```

Entre na pasta do projeto:

```powershell
cd my-nestjs-graphql-mongodb-app
```

### Passo 2: Instalar as dependências do GraphQL e MongoDB

Para integrar o GraphQL e o MongoDB, você precisará instalar alguns pacotes adicionais:

```powershell
yarn add @nestjs/graphql graphql-tools graphql apollo-server-express
yarn add @nestjs/mongoose mongoose
```

### Passo 3: Configurar o GraphQL e o Módulo Mongoose

No arquivo src/app.module.ts, importe o GraphQLModule e o MongooseModule. Configure o MongooseModule para se conectar ao seu banco de dados MongoDB e o GraphQLModule para usar o schema do GraphQL.

```typescript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-graphql-mongodb'),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule { }

```

### Passo 4: Criar um esquema GraphQL e um modelo Mongoose

Crie um arquivo chamado src/user.schema.ts para definir o esquema do GraphQL e o modelo do Mongoose para usuários:

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop({ unique: true })
  email: string;

  @Field()
  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

### Passo 5: Criar um módulo, serviço e resolvers para usuários

Crie um módulo, um serviço e resolvers para gerenciar usuários:

```powershell
nest generate module users
nest generate service users
```

Crie um arquivo chamado src/users/users.resolver.ts e implemente os resolvers GraphQL para o gerenciamento de usuários:

```typescript
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}

```

\### Passo 6: Atualizar o módulo de usuários

Atualize o \`src/users/users.module.ts\` para importar o \`UserSchema\`, o \`MongooseModule\`, e os resolvers:

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user.schema';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, UsersResolver],
})
export class UsersModule { }
```

### Passo 7: Atualizar o módulo principal

No arquivo src/app.module.ts, adicione o UsersModule às importações:

```typescript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-graphql-mongodb'),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    UsersModule,
  ],
})
export class AppModule { }
```

### Passo 8: Testar a API GraphQL

Inicie o servidor:

```powershell
yarn start:dev
```

Acesse o GraphQL Playground em http://localhost:3000/graphql e experimente as consultas e mutações:

```graphql
query {
  users {
    _id
    name
    email
    age
  }
}

mutation {
  createUser(createUserInput: { name: "John Doe", email: "john@example.com", age: 30 }) {
    _id
    name
    email
    age
  }
}
```

### Conclusão

Neste artigo, você aprendeu como integrar o NestJS com o GraphQL e o MongoDB para criar APIs flexíveis e escaláveis. Agora você pode expandir ainda mais o projeto, adicionando novos recursos e otimizando a API conforme necessário.
