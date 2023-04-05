---
_template: default
---

+++
aliases = []
author = ""
categories = ["nestjs"]
date = 2023-04-06T03:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["nestjs"]
thumbnail = ""
title = "Criando uma API com NestJS, TypeORM e MySQL: Filtragem, Ordenação e Paginação"

+++
### Introdução 

Neste artigo, vamos aprender como criar uma API usando NestJS, TypeORM e MySQL, focando na filtragem, ordenação e paginação de resultados. Esses recursos são importantes para garantir uma melhor experiência do usuário e otimizar a performance da aplicação.

### Pré-requisitos 

Antes de começar, verifique se você possui o seguinte:

* Node.js instalado (v14+)
* MySQL instalado ou uma conta em um serviço de banco de dados MySQL
* Yarn ou NPM (gerenciadores de pacotes)

Configurando o ambiente Primeiro, crie um novo projeto NestJS utilizando o CLI:

    npm i -g @nestjs/cli
    nest new my-nestjs-typeorm-app

Entre na pasta do projeto:

    cd my-nestjs-typeorm-app

Integrando o TypeORM e MySQL Instale as dependências necessárias:

    yarn add @nestjs/typeorm typeorm mysql

Configurando o TypeORM Edite o arquivo **`src/app.module.ts`** para adicionar o TypeORM:

    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    
    @Module({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'yourusername',
          password: 'yourpassword',
          database: 'yourdatabase',
          entities: [],
          synchronize: true,
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
    

Substitua **`yourusername`**, **`yourpassword`** e **`yourdatabase`** pelos valores corretos.

Criando o módulo, serviço e controlador Vamos criar um módulo, serviço e controlador para gerenciar os produtos:

    nest generate module products
    nest generate service products
    nest generate controller products

Criando a entidade Product Crie uma nova pasta chamada **`entities`** dentro de **`src`**, e dentro dela, crie um arquivo chamado **`product.entity.ts`**:

    import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
    
    @Entity()
    export class Product {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column()
      name: string;
    
      @Column()
      description: string;
    
      @Column()
      price: number;
    
      @Column({ default: 0 })
      stock: number;
    }
    

Atualizando o AppModule Adicione a entidade Product às entidades do TypeORM no arquivo **`src/app.module.ts`**:

    import { Product } from './entities/product.entity';
    
    @Module({
      imports: [
        TypeOrmModule.forRoot({
          // ...
          entities: [Product],
          synchronize: true,
        }),
      ],
      // ...
    })
    

Atualizando o ProductsModule No arquivo **`src/products/products.module.ts`**, importe o TypeOrmModule e a entidade Product:

    import { TypeOrmModule } from '@nestjs/typeorm';
    import { Product } from '../entities/product.entity';
    
    @Module({
      imports: [TypeOrmModule.forFeature([Product])],
      controllers: [ProductsController],
      providers: [ProductsService],
    })
    export class ProductsModule {}

Implementando o CRUD de Produtos Agora, vamos implementar as operações CRUD no **`products.service.ts`** e **`products.controller.ts`**.

Atualize o arquivo **`src/products/products.service.ts`**:

    import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { Product } from '../entities/product.entity';
    
    @Injectable()
    export class ProductsService {
      constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
      ) {}
    
      async create(product: Product): Promise<Product> {
        return this.productRepository.save(product);
      }
    
      async findAll(): Promise<Product[]> {
        return this.productRepository.find();
      }
    
      async findOne(id: number): Promise<Product> {
        return this.productRepository.findOne(id);
      }
    
      async update(id: number, product: Product): Promise<void> {
        await this.productRepository.update(id, product);
      }
    
      async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
      }
    }
    

Atualize o arquivo **`src/products/products.controller.ts`**:

    import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
    import { ProductsService } from './products.service';
    import { Product } from '../entities/product.entity';
    
    @Controller('products')
    export class ProductsController {
      constructor(private readonly productsService: ProductsService) {}
    
      @Post()
      create(@Body() product: Product) {
        return this.productsService.create(product);
      }
    
      @Get()
      findAll() {
        return this.productsService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: number) {
        return this.productsService.findOne(id);
      }
    
      @Put(':id')
      update(@Param('id') id: number, @Body() product: Product) {
        return this.productsService.update(id, product);
      }
    
      @Delete(':id')
      remove(@Param('id') id: number) {
        return this.productsService.remove(id);
      }
    }
    

Filtragem, Ordenação e Paginação Agora, vamos implementar a filtragem, ordenação e paginação no método **`findAll`** do **`products.service.ts`**.

Atualize o arquivo **`src/products/products.service.ts`**:

    async findAll(
      filter: string,
      orderBy: string,
      order: 'ASC' | 'DESC',
      page: number,
      limit: number,
    ): Promise<{ products: Product[]; total: number }> {
      const query = this.productRepository.createQueryBuilder('product');
    
      if (filter) {
        query.andWhere('product.name LIKE :filter OR product.description LIKE :filter', {
          filter: `%${filter}%`,
        });
      }
    
      if (orderBy && order) {
        query.orderBy(`product.${orderBy}`, order);
      }
    
      if (page && limit) {
        query.skip((page - 1) * limit).take(limit);
      }
    
      const [products, total] = await query.getManyAndCount();
    
      return { products, total };
    }
    

Atualize o arquivo **`src/products/products.controller.ts`**:

    import { Query } from '@nestjs/common';
    
    // ...
    
    @Get()
    findAll(
      @Query('filter') filter: string,
      @Query('orderBy') orderBy: string,
      @Query('order') order: 'ASC' | 'DESC',
      @Query('page') page: number,
      @Query('limit') limit: number,
    ) {
      return this.productsService.findAll(filter, orderBy, order, page, limit);
    }
    

Testando a aplicação Com tudo pronto, é hora de testar a aplicação.

Inicie o servidor NestJS:

    yarn start

Agora você pode testar a API utilizando uma ferramenta como Postman ou curl. Aqui estão alguns exemplos de como testar a API:

* Criar um produto:

  POST **`http://localhost:3000/products`**

      {
        "name": "Product 1",
        "description": "This is a product.",
        "price": 9.99,
        "stock": 50
      }
      
* Listar todos os produtos:

  GET **`http://localhost:3000/products`**
* Filtrar produtos por nome ou descrição:

  GET **`http://localhost:3000/products?filter=Product`**
* Ordenar produtos por preço:

  GET **`http://localhost:3000/products?orderBy=price&order=DESC`**
* Paginar produtos:

  GET **`http://localhost:3000/products?page=1&limit=10`**
* Obter detalhes de um produto específico:

  GET **`http://localhost:3000/products/1`**
* Atualizar um produto:

  PUT **`http://localhost:3000/products/1`**

      jsonCopy code{
        "name": "Updated Product",
        "description": "This is an updated product.",
        "price": 19.99,
        "stock": 100
      }
      
* Excluir um produto:

  DELETE **`http://localhost:3000/products/1`**

Com isso, você criou uma API básica usando NestJS, TypeORM e MySQL e implementou a filtragem, ordenação e paginação de resultados. Esses recursos são importantes para fornecer uma melhor experiência ao usuário e otimizar o desempenho da aplicação. Continue explorando o NestJS e o TypeORM para expandir suas habilidades e criar APIs mais complexas e eficientes.

### Conclusão

Neste tutorial, criamos uma API de gerenciamento de produtos utilizando NestJS, TypeORM e MySQL, além de implementar recursos avançados, como filtragem, ordenação e paginação. Essas funcionalidades são cruciais para fornecer uma experiência de usuário otimizada e melhorar o desempenho da aplicação.

Algumas sugestões para expandir ainda mais o seu projeto:

1. Adicione autenticação e autorização usando JWT ou outro método de segurança.
2. Implemente testes unitários e de integração para garantir a qualidade do código.
3. Adicione mais recursos e entidades, como categorias e tags, para enriquecer sua API.
4. Implemente um sistema de cache, como Redis, para melhorar o desempenho da aplicação.
5. Utilize um mecanismo de busca mais avançado, como Elasticsearch, para melhorar a pesquisa de produtos.

Ao continuar explorando o NestJS, TypeORM, MySQL e outras tecnologias relacionadas, você poderá criar APIs ainda mais robustas e eficientes, capazes de lidar com as demandas das aplicações modernas.

Lembre-se de sempre consultar a documentação oficial de cada tecnologia para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* TypeORM: [**https://typeorm.io/#/**](https://typeorm.io/#/ "https://typeorm.io/#/")
* MySQL: [**https://dev.mysql.com/doc/**](https://dev.mysql.com/doc/ "https://dev.mysql.com/doc/")

Esperamos que este tutorial tenha sido útil para você e que você esteja entusiasmado para explorar mais o mundo do desenvolvimento de aplicações web modernas!
