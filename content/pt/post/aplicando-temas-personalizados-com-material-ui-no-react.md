---
title: 'Aplicando Temas Personalizados com Material-UI no React'
date: '2023-07-08T21:31:23-03:00'
status: publish
permalink: /aplicando-temas-personalizados-com-material-ui-no-react
author: 'Renan Ribeiro Lage'
excerpt: "O artigo discute como aplicar temas personalizados no React usando a biblioteca Material-UI. Ele começa com a configuração de um Contexto de Tema, permitindo que qualquer componente filho acesse o tema atual e uma função para alterá-lo.  \nEm seguida, o artigo descreve como criar um tema com o Material-UI usando a função `createTheme`, onde o modo da paleta do tema é definido conforme o estado do nosso `ThemeContext`.  \nO próximo passo aborda a aplicação do tema, onde o `ThemeProvider` do Material-UI é usado para aplicar o tema personalizado a todos os componentes filhos.  \nFinalmente, o artigo aborda a personalização das cores do tema. As cores do texto são definidas de acordo com o tema atual, e essas cores podem ser aplicadas aos componentes usando a cor do texto da paleta do tema.  \nEm resumo, o artigo descreve um processo passo-a-passo para criar e aplicar um tema personalizado que pode ser alternado dinamicamente em uma aplicação React usando Material-UI."
type: post
id: 306
category:
    - React
tag:
    - material-ui
    - themas
post_format: []
om_disable_all_campaigns:
    - ''
cmplz_hide_cookiebanner:
    - ''
burst_total_pageviews_count:
    - '5'
---
Material-UI é uma biblioteca de componentes popular para React que implementa o design Material da Google. Uma das características mais poderosas do Material-UI é o seu sistema de temas, que permite personalizar a aparência dos componentes Material-UI em toda a aplicação.

Neste artigo, vamos demonstrar como usar o sistema de temas do Material-UI para aplicar um tema claro/escuro dinâmico em uma aplicação React.

Configurando o Contexto de Tema
-------------------------------

Primeiro, vamos criar um contexto para armazenar o estado do tema. Vamos usar o hook `useContext` do React para isso:

``` shell
import { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

```

Com isso, temos um provedor de contexto que pode ser usado para envolver nossa aplicação, permitindo que qualquer componente filho acesse o tema atual e uma função para alterar o tema.

Criando o Tema com Material-UI
------------------------------

Com o Material-UI, podemos usar a função `createTheme` para criar um tema. Aqui está como você pode criar um tema que muda de acordo com o estado do nosso `ThemeContext`:

``` shell
import { createTheme } from '@mui/material/styles';
import { ThemeContext } from './ThemeContext';

function App() {
    const { theme } = useContext(ThemeContext);

    const muiTheme = createTheme({
        palette: {
            mode: theme,
        },
    });

    // Resto do componente...
}

```
Note que estamos utilizando o `mode` da paleta do tema para definir se o tema é claro ou escuro.

Aplicando o Tema
----------------

Finalmente, vamos usar o `ThemeProvider` do Material-UI para aplicar nosso tema personalizado a todos os componentes filhos:


``` shell
import { ThemeProvider } from '@mui/material/styles';

// Dentro do componente App...
return (
    <ThemeProvider theme={muiTheme}>
        {/* Resto da aplicação */}
    </ThemeProvider>
);
```
Qualquer componente envolvido pelo `ThemeProvider` será afetado pelo tema.

Personalizando Cores
--------------------

Podemos ir além e personalizar as cores do tema. Por exemplo, podemos definir as cores do texto de acordo com o tema atual:

``` shell
const muiTheme = createTheme({
    palette: {
        mode: theme,
        text: {
            primary: theme === 'light' ? '#000000' : '#FFFFFF',
        },
    },
});

```

E então, podemos utilizar a cor do texto da paleta do tema em nossos componentes:

``` shell
import { useTheme } from '@mui/material/styles';

// Dentro de um componente filho...
const themeStyles = useTheme();

return (
    <Typography variant="body1" sx={{ color: themeStyles.palette.text.primary }}>
        Aqui você pode ver as postagens mais recentes do nosso blog.
    </Typography>
);
```

Como você pode ver, o sistema de temas do Material-UI é poderoso e flexível, permitindo que você crie uma aparência consistente em toda a sua aplicação. E com o React Context, você pode criar temas dinâmicos que mudam de acordo com o estado da sua aplicação.

- - - - - -
