+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["javascript", "nestjs"]
date = 2023-03-27T03:00:00Z
math = false
redirectUrl = ""
series = ["javascript"]
tags = ["prisma", "docker ", "javascript", "nestjs"]
thumbnail = "/uploads/nest.png"
title = "Criando uma Aplicação NestJS com Prisma, Docker e PostgreSQL: Um CRUD de Usuários"

+++

## Introdução

Neste artigo, vamos explorar como criar uma aplicação NestJS, utilizando o Prisma como ORM (Object-Relational Mapping), o Docker para o ambiente de desenvolvimento e o PostgreSQL como banco de dados. O foco será no desenvolvimento de um CRUD (Create, Read, Update, Delete) para gerenciar usuários. Vamos começar!

1. Pré-requisitos

Para seguir este tutorial, você precisará:

* Node.js instalado (v14+)
* Docker e Docker Compose instalados
* Yarn ou NPM (gerenciadores de pacotes)

1. Configurando o ambiente

Primeiro, crie um novo projeto NestJS utilizando o CLI:

    npm i -g @nestjs/cli
    nest new my-nestjs-prisma-app

Entre na pasta do projeto:

    cd my-nestjs-prisma-app

1. Configurando o Docker e o PostgreSQL

Crie um arquivo chamado **`docker-compose.yml`** na raiz do projeto com o seguinte conteúdo:

    version: '3.8'
    services:
      db:
        image: postgres:13
        environment:
          POSTGRES_USER: myuser
          POSTGRES_PASSWORD: mypassword
          POSTGRES_DB: mydb
        ports:
          - '5432:5432'
        volumes:
          - db-data:/var/lib/postgresql/data
    
    volumes:
      db-data:

Inicie o container do PostgreSQL:

    docker-compose up -d

1. Integrando o Prisma

Instale o Prisma CLI e o pacote do Prisma Client:

    yarn add @prisma/client
    yarn add --dev @prisma/cli

Inicie o Prisma:

     yarn prisma init

Edite o arquivo **`prisma/schema.prisma`**:

* Atualize o bloco **`datasource`** com os detalhes do banco de dados PostgreSQL:

      codedatasource db {
      provider = "postgresql"
      url      = "postgresql://myuser:mypassword@localhost:5432/mydb"
      }
* Defina o modelo **`User`**:

      prismaCopy codemodel User {
      id        Int      @id @default(autoincrement())
      name      String
      email     String   @unique
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
      }

Gere o Prisma Client:

    yarn prisma generate

1. Implementando o CRUD de Usuários

Agora, vamos criar o módulo, o serviço e o controlador para o gerenciamento de usuários:

    nest generate module users
    nest generate service users
    nest generate controller users

Edite os arquivos gerados conforme necessário, implementando as operações CRUD com o Prisma Client. As principais alterações devem ser feitas no arquivo **`users.service.ts`**.

1. Implementando o CRUD no Controller e Service

Agora, vamos detalhar a implementação do CRUD no **`users.controller.ts`** e **`users.service.ts`**.

Primeiro, crie o arquivo **`users.module.ts`** na pasta **`src/users`**:

    typescriptCopy codeimport { Module } from '@nestjs/common';
    import { UsersService } from './users.service';
    import { UsersController } from './users.controller';
    import { PrismaService } from '../prisma.service';
    
    @Module({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    })
    export class UsersModule {}

Neste arquivo, importamos e configuramos o **`UsersService`**, **`UsersController`** e **`PrismaService`**. O **`PrismaService`** será injetado no **`UsersService`** como uma dependência.

Agora, atualize o arquivo **`src/app.module.ts`** para importar o **`UsersModule`**:

    typescriptCopy codeimport { Module } from '@nestjs/common';
    import { UsersModule } from './users/users.module';
    
    @Module({
      imports: [UsersModule],
    })
    export class AppModule {}

Agora, com esta configuração realizada podemos nos concentrar no service e controller do user.

**`users.service.ts`**:

    typescriptCopy codeimport { Injectable } from '@nestjs/common';
    import { PrismaService } from '../prisma.service';
    import { CreateUserDto, UpdateUserDto } from './dto';
    
    @Injectable()
    export class UsersService {
      constructor(private readonly prisma: PrismaService) {}
    
      async create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
          data: createUserDto,
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
    
      async update(id: number, updateUserDto: UpdateUserDto) {
        return this.prisma.user.update({
          where: { id },
          data: updateUserDto,
        });
      }
    
      async remove(id: number) {
        return this.prisma.user.delete({
          where: { id },
        });
      }
    }

**`users.controller.ts`**:

    typescriptCopy codeimport { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
    import { UsersService } from './users.service';
    import { CreateUserDto, UpdateUserDto } from './dto';
    
    @Controller('users')
    export class UsersController {
      constructor(private readonly usersService: UsersService) {}
    
      @Post()
      create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
      }
    
      @Get()
      findAll() {
        return this.usersService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: number) {
        return this.usersService.findOne(id);
      }
    
      @Put(':id')
      update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
      }
    
      @Delete(':id')
      remove(@Param('id') id: number) {
        return this.usersService.remove(id);
      }
    }

No arquivo **`users.service.ts`**, implementamos os métodos CRUD (create, findAll, findOne, update e remove) usando o Prisma Service. Já no arquivo **`users.controller.ts`**, criamos os endpoints da API para cada operação CRUD, e associamos os métodos do serviço correspondentes.

1. Testando a aplicação

Inicie o servidor NestJS:

     yarn start

Acesse a aplicação em **`http://localhost:3000/users`** e teste as operações CRUD usando uma ferramenta como o Postman ou o Insomnia.

1. Bibliografia

Aqui estão algumas referências úteis para aprofundar seu conhecimento sobre as tecnologias utilizadas neste tutorial:

1. NestJS - A progressive Node.js framework: [**https://nestjs.com/**](https://nestjs.com/ "https://nestjs.com/")
2. Prisma - Next-generation ORM for Node.js and TypeScript: [**https://www.prisma.io/**](https://www.prisma.io/ "https://www.prisma.io/")
3. Docker - Empowering App Development for Developers: [**https://www.docker.com/**](https://www.docker.com/ "https://www.docker.com/")
4. PostgreSQL - The World's Most Advanced Open Source Relational Database: [**https://www.postgresql.org/**](https://www.postgresql.org/ "https://www.postgresql.org/")
5. JWT (JSON Web Tokens): [**https://jwt.io/**](https://jwt.io/ "https://jwt.io/")
6. class-validator - Validation made easy using TypeScript decorators: [**https://github.com/typestack/class-validator**](https://github.com/typestack/class-validator "https://github.com/typestack/class-validator")
7. Postman - API Development Environment: [**https://www.postman.com/**](https://www.postman.com/ "https://www.postman.com/")
8. Insomnia - API Design, Testing & Development: [**https://insomnia.rest/**](https://insomnia.rest/ "https://insomnia.rest/")

### Conclusão

Parabéns! Você acabou de criar uma aplicação NestJS com Prisma, Docker e PostgreSQL, implementando um CRUD de usuários. Essa combinação de tecnologias oferece uma base sólida e escalável para suas futuras aplicações. A partir daqui, você pode explorar mais recursos do NestJS e do Prisma, bem como otimizar seu ambiente de desenvolvimento e produção com o Docker.

Algumas sugestões para melhorar ainda mais sua aplicação:

* Adicionar autenticação e autorização (por exemplo, JWT)
* Implementar validação de dados (usando o pacote **`class-validator`**)
* Criar testes unitários e de integração para garantir a qualidade do código
* Configurar um ambiente de produção com Docker e CI/CD

Lembre-se de sempre consultar a documentação oficial de cada tecnologia para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* Prisma: [**https://www.prisma.io/docs/**](https://www.prisma.io/docs/ "https://www.prisma.io/docs/")
* Docker: [**https://docs.docker.com/**](https://docs.docker.com/ "https://docs.docker.com/")
* PostgreSQL: [**https://www.postgresql.org/docs/**](https://www.postgresql.org/docs/ "https://www.postgresql.org/docs/")

Esperamos que este tutorial tenha sido útil para você e que você esteja animado para explorar mais o mundo do desenvolvimento de aplicações web modernas!