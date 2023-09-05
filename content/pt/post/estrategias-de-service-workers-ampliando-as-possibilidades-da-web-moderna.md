---
title: 'Estratégias de Service Workers: Ampliando as Possibilidades da Web Moderna'
date: '2023-06-22T20:26:12-03:00'
status: publish
permalink: /estrategias-de-service-workers-ampliando-as-possibilidades-da-web-moderna
author: 'Renan Ribeiro Lage'
excerpt: 'Os Service Workers são ferramentas poderosas no desenvolvimento web, permitindo funcionalidades avançadas como ações em plano de fundo, interceptação de requisições de rede e gerenciamento de cache. Este artigo explorou sete estratégias distintas que podem ser implementadas utilizando Service Workers. Estas incluem: Cache First, Network First, Cache then Network, Stale While Revalidate, Network Only, Cache Only e Race. Cada estratégia possui seus próprios benefícios e casos de uso ideais, desde a otimização para conteúdo estático até o gerenciamento de conteúdo dinâmico ou a necessidade de respostas atualizadas em tempo real. A estratégia ou combinação de estratégias mais apropriada dependerá das necessidades específicas do aplicativo, das condições da rede e das expectativas do usuário.'
type: post
id: 260
category:
    - Uncategorized
tag: []
post_format: []
om_disable_all_campaigns:
    - ''
cmplz_hide_cookiebanner:
    - ''
burst_total_pageviews_count:
    - '1'
---
Os Service Workers são um poderoso recurso da Web moderna, fornecendo ao desenvolvedor capacidades até então indisponíveis, como a possibilidade de executar ações no plano de fundo, interceptar e manipular requisições de rede e gerenciar o cache de recursos. Este artigo explorará diferentes estratégias que podem ser adotadas com os Service Workers para oferecer uma experiência de usuário aprimorada.

1. Estratégia de Cache First (Cache Primeiro)
---------------------------------------------

A estratégia de cache primeiro é uma das mais comuns e é particularmente útil para recursos estáticos que não mudam com frequência, como arquivos CSS, JavaScript ou imagens. Com esta estratégia, o Service Worker tentará primeiro recuperar o recurso solicitado do cache. Se o recurso estiver disponível, será retornado imediatamente. Se não estiver disponível, o Service Worker fará uma solicitação à rede e armazenará a resposta no cache para uso futuro.

2. Estratégia de Network First (Rede Primeiro)
----------------------------------------------

Contrária à estratégia anterior, a de rede primeiro tenta recuperar o recurso da rede primeiro. Se a solicitação for bem-sucedida, o recurso é retornado ao usuário e também armazenado no cache para futuras solicitações. Esta estratégia é útil para conteúdo dinâmico que muda com frequência. No caso de a solicitação de rede falhar (por exemplo, se o usuário estiver offline), o Service Worker tentará recuperar a versão em cache do recurso, se disponível.

3. Estratégia de Cache then Network (Cache, Depois Rede)
--------------------------------------------------------

Esta é uma estratégia mista que tenta oferecer o melhor dos dois mundos: resposta rápida e conteúdo atualizado. Quando um recurso é solicitado, o Service Worker retorna imediatamente a versão em cache (se disponível) e, simultaneamente, faz uma solicitação à rede para atualizar o cache. Quando a resposta da rede é recebida, o conteúdo é atualizado. Esta estratégia é útil para conteúdo que muda com frequência, mas onde uma versão ligeiramente desatualizada é aceitável.

4. Estratégia de Stale While Revalidate (Velho Enquanto Revalida)
-----------------------------------------------------------------

Essa estratégia é semelhante à estratégia de “Cache, Depois Rede”, mas com uma diferença chave: o conteúdo não é atualizado até a próxima visita do usuário. Com esta estratégia, o Service Worker retorna a versão em cache do recurso (se disponível) e, simultaneamente, faz uma solicitação à rede para atualizar o cache. No entanto, ao contrário da estratégia “Cache, Depois Rede”, a resposta da rede não é usada imediatamente, mas é armazenada para a próxima visita. Isso é útil para recursos que não são críticos para a experiência do usuário e que não precisam ser atualizados em tempo real.

5. Estratégia de Network Only (Apenas Rede)
-------------------------------------------

Finalmente, há a estratégia de apenas rede. Como o nome indica, esta estratégia ignora completamente o cache e sempre tenta recuperar recursos da rede. Embora possa parecer contra-intuitivo dado o poder do Service

Worker para manipular o cache, há casos de uso em que isso faz sentido. Por exemplo, para solicitações que sempre precisam ter a resposta mais atualizada, como verificar o status de um pedido em tempo real.

6. Estratégia de Cache Only (Apenas Cache)
------------------------------------------

Esta é outra estratégia simples que envolve apenas a recuperação de recursos do cache, ignorando completamente a rede. Isso é útil para recursos que foram pré-carregados e que sabemos que sempre estarão disponíveis, como alguns recursos do aplicativo que podem ser pré-cacheados durante a instalação do Service Worker.

7. Estratégia de Race (Corrida)
-------------------------------

Essa estratégia envolve tentar buscar um recurso tanto do cache quanto da rede simultaneamente e retornar o que responder primeiro. Essa estratégia pode ser útil em situações em que tanto a velocidade de resposta quanto a frescura dos dados são importantes, mas tem o potencial de desperdiçar largura de banda se o cache frequentemente vencer a corrida.

Concllusão
----------

Em resumo, o Service Worker fornece aos desenvolvedores uma vasta gama de estratégias para gerenciar a forma como os recursos são armazenados em cache e recuperados, permitindo que se equilibre a necessidade de desempenho e atualidade dos dados. A estratégia adequada depende muito do tipo de recurso e do aplicativo em questão, bem como das condições da rede e das expectativas do usuário. Os desenvolvedores precisam experimentar e avaliar as opções para encontrar a estratégia ou combinação de estratégias que oferecem a melhor experiência para seus usuários.

- - - - - -