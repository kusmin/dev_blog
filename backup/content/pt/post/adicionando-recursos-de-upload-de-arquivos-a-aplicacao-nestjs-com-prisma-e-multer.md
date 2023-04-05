+++
aliases = ["nestjs"]
author = "Renan Ribeiro Lage"
categories = []
date = 2023-04-01T03:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["nestjs"]
thumbnail = ""
title = "Adicionando Recursos de Upload de Arquivos à Aplicação NestJS com Prisma e Multer"

+++
## Introdução

Neste artigo, vamos adicionar recursos de upload de arquivos à nossa aplicação NestJS com Prisma e PostgreSQL. Utilizaremos a biblioteca Multer para lidar com o upload de arquivos e armazenar os arquivos no sistema local. Mais adiante, você pode explorar o armazenamento em nuvem, como o AWS S3 ou o Google Cloud Storage, para armazenar os arquivos carregados.

### Pré-requisitos

Para seguir este tutorial, você precisará:

1. Ter uma aplicação NestJS existente com Prisma e PostgreSQL (consulte nossos artigos anteriores)
2. Conhecimento básico de upload de arquivos e manipulação
3. Node.js instalado (v14+)
4. Yarn ou NPM (gerenciadores de pacotes)

Instalando e configurando o Multer

Primeiro, instale o pacote Multer e seus tipos:

    yarn add multer
    yarn add --dev @types/multer
    

Crie um módulo chamado **`file-upload`**:

    nest generate module file-upload
    

Crie um arquivo **`multer.config.ts`** na pasta **`src/file-upload`** para configurar o Multer:

    typescriptCopy codeimport { MulterModuleOptions } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
    import { extname, join } from 'path';
    
    export const multerConfig: MulterModuleOptions = {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => (Math.round(Math.random() * 16)).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    };
    

Aqui, configuramos o Multer para armazenar os arquivos carregados na pasta **`uploads`** e gerar um nome de arquivo aleatório com a mesma extensão do arquivo original.

Importe e aplique a configuração do Multer no módulo **`file-upload`**:

    typescriptCopy codeimport { Module } from '@nestjs/common';
    import { MulterModule } from '@nestjs/platform-express';
    import { multerConfig } from './multer.config';
    
    @Module({
      imports: [MulterModule.register(multerConfig)],
      exports: [MulterModule],
    })
    export class FileUploadModule {}
    

Agora, importe o módulo **`FileUploadModule`** no **`AppModule`**:

    typescriptCopy codeimport { Module } from '@nestjs/common';
    import { FileUploadModule } from './file-upload/file-upload.module';
    
    @Module({
      imports: [FileUploadModule],
    })
    export class AppModule {}
    

Criando um endpoint para upload de arquivos

Gere um controlador na pasta **`file-upload`**:

    bashCopy codenest generate controller file-upload
    

Edite o controlador gerado e adicione um novo endpoint para lidar com o upload de arquivos:

    import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
    import { FileInterceptor } from '@nestjs/platform-express';
    
    @Controller('file-upload')
    export class FileUploadController {
      @Post()
      @UseInterceptors(FileInterceptor('file'))
      async uploadFile(@UploadedFile()
      file: Express.Multer.File) {
    	return {
          url: http://localhost:3000/uploads/${file.filename},
          originalName: file.originalname,
          filename: file.filename,
          size: file.size,
          };
      	}
     }

Neste controlador, definimos um endpoint de POST \`/file-upload\` e utilizamos o \`FileInterceptor\` para lidar com o upload de arquivos. O \`FileInterceptor\` recebe o campo 'file' do formulário como parâmetro, que é o nome do campo no qual o arquivo será enviado. O objeto \`file\` retornado pelo \`UploadedFile\` contém informações sobre o arquivo carregado.

### 

Servindo arquivos estáticos



Agora, vamos configurar nossa aplicação NestJS para servir os arquivos estáticos na pasta \`uploads\`. Atualize o arquivo \`main.ts\`:

    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { join } from 'path';
    
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
    
      app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads',
      });
    
      await app.listen(3000);
    }
    
    bootstrap();

Aqui, utilizamos o método **`useStaticAssets`** para servir os arquivos na pasta **`uploads`** com o prefixo **`/uploads`**.

Testando o upload de arquivos

Inicie o servidor NestJS:

    yarn start
    

Acesse a aplicação em [**http://localhost:3000/file-upload**](http://localhost:3000/file-upload) e teste o upload de arquivos usando uma ferramenta como o Postman ou o Insomnia.

### Conclusão

Parabéns! Você acabou de adicionar recursos de upload de arquivos à sua aplicação NestJS com Prisma, Multer e armazenamento local. A partir daqui, você pode explorar outras opções de armazenamento, como o AWS S3 ou o Google Cloud Storage, para armazenar os arquivos carregados.

Algumas sugestões para melhorar ainda mais sua aplicação:

* Adicionar validação de tipos e tamanhos de arquivos
* Implementar o processamento de imagens (por exemplo, redimensionamento, compressão)
* Integrar o upload de arquivos com os recursos existentes (por exemplo, vincular arquivos a usuários ou posts)

Lembre-se de sempre consultar a documentação oficial de cada tecnologia para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* Prisma: [**https://www.prisma.io/docs/**](https://www.prisma.io/docs/ "https://www.prisma.io/docs/")
* Multer: [**https://github.com/expressjs/multer**](https://github.com/expressjs/multer "https://github.com/expressjs/multer")
* AWS S3: [**https://aws.amazon.com/s3/**](https://aws.amazon.com/s3/ "https://aws.amazon.com/s3/")
* Google Cloud Storage: [**https://cloud.google.com/storage/**](https://cloud.google.com/storage/ "https://cloud.google.com/storage/")

Esperamos que este tutorial tenha sido útil para você e que você esteja animado para explorar mais o mundo do desenvolvimento de aplicações web modernas!