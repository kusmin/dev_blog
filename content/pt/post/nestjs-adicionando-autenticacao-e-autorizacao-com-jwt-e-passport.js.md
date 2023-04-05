---
_template: default
---


+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["nestjs"]
date = 2023-03-28T03:00:00Z
math = false
redirectUrl = ""
series = ["nesjts"]
tags = ["typescript", "nestjs"]
thumbnail = "/uploads/captura-de-tela-de-2023-03-28-22-12-03.png"
title = "NestJS: Adicionando Autenticação e Autorização com JWT e Passport.js"

+++
## Introdução 

No artigo anterior, criamos uma aplicação NestJS com Prisma, Docker e PostgreSQL, implementando um CRUD de usuários. Neste tutorial, vamos adicionar autenticação e autorização usando JWT (JSON Web Tokens) e Passport.js. Isso garantirá que apenas usuários autorizados possam acessar e manipular recursos em nossa aplicação.

Pré-requisitos Para seguir este tutorial, é necessário ter:

* Um projeto NestJS com CRUD de usuários (conforme descrito no artigo anterior)
* Conhecimento básico de JWT e Passport.js

Passo 1: Instalando as dependências necessárias Primeiro, instale as dependências necessárias:

    yarn add @nestjs/passport @nestjs/jwt passport passport-jwt jsonwebtoken

Passo 2: Configurando o módulo JWT Crie um arquivo chamado **`jwt.module.ts`** na pasta **`src/auth`**:

    { Module } from '@nestjs/common';
    import { JwtModule } from '@nestjs/jwt';
    import { jwtConstants } from './constants';
    
    @Module({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60m' },
        }),
      ],
      exports: [JwtModule],
    })
    export class JwtConfigModule {}
    

Crie um arquivo chamado **`constants.ts`** na pasta **`src/auth`**:

    const jwtConstants = {
      secret: 'mySecretKey',
    };
    

Passo 3: Implementando a estratégia JWT Crie um arquivo chamado **`jwt.strategy.ts`** na pasta **`src/auth`**:

    { Injectable } from '@nestjs/common';
    import { PassportStrategy } from '@nestjs/passport';
    import { ExtractJwt, Strategy } from 'passport-jwt';
    import { jwtConstants } from './constants';
    
    @Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy) {
      constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: jwtConstants.secret,
        });
      }
    
      async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
      }
    }
    

Passo 4: Implementando o módulo de autenticação Crie um arquivo chamado **`auth.module.ts`** na pasta **`src/auth`**:

    { Module } from '@nestjs/common';
    import { UsersModule } from '../users/users.module';
    import { AuthService } from './auth.service';
    import { JwtStrategy } from './jwt.strategy';
    import { JwtConfigModule } from './jwt.module';
    
    @Module({
      imports: [UsersModule, JwtConfigModule],
      providers: [AuthService, JwtStrategy],
      exports: [AuthService],
    })
    export class AuthModule {}
    

Passo 5: Implementando o AuthService Crie um novo arquivo chamado **`auth.service.ts`** na pasta **`src/auth`** e adicione o seguinte conteúdo:

    typescriptCopy codeimport { Injectable } from '@nestjs/common';
    import { UsersService } from '../users/users.service';
    import { JwtService } from '@nestjs/jwt';
    
    @Injectable()
    export class AuthService {
      constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
      ) {}
    
      async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && user.password === password) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    

Passo 6: Adicionando rotas de login e registro No arquivo **`users.controller.ts`**, adicione os seguintes métodos:

    typescriptCopy codeimport { AuthService } from '../auth/auth.service';
    
    // Adicione o AuthService no construtor
    constructor(private readonly usersService: UsersService, private authService: AuthService) {}
    
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
      const user = await this.usersService.create(createUserDto);
      const { password, ...result } = user;
      return result;
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
    

Não se esqueça de importar **`LocalAuthGuard`**, **`UseGuards`**, e **`Request`**:

    typescriptCopy codeimport { LocalAuthGuard } from '../auth/local-auth.guard';
    import { UseGuards } from '@nestjs/common';
    import { Request } from 'express';
    

Passo 7: Protegendo rotas com o AuthGuard do Passport No arquivo **`users.controller.ts`**, adicione o seguinte código antes dos métodos que você deseja proteger:

    typescriptCopy code@UseGuards(JwtAuthGuard)
    

Não se esqueça de importar **`JwtAuthGuard`**:

    typescriptCopy codeimport { JwtAuthGuard } from '../auth/jwt-auth.guard';
    

Agora, suas rotas estarão protegidas e só poderão ser acessadas por usuários autenticados com um token JWT válido.

Conclusão Neste tutorial, você adicionou autenticação e autorização à sua aplicação NestJS usando JWT e Passport.js. Agora, apenas usuários autenticados podem acessar e manipular recursos na sua aplicação. Você pode aprimorar ainda mais sua aplicação adicionando mais recursos e funcionalidades, como recuperação de senha, confirmação de e-mail, e permissões baseadas em funções.

Referências adicionais:

* Documentação oficial do NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* Documentação oficial do Passport.js: [**http://www.passportjs.org/docs/**](http://www.passportjs.org/docs/ "http://www.passportjs.org/docs/")
* Documentação oficial do JWT: [**https://jwt.io/introduction**](https://jwt.io/introduction "https://jwt.io/introduction")
