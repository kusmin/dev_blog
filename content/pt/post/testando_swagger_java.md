---
author: Renan Ribeiro Lage
title: 'Profundizando no Swagger: Adicionando Autenticação e Testando Endpoints'
date: '2023-07-20T03:00:00.000Z'
series:
  - spring
---

Depois de ter configurado o Swagger em sua aplicação Spring Boot, como vimos no último artigo, você pode querer saber como fazer mais com esta ferramenta. Neste tutorial, mostraremos como você pode adicionar autenticação JWT em sua documentação Swagger e como testar endpoints diretamente no Swagger UI.

## Autenticação JWT no Swagger

Se sua aplicação usa JWT para autenticação, você provavelmente vai querer que o Swagger possa enviar requests autenticados. Para isso, precisamos configurar o esquema de segurança JWT no Swagger.

Na configuração do Swagger no nosso último tutorial, já adicionamos a configuração de segurança JWT:

```java
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";

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
                );
    }
}

```

Agora, para cada rota que requer autenticação, adicione a anotação @SecurityRequirement(name = "bearerAuth") no método do controlador:

```java
@RestController
@RequestMapping("/api/v1/user")
@SecurityRequirement(name = "bearerAuth")  // requer autenticação
public class UsuarioController {
    //...
}
```

Agora, quando você abrir a documentação Swagger no navegador, você verá um botão "Authorize" no canto superior direito. Clique nele para inserir seu token JWT e enviar requests autenticados.

## Testando Endpoints com Swagger UI

Um dos grandes benefícios do Swagger é a capacidade de testar endpoints diretamente da interface do usuário.

Ao abrir a documentação Swagger no navegador, você verá uma lista de todos os endpoints disponíveis em sua aplicação. Cada endpoint tem um botão "Try it out" - clique nele para ativar o modo de teste para esse endpoint.

Agora você pode preencher os parâmetros necessários e clicar em "Execute" para enviar o request. O Swagger irá mostrar o curl command, o URL solicitado, os detalhes do request (como o corpo do request e headers), a resposta (incluindo o corpo, status e headers), e o tempo de resposta.

Isso torna o Swagger uma ferramenta muito útil não apenas para documentação, mas também para teste e depuração de sua API.

## Conclusão

Esperamos que este artigo tenha fornecido uma visão útil sobre como você pode aproveitar ainda mais o Swagger em sua aplicação Spring Boot. Com autenticação JWT e testes de endpoints, o Swagger pode realmente simplificar o desenvolvimento e a depuração de sua API.
