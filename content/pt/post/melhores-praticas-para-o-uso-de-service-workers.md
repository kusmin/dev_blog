---
title: 'Melhores Práticas para o Uso de Service Workers'
date: '2023-06-19T21:36:33-03:00'
status: publish
permalink: /melhores-praticas-para-o-uso-de-service-workers
author: 'Renan Ribeiro Lage'
excerpt: 'Os Service Workers são uma ferramenta fundamental para melhorar a experiência do usuário em aplicações web. Este post aborda práticas recomendadas para a utilização eficaz de Service Workers, como a escolha de estratégias de cache adequadas, teste rigoroso, considerações sobre desempenho, transparência para o usuário e a implementação de atualizações e fallbacks eficazes. As orientações compartilhadas ajudarão os desenvolvedores a maximizar os benefícios dos Service Workers, garantindo uma experiência online e offline suave para os usuários.'
type: post
id: 241
category:
    - Uncategorized
tag: []
post_format: []
om_disable_all_campaigns:
    - ''
cmplz_hide_cookiebanner:
    - ''
burst_total_pageviews_count:
    - '12'
---
Os Service Workers podem fornecer uma série de recursos e melhorias valiosos para a experiência do usuário em um aplicativo da web, incluindo a capacidade de funcionar offline, enviar notificações push e fornecer atualizações em segundo plano. No entanto, usar Service Workers de forma eficaz requer aderir a algumas melhores práticas. Aqui estão algumas delas:

1. **Evite guardar muito no cache**: Embora a capacidade de guardar coisas no cache para uso offline seja uma das principais vantagens dos Service Workers, é importante não exagerar. Guardar muitos dados no cache pode consumir muito armazenamento no dispositivo do usuário e potencialmente causar problemas.
2. **Mantenha o Service Worker atualizado**: É importante lembrar que uma vez que um Service Worker é instalado e ativado, ele se torna efetivamente “imutável”. Qualquer alteração que você faça no script do Service Worker não terá efeito até que o Service Worker seja atualizado. Assim, uma das melhores práticas é garantir que o Service Worker seja atualizado regularmente.
3. **Use a estratégia de cache correta**: Existem várias estratégias de cache diferentes que você pode usar com Service Workers, e é importante escolher a certa para o seu caso de uso específico. Algumas estratégias populares incluem “cache first” (ótimo para recursos que raramente mudam), “network first” (bom para conteúdo dinâmico) e “stale while revalidate” (um bom equilíbrio entre as duas).
4. **Tenha um plano para lidar com falhas de solicitação**: Se uma solicitação de rede falhar (por exemplo, porque o usuário está offline), é útil ter um plano sobre o que fazer em seguida. Isso pode ser tão simples como retornar uma resposta armazenada no cache, ou pode envolver o fornecimento de uma página personalizada de “offline”.
5. **Use o Scope de forma sensata**: O escopo de um Service Worker determina quais páginas o worker pode controlar, em termos de URL. Por padrão, um Service Worker só controla as páginas que estão no seu diretório ou abaixo dele. Se o Service Worker está localizado na raiz de um domínio, ele controlará todas as páginas nesse domínio. Cuidado para não deixar um Service Worker controlar páginas que não deveria.
6. **Teste extensivamente**: Como os Service Workers podem afetar significativamente a forma como o seu site/app funciona, é vital testá-los extensivamente em todas as condições possíveis – online, offline, conexão lenta, etc.
7. **Comunique-se com seus usuários**: Os Service Workers têm o potencial de confundir os usuários, especialmente se eles mudarem o comportamento esperado de atualizações de página. É uma boa ideia manter os usuários informados sobre o que está acontecendo quando eles estão interagindo com uma página controlada por um Service Worker.
8. **Use eventos de Background Sync e Push**: Esses eventos permitem experiências na web que anteriormente só eram possíveis em aplicativos nativos. Background Sync permite que seu app aja de maneira robusta mesmo com conexões ruins à Internet, enquanto eventos Push permitem a comunicação com seu usuário mesmo quando o navegador não está ativo.
9. **Segurança primeiro**: Os Service Workers só funcionam sobre HTTPS por uma razão. Eles têm um poder significativo, então garantir que as conexões sejam seguras é fundamental. Não é uma “melhor prática” tanto quanto uma exigência.
10. **Identifique o que deve ser guardado em cache**: Todos os arquivos e dados não precisam ser guardados em cache. Identifique os recursos e dados que são críticos para a experiência do usuário e guarde-os em cache. Recursos estáticos, como HTML, CSS, JavaScript e imagens, geralmente são bons candidatos.
11. **Implemente um manipulador de fallback**: A implementação de um manipulador de fallback para retornar quando uma solicitação não corresponder a nada no cache pode melhorar a experiência do usuário. Normalmente, você pode guardar em cache uma página de fallback durante a fase de instalação.
12. **Mantenha os Service Workers leves**: Service Workers são scripts JavaScript que o navegador precisa baixar, analisar e executar. Assim, como todos os scripts, você deve tentar mantê-los pequenos e eficientes. Minimize o código do Service Worker e remova quaisquer bibliotecas desnecessárias.
13. **Aproveite a sincronização em segundo plano**: Com a API de sincronização em segundo plano, você pode atrasar ações até que o usuário tenha uma conexão de Internet confiável. Isso é útil para ações que o usuário iniciou enquanto estava offline, como enviar um formulário ou fazer upload de um arquivo.
14. **Atualize o Service Worker de forma eficaz**: Ao atualizar o Service Worker, você deve considerar a possibilidade de ter múltiplas versões do Service Worker ativas ao mesmo tempo. Isso pode ocorrer se várias abas estiverem abertas, cada uma com uma versão diferente do Service Worker. Portanto, ao atualizar, você deve garantir que a nova versão não quebrará as antigas.