## Projeto Hugo com CMS Tina

Este projeto é um site estático gerado pelo [Hugo](https://gohugo.io/), um gerador de sites estáticos rápido e flexível escrito em Go, com a integração do [TinaCMS](https://tina.io/), um sistema de gerenciamento de conteúdo (CMS) para sites estáticos.

### Requisitos

1. Instale o [Hugo](https://gohugo.io/getting-started/installing/), seguindo as instruções para o seu sistema operacional.
2. Instale o [Node.js](https://nodejs.org/en/download/) (LTS) e o [npm](https://www.npmjs.com/get-npm), seguindo as instruções para o seu sistema operacional.

### Como rodar o projeto

1. Clone este repositório:


2. Instale as dependências do projeto:
   
```bash
npm install
```

3. Inicie o servidor de desenvolvimento do Hugo:

```bash
npx tinacms dev -c "hugo server -D -p 1313"
```

4. Acesse o site no navegador pelo endereço `http://localhost:1313`.

5. Para acessar o TinaCMS, adicione `?edit` ao final da URL, como: `http://localhost:1313/admin`. Isso permitirá que você edite o conteúdo diretamente no site usando a interface do TinaCMS.

### Como fazer build e deploy do projeto

O deploy é feito de modo automatico pelo gitHub actions

### Documentação

- [Documentação do Hugo](https://gohugo.io/documentation/)
- [Documentação do TinaCMS](https://tina.io/docs/)

### Contribuir

Se você tiver alguma sugestão ou encontrar algum problema no projeto, sinta-se à vontade para abrir uma issue ou pull request no repositório.
