+++
aliases = []
author = "Renan Ribeiro Lage"
categories = []
date = 2023-03-29T03:00:00Z
draft = true
math = false
redirectUrl = ""
series = []
tags = []
thumbnail = ""
title = "Criando um Sistema de Permissões Baseado em Funções (RBAC) no NestJS com Prisma, JWT e Passport"

+++
## Introdução

Neste artigo, você aprenderá a implementar um sistema de permissões baseado em funções (Role-Based Access Control - RBAC) no NestJS usando Prisma, JWT e Passport. Vamos criar uma aplicação que gerencia usuários e suas funções, controlando o acesso a recursos específicos com base nas permissões de cada função. Vamos começar!

## Pré-requisitos

Certifique-se de ter concluído o tutorial anterior, onde criamos uma aplicação NestJS com autenticação e autorização usando Prisma, JWT e Passport. Você precisará desta base para seguir este tutorial.

Passo 1: Definir modelos de função e permissão no Prisma

Primeiro, vamos criar os modelos Role e Permission no arquivo **`prisma/schema.prisma`**. Adicione o seguinte código:

    prismaCopy codemodel Role {
      id          Int          @id @default(autoincrement())
      name        String       @unique
      permissions Permission[]
    }
    
    model Permission {
      id         Int    @id @default(autoincrement())
      name       String @unique
      roles      Role[] @relation(references: [id])
    }
    

Atualize o modelo User para incluir a relação com o modelo Role:

    prismaCopy codemodel User {
      // ...
      role   Role?  @relation(fields: [roleId], references: [id])
      roleId Int?
    }
    

Em seguida, aplique as mudanças no banco de dados executando **`yarn prisma migrate dev`**.

Passo 2: Criar módulos, serviços e controladores para Funções e Permissões

Crie os módulos, serviços e controladores para Role e Permission:

    arduinoCopy codenest generate module roles
    nest generate service roles
    nest generate controller roles
    
    nest generate module permissions
    nest generate service permissions
    nest generate controller permissions
    

Implemente as operações CRUD nos arquivos gerados, como fizemos no tutorial anterior para o módulo de usuários.

Passo 3: Adicionar relacionamentos entre os modelos no Prisma Client

No arquivo **`src/roles/roles.service.ts`**, adicione o seguinte código para incluir as permissões ao buscar uma função:

    typescriptCopy codeasync findOne(id: number) {
      return this.prisma.role.findUnique({
        where: { id },
        include: { permissions: true },
      });
    }
    

No arquivo **`src/users/users.service.ts`**, adicione o seguinte código para incluir a função e as permissões ao buscar um usuário:

    typescriptCopy codeasync findOne(id: number) {
      return this.prisma.user.findUnique({
        where: { id },
        include: { role: { include: { permissions: true } } },
      });
    }
    

Passo 4: Implementar um RBAC Guard

Crie um novo arquivo chamado **`rbac.guard.ts`** na pasta **`src/auth`** e adicione o seguinte conteúdo:

    typescriptCopy codeimport { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
    import { Reflector } from '@nestjs/core';
    
    @Injectable()
    export class RbacGuard implements CanActivate {
      constructor(private readonly reflector: Reflector) {}
    
      canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<string[]>(
          'permissions',
          context.getHandler(),
        );
        if (!requiredPermissions) {
          return true;
        }
    
        const request = context.switchToHttp().getRequest();
        const user = request.user;
    
        const hasPermission = () =>
          user.role.permissions.some((permission) =>
            requiredPermissions.includes(permission.name),
          );
    
        return user && user.role && hasPermission();
      }
    }
    

Passo 5: Adicionar metadados de permissões aos controladores

Agora, vamos adicionar os metadados de permissões aos controladores usando decorators personalizados. Crie um novo arquivo chamado **`permission.decorator.ts`** na pasta **`src/auth`** e adicione o seguinte conteúdo:

    typescriptCopy codeimport { SetMetadata } from '@nestjs/common';
    
    export const PERMISSIONS_KEY = 'permissions';
    export const Permission = (...permissions: string[]) =>
      SetMetadata(PERMISSIONS_KEY, permissions);
    

Passo 6: Proteger as rotas com o RbacGuard

Agora, você pode proteger as rotas em seus controladores usando o **`RbacGuard`** e o decorator **`Permission`**. Por exemplo, no arquivo **`src/users/users.controller.ts`**, você pode fazer o seguinte:

    typescriptCopy codeimport { Permission } from '../auth/permission.decorator';
    import { RbacGuard } from '../auth/rbac.guard';
    
    // ...
    
    @Controller('users')
    @UseGuards(JwtAuthGuard, RbacGuard)
    export class UsersController {
      // ...
    
      @Post()
      @Permission('create:user')
      create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
      }
    
      // ...
    }
    

Aqui, protegemos a rota POST **`/users`** com o **`RbacGuard`**, exigindo a permissão "create:user" para acessá-la.

Repita este processo para todas as rotas que deseja proteger com o RBAC.

Conclusão

Parabéns! Você acabou de criar um sistema de permissões baseado em funções (RBAC) no NestJS com Prisma, JWT e Passport. Agora, sua aplicação pode gerenciar usuários, funções e permissões, controlando o acesso a recursos específicos com base nas permissões atribuídas a cada função.

Você pode continuar melhorando e expandindo sua aplicação, adicionando mais recursos e otimizando seu ambiente de desenvolvimento e produção.

Lembre-se de sempre consultar a documentação oficial de cada tecnologia para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* Prisma: [**https://www.prisma.io/docs/**](https://www.prisma.io/docs/ "https://www.prisma.io/docs/")
* JWT: [**https://jwt.io/**](https://jwt.io/ "https://jwt.io/")
* Passport: [**http://www.passportjs.org/**](http://www.passportjs.org/ "http://www.passportjs.org/")