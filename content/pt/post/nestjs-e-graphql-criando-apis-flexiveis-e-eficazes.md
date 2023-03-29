+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["nestjs"]
date = 2023-04-05T03:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["nestjs"]
thumbnail = ""
title = "NestJS e GraphQL: Criando APIs Flexíveis e Eficazes"

+++
## Introdução

Neste artigo, vamos explorar como criar uma API flexível e eficaz usando NestJS e GraphQL. O GraphQL é uma linguagem de consulta e um sistema de tempo de execução desenvolvido pelo Facebook, que permite criar APIs mais eficientes e flexíveis em comparação com as APIs REST tradicionais. Vamos começar!

### Pré-requisitos

Para seguir este tutorial, você precisará:

* Node.js instalado (v14+)
* Yarn ou NPM (gerenciadores de pacotes)
* Conhecimento básico de NestJS e GraphQL

Configurando o ambiente

Primeiro, crie um novo projeto NestJS utilizando o CLI:

    npm i -g @nestjs/cli
    nest new my-nestjs-graphql-app

Entre na pasta do projeto:

    cd my-nestjs-graphql-app

Instalando e configurando o GraphQL

Instale os pacotes necessários para trabalhar com GraphQL no NestJS:

    yarn add @nestjs/graphql graphql-tools graphql apollo-server-express

Agora, vamos configurar o GraphQL no arquivo **`src/app.module.ts`**:

    import { Module } from '@nestjs/common';
    import { GraphQLModule } from '@nestjs/graphql';
    
    @Module({
      imports: [
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
        }),
      ],
    })
    export class AppModule {}
    

Aqui, importamos e configuramos o **`GraphQLModule`**. O **`autoSchemaFile`** é usado para gerar automaticamente um esquema GraphQL com base nas definições de tipo em seu aplicativo.

Criando o módulo, serviço e resolvers para gerenciamento de usuários

Vamos criar um módulo, serviço e resolvers para gerenciar usuários. Os resolvers são responsáveis por lidar com as consultas e mutações do GraphQL.

    nest generate module users
    nest generate service users
    nest generate graphql-resolver users

Definindo o modelo e os tipos do GraphQL

Crie um arquivo chamado **`user.model.ts`** na pasta **`src/users`** com o seguinte conteúdo:

    export class User {
      id: number;
      name: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
    }

Agora, crie um arquivo chamado **`user.types.ts`** na pasta **`src/users`** com as definições de tipo do GraphQL:

    import { Field, ObjectType } from '@nestjs/graphql';
    
    @ObjectType()
    export class UserType {
      @Field()
      id: number;
    
      @Field()
      name: string;
    
      @Field()
      email: string;
    
      @Field()
      createdAt: Date;
    
      @Field()
      updatedAt: Date;
    }

Implementando o CRUD de Usuários com GraphQL

Edite os arquivos gerados conforme necessário, implementando as operações CRUD com o Prisma Client. As principais alterações devem ser feitas no arquivo **`users.resolver.ts`** e no arquivo **`users.service.ts`**.

No arquivo **`users.resolver.ts`**, implemente os resolvers para as consultas e mutações do GraphQL:

    import {
      Resolver,
      Query,
      Mutation,
      Args,
      Int,
    } from '@nestjs/graphql';
    import { UsersService } from './users.service';
    import { UserType } from './user.types';
    import {CreateUserInput, UpdateUserInput } from './user.inputs';
    
    @Resolver(of => UserType)
    export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}
    
    @Mutation(returns => UserType)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
    }
    
    @Query(returns => [UserType], { name: 'getAllUsers' })
    async findAll() {
    return this.usersService.findAll();
    }
    
    @Query(returns => UserType, { name: 'getUserById' })
    async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
    }
    
    @Mutation(returns => UserType)
    async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ) {
    return this.usersService.update(id, updateUserInput);
    }
    
    @Mutation(returns => UserType)
    async removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
    }
    }

No arquivo \`users.service.ts\`, implemente os métodos CRUD (create, findAll, findOne, update e remove) usando o Prisma Service: 

    import { Injectable } from '@nestjs/common';
    import { PrismaService } from '../prisma.service';
    import { CreateUserInput, UpdateUserInput } from './user.inputs';
    
    @Injectable()
    export class UsersService {
      constructor(private readonly prisma: PrismaService) {}
    
      async create(createUserInput: CreateUserInput) {
        return this.prisma.user.create({
          data: createUserInput,
        });
      }
    
      async findAll() {
        return this.prisma.user.findMany();
      }
    
      async findOne(id: number) {
        return this.prisma.user.findUnique({
          where: { id },
        });
      }
    
      async update(id: number, updateUserInput: UpdateUserInput) {
        return this.prisma.user.update({
          where: { id },
          data: updateUserInput,
        });
      }
    
      async remove(id: number) {
        return this.prisma.user.delete({
          where: { id },
        });
      }
    }

Testando a aplicação

Inicie o servidor NestJS:

    yarn start
    

Acesse o GraphQL Playground em [**http://localhost:3000/graphql**](http://localhost:3000/graphql) e teste as operações CRUD.

Conclusão

Parabéns! Você acabou de criar uma API flexível e eficaz usando NestJS e GraphQL. A combinação dessas tecnologias fornece uma base sólida e escalável para suas futuras aplicações. A partir daqui, você pode explorar mais recursos do NestJS e GraphQL, bem como otimizar seu ambiente de desenvolvimento e produção.

Algumas sugestões para melhorar ainda mais sua aplicação:

* Adicionar autenticação e autorização (por exemplo, JWT)
* Implementar validação de dados (usando o pacote class-validator)
* Criar testes unitários e de integração para garantir a qualidade do código
* Configurar um ambiente de produção com Docker e CI/CD

Lembre-se de sempre consultar a documentação oficial de cada tecnologia para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* GraphQL: [**https://graphql.org/**](https://graphql.org/ "https://graphql.org/")
* Prisma: [**https://www.prisma.io/docs/**](https://www.prisma.io/docs/ "https://www.prisma.io/docs/")

Esperamos que este tutorial tenha sido útil e informativo. Continue explorando e aprendendo sobre as possibilidades oferecidas pelo NestJS e GraphQL para criar APIs modernas e poderosas para suas aplicações. Com o tempo e a prática, você poderá criar soluções cada vez mais robustas e eficientes para atender às necessidades de seus projetos e de seus clientes.

Lembre-se de acompanhar os lançamentos e atualizações das bibliotecas e ferramentas que você utiliza, pois elas podem trazer novas funcionalidades e melhorias de desempenho que podem impactar diretamente o sucesso de seu projeto.

Outras áreas de interesse que você pode querer explorar incluem:

* Caching e otimização de desempenho (por exemplo, usando Redis)
* Integração com outros serviços e APIs externas
* Monitoramento e análise de desempenho da API (por exemplo, usando Prometheus e Grafana)
* Implementação de recursos em tempo real, como assinaturas GraphQL

Continuar se aprimorando e aprofundando seus conhecimentos em NestJS, GraphQL e outras tecnologias relevantes é fundamental para se manter competitivo no mercado de desenvolvimento de software. Participe de comunidades online, leia blogs e artigos, assista a palestras e webinars e, acima de tudo, pratique e aplique os conceitos aprendidos em seus projetos para aprimorar suas habilidades e conhecimentos.

Boa sorte em sua jornada de aprendizado e desenvolvimento de APIs com NestJS e GraphQL!