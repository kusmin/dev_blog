---
author: Renan Ribeiro Lage
title: Configurando o Swagger no Spring Boot com springdoc-openapi-ui
date: '2023-07-20T03:00:00.000Z'
---

Swagger é uma poderosa ferramenta para documentação e teste de APIs REST. Neste tutorial, vamos configurar o Swagger no Spring Boot usando o springdoc-openapi-ui, um projeto que simplifica a geração de documentação de API OpenAPI 3.0 com Spring Boot.

## Dependências

Adicione a seguinte dependência ao seu arquivo pom.xml se você estiver usando Maven:

```java
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-ui</artifactId>
    <version>1.7.0</version>
</dependency>

```

Ou se você estiver usando Gradle, adicione ao seu build.gradle:

```java
implementation 'org.springdoc:springdoc-openapi-ui:1.7.0'
```

Nota: Verifique a versão mais recente na [página oficial do springdoc-openapi-ui](https://springdoc.org/).

## Configurando o Swagger

Depois de adicionar a dependência, o springdoc-openapi-ui irá gerar automaticamente a documentação da API. No entanto, é uma boa prática personalizar a documentação para refletir as informações corretas sobre o seu serviço.

Crie um arquivo de configuração chamado SwaggerConfig.java no seu pacote de configuração:

```java
package com.exemplo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        final String apiTitle = "Nome da Aplicação";

        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(
                        new Components()
                                .addSecuritySchemes(securitySchemeName,
                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                )
                .info(new Info().title(apiTitle).version("1.0.0")
                        .description("Descrição da Aplicação")
                        .termsOfService("http://swagger.io/terms/")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));
    }
}

```

No código acima, estamos configurando a autenticação JWT para a documentação do Swagger. O token JWT será passado no header de autorização HTTP.

## Adicionando documentação nos controladores

Você pode adicionar mais detalhes sobre cada rota de API em seus controladores usando anotações do Swagger. Vamos ver um exemplo:

```java
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/v1/user")
@SecurityRequirement(name = "bearerAuth")  // referenciando o esquema de segurança
public class UsuarioController {

    @Operation(summary = "Obtém uma lista de todos os usuários",
        responses = {
            @ApiResponse(responseCode = "200", description = "Operação bem-sucedida",
                content = @Content(array = @ArraySchema(schema = @Schema(implementation = UsuarioDTO.class)))),
            @ApiResponse(responseCode = "400", description = "Parâmetros inválidos",
                content = @Content(schema = @Schema(implementation = Erro.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor",
                content = @Content(schema = @Schema(implementation = Erro.class)))
        })
    @GetMapping()
    public ResponseEntity<List<UsuarioDTO>> getAll(
        @RequestParam(name="nome", required=false) String nome,
        @RequestParam(name="email", required=false) String email,
        @RequestParam(name="page", required=false, defaultValue = "0") int page,
        @RequestParam(name="pageSize", required=false, defaultValue = "50") int pageSize) {

        // implementação do método

        return ResponseEntity.ok().body(listaDeUsuarios);
    }
}

```

## Visualizando a documentação

Após a configuração, você pode acessar a documentação da sua API através do caminho /swagger-ui.html no seu aplicativo. Por exemplo, se você estiver rodando localmente na porta 8080, a URL seria http://localhost:8080/swagger-ui.html.

Você verá uma lista de seus endpoints, e para cada um deles, um resumo, os parâmetros esperados, as respostas possíveis e outros detalhes úteis.

Espero que este guia tenha sido útil para você configurar o Swagger no Spring Boot com o springdoc-openapi-ui! Se você tiver dúvidas ou comentários, por favor, sinta-se à vontade para deixá-los abaixo.
