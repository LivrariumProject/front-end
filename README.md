# 📚 Livrarium Project
O Livrarium Project - Frontend é a interface web da plataforma de livraria digital Livrarium, desenvolvida para facilitar a compra e o aluguel de livros digitais.

Este projeto foi construído para consumir a API REST do backend do sistema, oferecendo uma interface simples para autenticação, navegação no catálogo, visualização de detalhes dos livros, gerenciamento de carrinho, checkout, biblioteca do usuário, histórico e perfil.

Este sistema está sendo desenvolvido como parte da disciplina Princípios de Desenvolvimento Web, do curso de Ciência da Computação.

## Link do Figma:

https://www.figma.com/design/z4YP4GTonVJ4jjQ1PFZfIC/Livrarium-Oficial?node-id=0-1&p=f&t=TyTtkGISSRqsHDvq-0

## 🚀 Objetivo do Projeto

O objetivo principal do frontend é permitir que o usuário:

- criar conta e fazer login;
- visualizar o catálogo de livros;
- pesquisar e selecionar livros;
- ver detalhes de cada livro;
- adicionar livros ao carrinho;
- realizar compra ou aluguel;
- acessar a biblioteca pessoal;
- consultar histórico de compras e aluguéis;
- visualizar e editar informações do perfil.

## 🛠️ Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- CSS

## 🔗 Integração com o Backend

O frontend foi desenvolvido para consumir a API do backend do Livrarium.

Endpoints principais utilizados

- POST /auth/login
- POST /auth/logout
- POST /register
- GET /books
- GET /books/:id
- POST /purchases
- POST /rentals
- GET /purchases/user/:userId
- GET /rentals/user/:userId
- PUT /users/:id

### Variável de ambiente

Crie um arquivo `.env` na raiz do frontend com:

```env
VITE_API_BASE_URL=http://localhost:3000
```
## 📁 Estrutura do Projeto
front-end/
├── public/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── pages/            # Páginas da aplicação
│   ├── services/         # Comunicação com a API
│   ├── types/            # Tipagens/interfaces
│   ├── utils/            # Funções auxiliares
│   ├── App.tsx           # Rotas principais
│   ├── main.tsx          # Ponto de entrada
│   └── index.css         # Estilos globais
├── .env
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
