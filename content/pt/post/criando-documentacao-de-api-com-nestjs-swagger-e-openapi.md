+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["nestjs"]
date = 2023-03-31T08:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["nestjs"]
thumbnail = ""
title = "Criando Documentação de API com NestJS, Swagger e OpenAPI"

+++
### Introdução

Neste artigo, aprenderemos como criar documentação de API para sua aplicação NestJS utilizando o Swagger e o OpenAPI. A documentação é crucial para garantir que os desenvolvedores compreendam e usem corretamente sua API, e o Swagger torna esse processo mais fácil e eficiente.

### Pré-requisitos

Para seguir este tutorial, você precisará:

* Ter um projeto NestJS existente ou seguir nosso tutorial anterior sobre a criação de uma aplicação NestJS
* Conhecimento básico de TypeScript e NestJS

Integrando Swagger e OpenAPI ao projeto NestJS

1. Instale os pacotes necessários:

    npm install --save @nestjs/swagger swagger-ui-express
    

2. Abra o arquivo **`main.ts`** e adicione o seguinte código:

    import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
    
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
    
      const config = new DocumentBuilder()
        .setTitle('My API')
        .setDescription('My API description')
        .setVersion('1.0')
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api-docs', app, document);
    
      await app.listen(3000);
    }
    bootstrap();
    

3. Inicie sua aplicação NestJS:

    npm run start
    

4. Acesse **`http://localhost:3000/api-docs`** para ver a documentação da sua API gerada pelo Swagger.

Adicionando anotações Swagger aos controladores e modelos

Para melhorar a documentação gerada pelo Swagger, você pode adicionar anotações em seus controladores e modelos.

1. No controlador de usuários, importe os decorators do Swagger e adicione-os aos métodos do controlador:

    import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
    
    @ApiTags('users')
    @Controller('users')
    export class UsersController {
      // ...
    
      @ApiOperation({ summary: 'Create a new user' })
      @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
      @ApiResponse({ status: 400, description: 'Bad Request.' })
      @Post()
      create(@Body() createUserDto: CreateUserDto) {
        // ...
      }
    
      // ...
    }
    

2. No modelo User, importe os decorators do Swagger e adicione-os aos campos do modelo:

    import { ApiProperty } from '@nestjs/swagger';
    
    export class User {
      @ApiProperty({ example: 1, description: 'The unique identifier of the user.' })
      id: number;
    
      @ApiProperty({ example: 'John Doe', description: 'The name of the user.' })
      name: string;
    
      // ...
    }
    

3. Reinicie sua aplicação e verifique a documentação atualizada em **`http://localhost:3000/api-docs`**.

### Conclusão

Neste tutorial, aprendemos como criar uma documentação de API usando NestJS, Swagger e OpenAPI. A documentação é uma parte importante do desenvolvimento de APIs, pois facilita a compreensão e o uso correto da API pelos desenvolvedores.

Agora que você sabe como criar documentação com Swagger e OpenAPI, pode continuar explorando os recursos do NestJS e aprimorar ainda mais sua aplicação.
