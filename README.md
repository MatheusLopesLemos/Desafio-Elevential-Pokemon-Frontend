
# Pokémon Frontend App

[![React](https://img.shields.io/badge/React-18.x-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/) 
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/) 
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) 
[![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=flat)](https://axios-http.com/) 
[![React Router](https://img.shields.io/badge/React%20Router-6.x-CA4245?style=flat&logo=react-router&logoColor=white)](https://reactrouter.com/) 
[![PropTypes](https://img.shields.io/badge/PropTypes-15.x-FF69B4?style=flat)](https://reactjs.org/docs/typechecking-with-proptypes.html) 
[![Lucide React](https://img.shields.io/badge/Lucide-0.292.0-0A0A0A?style=flat&logo=lucide&logoColor=white)](https://lucide.dev/) 
[![ESLint](https://img.shields.io/badge/ESLint-8.x-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/) 
[![Prettier](https://img.shields.io/badge/Prettier-3.x-F7B93E?style=flat&logo=prettier&logoColor=white)](https://prettier.io/)


---

## O que é e como funciona

Aplicação web moderna e responsiva para visualizar, cadastrar, editar e excluir Pokémons. Desenvolvida com React e Vite, ela consome a API RESTful do Pokémon API Backend para exibir e manipular dados dos Pokémons e seus tipos.

---

## Funcionalidades

- Listagem paginada e pesquisável de Pokémons  
- Exibição detalhada de Pokémon (código, nome, tipos, stats, descrição, imagens e GIFs)  
- Busca de Pokémons por nome ou código  
- Cadastro, edição e exclusão de Pokémons  
- Visualização e gerenciamento dos tipos de Pokémon  
- Design responsivo para múltiplos dispositivos  
- Interface intuitiva com foco na usabilidade  

---

## Tecnologias Utilizadas

- React  
- Vite  
- Tailwind CSS  
- React Router DOM  
- Axios  
- Lucide React  
- PropTypes  
- ESLint  
- Prettier  

---

## Estrutura do Projeto

```
.
├── public/
│   └── react.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
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
├── tailwind.config.js
└── vite.config.js
```

---

## Pré-requisitos

- Node.js (versão 18.x ou superior)  
- npm (gerenciador de pacotes)  
- Pokémon API Backend rodando e acessível  

---

## Instalação e Uso

Clone o repositório:

```bash
git clone https://github.com/SeuUsuario/SeuRepositorio-Pokemon-Frontend.git
cd SeuRepositorio-Pokemon-Frontend
```

Instale as dependências:

```bash
npm install
```

Configure a URL da API (se necessário):

O arquivo `src/services/api.js` já deve estar configurado para `http://localhost:3000`. Caso sua API backend esteja em outro endereço, ajuste o `baseURL`:

```javascript
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta livre).

---

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais informações.

---
