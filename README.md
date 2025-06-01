# Pokémon Frontend App

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![PropTypes](https://img.shields.io/badge/PropTypes-FF69B4?style=for-the-badge)
![Lucide React](https://img.shields.io/badge/Lucide-0A0A0A?style=for-the-badge&logo=lucide&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)

Aplicação web moderna e responsiva para visualizar, cadastrar, editar e excluir Pokémons, consumindo uma API RESTful de gerenciamento de dados.

## O que é e como funciona

Este é o frontend do projeto Pokémon, desenvolvido com React e Vite para proporcionar uma experiência de usuário rápida e interativa. Ele se conecta a uma API RESTful (Pokémon API Backend) para exibir e manipular os dados dos Pokémons e seus tipos.

## Funcionalidades

- Listagem de Pokémons: Exibe uma lista paginada e pesquisável de todos os Pokémons.
- Detalhes do Pokémon: Ao selecionar um Pokémon, mostra informações detalhadas como código, nome, tipos (principal e secundário), stats (HP, Attack, Defense), descrição e GIF/imagem.
- Busca de Pokémons: Funcionalidade de pesquisa para encontrar Pokémons por nome ou código.
- Gerenciamento de Pokémons:
  - Cadastro: Formulário para adicionar novos Pokémons.
  - Edição: Edita os dados de um Pokémon existente (código, nome, tipos).
  - Exclusão: Remove Pokémons da lista.
- Gerenciamento de Tipos: Permite a visualização e gestão dos tipos de Pokémon.
- Design Responsivo: Layout adaptável para diferentes tamanhos de tela.
- Interface Intuitiva: Foco na usabilidade para uma experiência agradável.

## Tecnologias Utilizadas

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React
- Prop-types
- ESLint
- Prettier

## Estrutura do Projeto

```
.
├── public/
│   └── react.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/               # Componentes de UI genéricos (Badge, Card, Input, Select, etc.)
│   │   │   ├── badge.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── select.jsx
│   │   │   └── Header.jsx
│   │   ├── PokemonDetail.jsx
│   │   ├── PokemonListItem.jsx
│   │   ├── PokemonSearch.jsx
│   │   └── Spinner.jsx
│   ├── hooks/
│   ├── lib/
│   │   └── utils.js
│   ├── pages/
│   │   ├── EditPokemon.jsx
│   │   ├── Home.jsx
│   │   ├── ManageTypes.jsx
│   │   └── RegisterPokemon.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── typeUtils.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .eslintrc.cjs
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
└── vite.config.js
```

## Pré-requisitos

- Node.js (versão 18.x ou superior)
- npm (gerenciador de pacotes)
- O Pokémon API Backend deve estar em execução e acessível.

## Instalação e Uso

Clone o repositório do frontend:

```bash
git clone https://github.com/SeuUsuario/SeuRepositorio-Pokemon-Frontend.git
cd SeuRepositorio-Pokemon-Frontend
```

Instale as dependências:

```bash
npm install
```

Configure a URL da API (se necessário):

O arquivo `src/services/api.js` já deve estar configurado para `http://localhost:3000`. Se sua API backend estiver em outro endereço, ajuste-o:

```javascript
// src/services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:5173 (ou outra porta disponível).

## Licença

Este projeto está licenciado sob a Licença MIT.
Consulte o arquivo LICENSE para mais informações.
