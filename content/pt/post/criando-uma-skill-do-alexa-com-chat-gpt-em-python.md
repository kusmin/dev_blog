+++
aliases = []
author = "Renan Ribeiro Lage"
categories = ["lambda", "aws", "python", "chatgpt", "alexa"]
date = 2023-04-02T03:00:00Z
math = false
redirectUrl = ""
series = ["alexa"]
tags = ["chatgpt", "alexa"]
thumbnail = ""
title = "Criando uma Skill do Alexa com Chat-GPT em Python"

+++
Neste tutorial, você aprenderá a criar uma skill do Alexa que utiliza o modelo de **`Completion`** da OpenAI para responder às perguntas e interagir com os usuários. Você configurará a API da OpenAI, criará uma skill do Alexa, configurará uma função Lambda e implantará sua skill para os usuários finais.

**Requisitos**

* Conta no [**OpenAI**](https://beta.openai.com/signup/)
* Conta no [**Amazon Developer**](https://developer.amazon.com/)
* Conta no [**AWS Lambda**](https://aws.amazon.com/lambda/)

**Sumário**

1. Configurar a API da OpenAI
2. Criar uma skill do Alexa
3. Configurar a função Lambda
4. Conectar a skill do Alexa à função Lambda
5. Testar sua skill
6. Implantar a skill
7. Promover e monitorar sua skill

Agora, vamos analisar cada etapa com mais detalhes e incluir o código de exemplo.

**1. Configurar a API da OpenAI**

Primeiro, você precisa obter sua chave de API do OpenAI. Faça login em sua conta no [**OpenAI**](https://beta.openai.com/signup/) e copie sua chave de API.

**2. Criar uma skill do Alexa**

No [**Amazon Developer Console**](https://developer.amazon.com/), siga estas etapas para criar uma nova skill do Alexa:

* Clique em "Create Skill" e escolha um nome para sua skill (por exemplo, "ChatGPT").
* Selecione "Custom" como o modelo e "Provision your own" para o método de hospedagem.
* Escolha Python como a linguagem de programação.
* Crie uma intenção chamada "ChatGPTIntent" e adicione um slot chamado "message" do tipo "AMAZON.SearchQuery".

**3. Configurar a função Lambda**

Agora, você criará uma função Lambda no AWS Lambda para hospedar o código da sua skill. Siga estas etapas:

* Faça login na sua conta do [**AWS Lambda**](https://aws.amazon.com/lambda/).
* Crie uma nova função e escolha "Author from scratch".
* Escolha Python como a linguagem de programação e defina uma função chamada "lambda_handler" no arquivo "lambda_function.py".

**Código da função Lambda**

Copie e cole o seguinte código no arquivo "lambda_function.py":

    import logging
    import os
    import re
    
    import openai
    from ask_sdk_core.dispatch_components import AbstractRequestHandler
    from ask_sdk_core.skill_builder import SkillBuilder
    from ask_sdk_core.utils import is_intent_name, is_request_type
    from ask_sdk_model import Response
    from ask_sdk_model.interfaces.display import PlainText, TextContent
    from ask_sdk_model.ui import SimpleCard
    
    # Configurar chave de API do OpenAI
    openai.api_key = os.environ["OPENAI_API_KEY"]
    
    # Função para enviar a mensagem para o ChatGPT
    def get_chat_gpt_response(prompt):
        response = openai.Completion.create(
            engine=os.environ["OPENAI_API_ENGINE"],
            prompt=f"Por favor, responda de forma clara e concisa em linguagem natural portugues: {prompt}",
            max_tokens=int(os.environ["OPENAI_API_TOKENS"]),
            n=1,
            stop=None,
            temperature=float(os.environ["OPENAI_API_TEMPERATURE"]),
        )
        return response.choices[0].text.strip()
    
    def escape_ssml(text):
        """Substitui caracteres problemáticos no SSML."""
        return re.sub(r'([&<>])', lambda m: {'&': '&amp;', '<': '&lt;', '>': '&gt;'}[m.group(1)], text)
    
    # Request Handler para a intenção ChatGPT
    class ChatGPTIntentHandler(AbstractRequestHandler):
        def can_handle(self, handler_input):
            return is_intent_name("ChatGPTIntent")(handler_input)
    
        def handle(self, handler_input):
            # Obter a mensagem do usuário a partir do slot 'message'
            message = handler_input.request_envelope.request.intent.slots["message"].value
    
            # Obter resposta do ChatGPT
            chat_gpt_response = get_chat_gpt_response(message)
    
            # Escapar caracteres SSML problemáticos
            speech_text = escape_ssml(chat_gpt_response)
            
            # Adicionar mensagem adicional solicitando nova pergunta ou ação
            speech_text += " Se você tiver mais perguntas ou precisar de ajuda, por favor, me avise."
    
            # Adicionar reprompt com atraso de 10 segundos
            reprompt_text = "<break time='10s'/> Encerrando a sessão devido à inatividade. Se precisar de mais ajuda, sinta-se à vontade para invocar a skill novamente."
        
            
            # Responder ao usuário
            handler_input.response_builder.speak(speech_text).ask(reprompt_text).set_card(SimpleCard("ChatGPT", speech_text))
            return handler_input.response_builder.response
        
    # Adicione o LaunchRequestHandler
    class LaunchRequestHandler(AbstractRequestHandler):
        def can_handle(self, handler_input):
            return is_request_type("LaunchRequest")(handler_input)
    
        def handle(self, handler_input):
            speech_text = "Bem-vindo ao Chat. Como posso ajudá-lo hoje?"
            handler_input.response_builder.speak(speech_text).set_should_end_session(False)
            return handler_input.response_builder.response
        
    # Request Handler para o encerramento devido à inatividade
    class SessionEndedRequestHandler(AbstractRequestHandler):
        def can_handle(self, handler_input):
            return is_request_type("SessionEndedRequest")(handler_input)
    
        def handle(self, handler_input):
            return handler_input.response_builder.response    
    
    # Adicione o HelpIntentHandler
    class HelpIntentHandler(AbstractRequestHandler):
        def can_handle(self, handler_input):
            return is_intent_name("AMAZON.HelpIntent")(handler_input)
    
        def handle(self, handler_input):
            speech_text = "Você pode me fazer uma pergunta ou iniciar uma conversa."
            handler_input.response_builder.speak(speech_text).set_should_end_session(False)
            return handler_input.response_builder.response
    
    # Adicione o FallbackIntentHandler
    class FallbackIntentHandler(AbstractRequestHandler):
        def can_handle(self, handler_input):
            return is_intent_name("AMAZON.FallbackIntent")(handler_input)
    
        def handle(self, handler_input):
            speech_text = "Desculpe, não entendi o que você disse. Por favor, tente novamente."
            handler_input.response_builder.speak(speech_text).ask(speech_text).set_should_end_session(False)
            return handler_input.response_builder.response        
    
    # Função Lambda principal
    sb = SkillBuilder()
    sb.add_request_handler(LaunchRequestHandler())
    sb.add_request_handler(SessionEndedRequestHandler())
    sb.add_request_handler(FallbackIntentHandler())
    sb.add_request_handler(HelpIntentHandler())
    sb.add_request_handler(ChatGPTIntentHandler())
    
    def lambda_handler(event, context):
        return sb.lambda_handler()(event, context)
    

**4. Conectar a skill do Alexa à função Lambda**

Após criar e configurar a função Lambda, você precisa conectá-la à sua skill do Alexa. Siga estas etapas:

* No Amazon Developer Console, vá até a sua skill e clique na aba "Endpoint".
* Selecione "AWS Lambda ARN" como o tipo de endpoint e copie o ARN da sua função Lambda.
* Cole o ARN no campo "Default Region" e clique em "Save Endpoints".

**5. Testar sua skill**

Agora que sua skill do Alexa está conectada à função Lambda, você pode testá-la no Amazon Developer Console. Siga estas etapas:

* Vá até a sua skill e clique na aba "Test".
* Ative o teste e digite ou fale sua pergunta no campo "Type or click and hold the mic".
* Verifique a resposta da sua skill. Se tudo estiver funcionando corretamente, você receberá uma resposta do ChatGPT.

**6. Implantar a skill**

Depois de testar sua skill com sucesso, você pode implantá-la para que os usuários finais possam acessá-la. Siga estas etapas:

* No Amazon Developer Console, vá até a sua skill e clique na aba "Distribution".
* Preencha as informações necessárias, como descrição, ícone e palavras-chave.
* Salve e envie sua skill para revisão. Após a aprovação, sua skill estará disponível para os usuários.

**7. Promover e monitorar sua skill**

Agora que sua skill está implantada, você pode promovê-la e monitorar seu desempenho:

* Compartilhe sua skill nas redes sociais e outros canais de marketing.
* Monitore as análises e métricas no Amazon Developer Console para entender o uso e o desempenho da sua skill.
* Atualize e aprimore sua skill com base no feedback dos usuários e nas análises coletadas.

Este tutorial mostrou como criar uma skill do Alexa que utiliza o modelo de **`Completion`** da OpenAI para responder às perguntas e interagir com os usuários. Seguindo essas etapas, você pode criar sua própria skill e fornecer uma experiência de usuário aprimorada com a ajuda da inteligência artificial.