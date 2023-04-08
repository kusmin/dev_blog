+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["nestjs"]
date = 2023-04-11T03:00:00Z
math = false
redirectUrl = ""
series = ["nestjs"]
tags = ["grpc", "microsserviços", "nestjs"]
thumbnail = ""
title = "NestJS e Microsserviços: Implementando Comunicação Entre Serviços com gRPC"

+++
### Introdução 

Neste artigo, exploraremos como implementar a comunicação entre microsserviços usando o NestJS e o gRPC, um framework RPC (Remote Procedure Call) de alto desempenho desenvolvido pelo Google. A adoção de microsserviços permite que as equipes de desenvolvimento trabalhem em partes separadas e independentes de um sistema, aumentando a escalabilidade e a manutenção.

### Pré-requisitos 

Para seguir este tutorial, você precisará:

* Conhecimento básico de NestJS
* Node.js instalado (v14+)
* Yarn ou NPM (gerenciadores de pacotes)

Configurando o ambiente Primeiro, crie um novo projeto NestJS utilizando o CLI:

    npm i -g @nestjs/cli
    nest new my-nestjs-grpc-app
    

Entre na pasta do projeto:

    cd my-nestjs-grpc-app
    

Instalando e configurando o gRPC Para instalar o gRPC, execute o seguinte comando:

    yarn add grpc @grpc/proto-loader @nestjs/microservices
    

Crie uma pasta chamada "proto" na raiz do projeto e adicione um arquivo chamado "myapp.proto" com o seguinte conteúdo:

    syntax = "proto3";
    package myapp;
    
    service MyApp {
      rpc FindOne (FindOneRequest) returns (UserResponse) {}
    }
    
    message FindOneRequest {
      int32 id = 1;
    }
    
    message UserResponse {
      int32 id = 1;
      string name = 2;
      string email = 3;
    }
    

Neste arquivo, definimos um serviço "MyApp" com um método "FindOne", que recebe uma solicitação "FindOneRequest" e retorna uma resposta "UserResponse".

Integrando o gRPC no AppModule Agora, atualize o arquivo "src/app.module.ts" para configurar o gRPC:

    import { Module } from '@nestjs/common';
    import { ClientsModule, Transport } from '@nestjs/microservices';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    
    @Module({
      imports: [
        ClientsModule.register([
          {
            name: 'MYAPP_PACKAGE',
            transport: Transport.GRPC,
            options: {
              url: 'localhost:5000',
              package: 'myapp',
              protoPath: join(__dirname, '../proto/myapp.proto'),
            },
          },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
    

No AppModule, configuramos o gRPC, especificando o URL, o nome do pacote e o caminho do arquivo proto.

Criando o gRPC Service Crie um novo serviço chamado "GrpcService" utilizando o CLI:

    Copy codenest generate service grpc
    

Atualize o arquivo "src/grpc.service.ts" com o seguinte conteúdo:

    import { Injectable } from '@nestjs/common';
    import { RpcException } from '@nestjs/microservices';
    import { UserResponse } from './interfaces/user-response.interface';
    
    @Injectable()
    export class GrpcService {
      private readonly users: UserResponse[] = [
        { id: 1, name: 'User 1', email: 'user1@email.com' },
        { id: 2, name: 'User 2', email: 'user2@email.com' },
      	{ id: 3, name: 'User 3', email: 'user3@email.com' },
      ];
    
    async findOne(id: number): Promise<UserResponse> {
      const user = this.users.find((u) => u.id === id);
      if (!user) {
      		throw new RpcException('User not found');
      }
      return user;
      }
    }

Neste arquivo, criamos um serviço simulado com uma lista de usuários e um método "findOne" para buscar um usuário por ID. Implementando o gRPC Controller Crie um novo controlador chamado "GrpcController" utilizando o CLI:

    nest generate controller grpc

Atualize o arquivo "src/grpc.controller.ts" com o seguinte conteúdo:

    import { Controller, UseInterceptors } from '@nestjs/common';
    import { MessagePattern } from '@nestjs/microservices';
    import { GrpcService } from './grpc.service';
    import { FindOneRequest } from './interfaces/find-one-request.interface';
    import { UserResponse } from './interfaces/user-response.interface';
    
    @Controller()
    export class GrpcController {
      constructor(private readonly grpcService: GrpcService) {}
    
      @MessagePattern({ service: 'MyApp', cmd: 'FindOne' })
      async findOne(data: FindOneRequest): Promise<UserResponse> {
        return this.grpcService.findOne(data.id);
      }
    }

No GrpcController, utilizamos o decorador **`@MessagePattern`** para mapear o método "findOne" do serviço gRPC.

Testando a aplicação Inicie o servidor NestJS:

    yarn start

Para testar a comunicação entre os serviços gRPC, você pode usar uma ferramenta como o [**BloomRPC**](https://github.com/uw-labs/bloomrpc) ou [**gRPCurl**](https://github.com/fullstorydev/grpcurl).

### Conclusão 

Parabéns! Você acabou de criar uma aplicação NestJS que implementa a comunicação entre microsserviços usando o gRPC. Essa abordagem permite a criação de sistemas distribuídos e escaláveis, facilitando o gerenciamento de serviços independentes em um ambiente de desenvolvimento em equipe.

A partir daqui, você pode continuar explorando os recursos do NestJS e do gRPC, bem como trabalhar na otimização do seu ambiente de desenvolvimento e produção.

Algumas sugestões para melhorar ainda mais sua aplicação:

* Implementar autenticação e autorização para proteger a comunicação entre microsserviços
* Adicionar monitoramento e rastreamento distribuído para melhorar a visibilidade do sistema
* Implementar estratégias de tolerância a falhas, como circuit breakers e retries
* Configurar um ambiente de produção com Docker e CI/CD

Lembre-se de sempre consultar a documentação oficial de cada tecnologia para obter informações atualizadas e aprender mais sobre as melhores práticas:

* NestJS: [**https://docs.nestjs.com/**](https://docs.nestjs.com/ "https://docs.nestjs.com/")
* gRPC: [**https://grpc.io/docs/**](https://grpc.io/docs/ "https://grpc.io/docs/")
* Docker: [**https://docs.docker.com/**](https://docs.docker.com/ "https://docs.docker.com/")

Esperamos que este tutorial tenha sido útil para você e que você esteja animado para explorar mais o mundo do desenvolvimento de aplicações web modernas!
