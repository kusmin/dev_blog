+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["nestjs"]
date = 2023-04-02T03:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["nestjs"]
thumbnail = "/uploads/jest.png"
title = "NestJS com Prisma: Implementando Testes de Unidade e Integração"

+++
Introdução

Neste artigo, vamos explorar como implementar testes de unidade e integração em uma aplicação NestJS usando Prisma. Testar seu aplicativo é essencial para garantir a qualidade e a confiabilidade do seu código. Vamos começar!

Pré-requisitos

Para seguir este tutorial, você precisará:

* Ter uma aplicação NestJS com Prisma configurada (conforme mostrado nos tutoriais anteriores)
* Node.js instalado (v14+)
* Yarn ou NPM (gerenciadores de pacotes)

Configurando o ambiente de teste

Vamos começar instalando as dependências necessárias para os testes:

    yarn add --dev jest @nestjs/testing supertest

Em seguida, atualize o arquivo **`src/test/jest-e2e.json`** para usar o ambiente de teste correto:

    {
      "moduleFileExtensions": ["js", "json", "ts"],
      "rootDir": ".",
      "testRegex": ".e2e-spec.ts$",
      "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
      },
      "coverageDirectory": "../coverage",
      "testEnvironment": "node",
      "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1"
      },
      "globals": {
        "ts-jest": {
          "tsConfig": "tsconfig.spec.json"
        }
      }
    }
    

Implementando testes de unidade

Vamos começar implementando testes de unidade para os serviços e controladores da nossa aplicação. Testes de unidade são responsáveis por testar partes isoladas do código, como funções ou classes individuais.

Para este exemplo, vamos implementar testes de unidade para o serviço **`UsersService`**. Crie um arquivo chamado **`users.service.spec.ts`** na pasta **`src/users`**:

    import { Test, TestingModule } from '@nestjs/testing';
    import { UsersService } from './users.service';
    import { PrismaService } from '../prisma.service';
    
    describe('UsersService', () => {
      let service: UsersService;
    
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [UsersService, PrismaService],
        }).compile();
    
        service = module.get<UsersService>(UsersService);
      });
    
      it('should be defined', () => {
        expect(service).toBeDefined();
      });
    
      // Adicione seus testes de unidade aqui
    });
    

Neste arquivo, configuramos um ambiente de teste usando o **`TestingModule`** e injetamos as dependências necessárias (**`UsersService`** e **`PrismaService`**). Em seguida, escrevemos um teste simples para verificar se o serviço está definido.

Agora você pode adicionar testes de unidade para os diferentes métodos do **`UsersService`**, como **`create`**, **`findAll`**, **`findOne`**, **`update`** e **`remove`**.

Implementando testes de integração

Testes de integração são responsáveis por verificar se diferentes partes do seu aplicativo funcionam corretamente juntas. Neste exemplo, vamos implementar testes de integração para os endpoints da API do controlador **`UsersController`**.

Crie um arquivo chamado **`users.e2e-spec.ts`** na pasta **`src/users`**:

    import { Test, TestingModule } from '@nestjs/testing';
    import { INestApplication } from '@nestjs/common';
    import * as request from 'supertest';
    import { UsersModule } from './users.module';
    
    describe('UsersController (e2e)', () => {
      let app: INestApplication;
    
      beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [UsersModule],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();
      });
    
      it('/users (GET)', () => {
        return request(app.getHttpServer())
          .get('/users')
          .expect(200)
          .expect('Content-Type', /json/);
      });
    
      // Adicione seus testes de integração aqui
    });
    
    

Neste arquivo, configuramos um ambiente de teste usando o **`TestingModule`** e importamos o **`UsersModule`**. Em seguida, criamos um aplicativo NestJS para testar os endpoints da API.

Escrevemos um teste de integração simples para verificar se o endpoint GET **`/users`** retorna um status 200 e um objeto JSON.

Agora você pode adicionar testes de integração para os diferentes endpoints da API, como POST **`/users`**, GET **`/users/:id`**, PUT **`/users/:id`**, e DELETE **`/users/:id`**.

Executando os testes

Para executar os testes, use o seguinte comando:

    bashCopy codeyarn test
    

Este comando executará todos os testes de unidade e integração no seu projeto.

Conclusão

Parabéns! Você acabou de aprender como implementar testes de unidade e integração em uma aplicação NestJS com Prisma. Testar seu aplicativo é fundamental para garantir a qualidade e a confiabilidade do seu código.

Algumas sugestões para melhorar ainda mais sua aplicação:

* Adicionar mais testes para outros módulos e serviços
* Configurar um ambiente de CI/CD para executar testes automaticamente
* Integrar ferramentas de análise de código e cobertura de testes

Lembre-se de sempre consultar a documentação oficial de cada tecnologia para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* Prisma: [**https://www.prisma.io/docs/**](https://www.prisma.io/docs/ "https://www.prisma.io/docs/")
* Jest: [**https://jestjs.io/docs/getting-started**](https://jestjs.io/docs/getting-started "https://jestjs.io/docs/getting-started")

Esperamos que este tutorial tenha sido útil para você e que você esteja animado para explorar mais o mundo do desenvolvimento de aplicações web modernas!