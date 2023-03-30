+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["nestjs"]
date = 2023-04-06T03:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["nestjs"]
thumbnail = ""
title = "Introdução ao NestJS Middleware e Interceptors: Melhorando o Fluxo das Requisições"

+++
### Introdução

Neste tutorial, exploraremos os conceitos de middleware e interceptors no NestJS e como eles podem ser utilizados para melhorar o fluxo das requisições na sua aplicação. Vamos aprender a implementar e configurar middlewares e interceptors para executar tarefas comuns, como registro de logs, tratamento de erros e manipulação de respostas.

### Pré-requisitos

Para seguir este tutorial, é recomendável que você já tenha conhecimento básico sobre o NestJS e tenha uma aplicação NestJS existente para trabalhar. Se você ainda não possui uma aplicação NestJS, confira nosso tutorial sobre como criar uma aplicação NestJS básica.

### Conceitos

1. Middleware: Middlewares são funções que têm acesso aos objetos de requisição e resposta e ao próximo middleware na pilha de processamento de requisições. Eles são comumente usados para executar tarefas como registro de logs, autenticação e validação de requisições antes de chegarem aos controladores.
2. Interceptor: Interceptors são classes que podem ser utilizadas para interceptar e manipular requisições e respostas. Eles podem ser usados para executar tarefas como transformar o resultado de um método ou adicionar informações extras à resposta, como tempo de execução.

Implementando um Middleware

Neste exemplo, vamos criar um middleware simples para registrar informações de cada requisição.

1. Crie um arquivo chamado **`logger.middleware.ts`** na pasta **`src/middleware`**:

   import { Injectable, NestMiddleware } from '@nestjs/common';
   import { Request, Response, NextFunction } from 'express';

   @Injectable()
   export class LoggerMiddleware implements NestMiddleware {
   use(req: Request, res: Response, next: NextFunction) {
   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
   next();
   }
   }
2. Adicione o middleware ao seu módulo principal (**`app.module.ts`**):

   import { Module, MiddlewareConsumer } from '@nestjs/common';
   import { LoggerMiddleware } from './middleware/logger.middleware';

   @Module({
   // ...
   })
   export class AppModule {
   configure(consumer: MiddlewareConsumer) {
   consumer
   .apply(LoggerMiddleware)
   .forRoutes('*');
   }
   }

Agora, quando você fizer uma requisição para sua aplicação, verá as informações da requisição sendo registradas no console.

Implementando um Interceptor

Neste exemplo, vamos criar um interceptor para adicionar o tempo de execução à resposta.

1. Crie um arquivo chamado **`timing.interceptor.ts`** na pasta **`src/interceptors`**:

       import {
       CallHandler,
       ExecutionContext,
       Injectable,
       NestInterceptor,
       } from '@nestjs/common';
       import { Observable } from 'rxjs';
       import { tap } from 'rxjs/operators';

       @Injectable()
       export class TimingInterceptor implements NestInterceptor {
       intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
       const startTime = Date.now();
       return next
       .handle()
       .pipe(
       tap(() => console.log(Execution time: ${Date.now() - startTime}ms)),
       );
       }
       }
2. Adicione o interceptor ao seu módulo principal (**`app.module.ts`**):

       import { APP_INTERCEPTOR } from '@nestjs/core';
       import { TimingInterceptor } from './interceptors/timing.interceptor';

       @Module({
       // ...
       providers: [
       {
       provide: APP_INTERCEPTOR,
       useClass: TimingInterceptor,
       },
       ],
       })
       export class AppModule {}

Agora, quando você fizer uma requisição para sua aplicação, verá o tempo de execução sendo registrado no console.

### Conclusão

Neste tutorial, aprendemos sobre middlewares e interceptors no NestJS e como implementá-los para melhorar o fluxo das requisições na sua aplicação. Eles são ferramentas poderosas para adicionar funcionalidades extras, como registro de logs, tratamento de erros e manipulação de respostas.

Você pode continuar explorando os recursos do NestJS e aprimorar ainda mais sua aplicação. Algumas sugestões são:

* Implementar um interceptor global para tratar erros e normalizar as respostas da API
* Criar middlewares para validar o corpo das requisições e evitar dados incorretos
* Utilizar interceptors para transformar a resposta de um método, como converter entidades do banco de dados em DTOs

Lembre-se de sempre consultar a documentação oficial do NestJS para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* NestJS Middleware: [**https://docs.nestjs.com/middleware**](https://docs.nestjs.com/middleware "https://docs.nestjs.com/middleware")
* NestJS Interceptors: [**https://docs.nestjs.com/interceptors**](https://docs.nestjs.com/interceptors "https://docs.nestjs.com/interceptors")