---
author: Renan Ribeiro Lage
title: Conectando o NestJS com AWS S3
date: '2023-04-07T03:00:00.000Z'
tags:
  - s3
  - nestjs
series:
  - nestjs
categories:
  - s3
  - nestjs
---

## Introdução

Neste artigo, mostraremos como conectar sua aplicação NestJS ao serviço de armazenamento simples (S3) da Amazon Web Services (AWS). O AWS S3 é um serviço de armazenamento de objetos escalável, projetado para armazenar e recuperar qualquer quantidade de dados de qualquer lugar. Integrando sua aplicação NestJS com o AWS S3, você pode tirar proveito de sua escalabilidade, segurança e confiabilidade.

## Sumário

1. Configuração do ambiente e instalação de pacotes
2. Configurando o AWS SDK
3. Implementando o serviço de armazenamento
4. Criando um módulo para gerenciar o armazenamento de arquivos
5. Adicionando rotas de upload e download de arquivos
6. Testando a aplicação
7. Conclusão

### 1. Configuração do ambiente e instalação de pacotes

Comece criando um novo projeto NestJS ou use um existente:

```powershell
npm i -g @nestjs/cli
nest new my-nestjs-aws-app
```

Navegue até a pasta do projeto:

```powershell
cd my-nestjs-aws-app
```

Instale o pacote aws-sdk e outros pacotes necessários, como @nestjs/platform-express, multer e multer-s3:

```powershell
npm install aws-sdk @nestjs/platform-express multer multer-s3
```

Configure o ambiente de desenvolvimento, incluindo as variáveis de ambiente para as credenciais da AWS. Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

AWS\_ACCESS\_KEY\_ID=\<YOUR\_AWS\_ACCESS\_KEY\_ID>
AWS\_SECRET\_ACCESS\_KEY=\<YOUR\_AWS\_SECRET\_ACCESS\_KEY>
AWS\_REGION=\<YOUR\_AWS\_REGION>
S3\_BUCKET=\<YOUR\_S3\_BUCKET\_NAME>

### 2. Configurando o AWS SDK

Importe o módulo AWS SDK em seu aplicativo NestJS. Adicione o seguinte código no arquivo src/app.module.ts:

```typescript
typescriptCopy codeimport { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
```

### 3. Implementando o serviço de armazenamento

Crie um serviço para lidar com o armazenamento de arquivos no AWS S3. Crie um arquivo src/storage.service.ts e adicione o seguinte código:

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class StorageService {
  private readonly s3: S3;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });

    this.s3 = new AWS.S3();
    this.bucket = this.configService.get('S3_BUCKET');
  }

  async upload(file: Express.Multer.File): Promise<S3.ManagedUpload.SendData>
  {
    const params: S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    return this.s3.upload(params).promise();
  }

  async download(key: string): Promise<AWS.S3.GetObjectOutput> {
    const params: S3.GetObjectRequest = {
      Bucket: this.bucket,
      Key: key,
    };

    return this.s3.getObject(params).promise();
  }

  async list(): Promise<S3.ListObjectsV2Output> {
    const params: S3.ListObjectsV2Request = {
      Bucket: this.bucket,
    };

    return this.s3.listObjectsV2(params).promise();
  }

  async delete(key: string): Promise<S3.DeleteObjectOutput> {
    const params: S3.DeleteObjectRequest = {
      Bucket: this.bucket,
      Key: key,
    };

    return this.s3.deleteObject(params).promise();
  }
}

```

### 4. Criando um módulo para gerenciar o armazenamento de arquivos

Crie um módulo para gerenciar o armazenamento de arquivos e importe os serviços e módulos necessários. Crie um arquivo src/storage.module.ts e adicione o seguinte código:

```typescript
import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';

@Module({
  providers: [StorageService],
  controllers: [StorageController],
  exports: [StorageService],
})
export class StorageModule { }

```

Adicione a importação do StorageModule no arquivo src/app.module.ts:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

```

### 5. Adicionando rotas de upload e download de arquivos

Implemente um controlador para lidar com as rotas de upload e download de arquivos. Crie um arquivo src/storage.controller.ts e adicione o seguinte código:

```typescript
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

@Controller('files')
export class StorageController {
  constructor(private readonly storageService: StorageService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerS3({
        s3: this.storageService.s3,
        bucket: this.storageService.bucket,
        acl: 'public-read',
        key: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      file,
    };
  }

  @Get()
  async list() {
    const result = await this.storageService.list();
    return result.Contents;
  }

  @Get(':key')
  async download(@Param('key') key: string, @Res() res: Response) {
    try {
      const file = await this.storageService.download(key);
      res.setHeader('Content-Type', file.ContentType);
      res.send(file.Body);
    } catch (error) {
      res.status(404).json({ message: 'File not found' });
    }
  }

  @Delete(':key')
  async delete(@Param('key') key: string) {
    try {
      await this.storageService.delete(key);
      return { message: 'File deleted successfully' };
    } catch (error) {
      return { message: 'Error deleting file', error };
    }
  }
}

```

### 6. Testando a aplicação&#xA;

Inicie sua aplicação NestJS e teste as rotas de upload, download, listagem e exclusão de arquivos:

```powershell
npm run start
```

Use uma ferramenta como Postman ou Insomnia para enviar solicitações HTTP para a API:

* POST /files: para fazer upload de um arquivo
* GET /files: para listar arquivos armazenados no S3
* GET /files/:key: para baixar um arquivo pelo nome do arquivo (key)
* DELETE /files/:key: para excluir um arquivo pelo nome do arquivo (key)

Verifique se os arquivos são armazenados e recuperados corretamente no AWS S3.

### 7. Conclusão

Parabéns! Você acabou de conectar sua aplicação NestJS ao AWS S3, permitindo o armazenamento e gerenciamento de arquivos na nuvem. A integração com o AWS S3 oferece escalabilidade, segurança e confiabilidade para sua aplicação, facilitando o gerenciamento de arquivos e aprimorando a experiência do usuário.

Agora que você conectou sua aplicação ao AWS S3, você pode explorar outros serviços da AWS e aprimorar ainda mais sua aplicação NestJS.
