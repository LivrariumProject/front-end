# 📚 Livrarium Project — Frontend 

O **Livrarium Project — Frontend** é a interface web da plataforma de livraria digital **Livrarium**, desenvolvida para facilitar a **compra** e o **aluguel** de livros digitais. Este frontend consome a **API REST** do backend do sistema, oferecendo uma interface simples para:
- autenticação,
- navegação no catálogo,
- visualização de detalhes dos livros,
- carrinho,
- checkout,
- biblioteca do usuário,
- histórico
- perfil.

Projeto desenvolvido como parte da disciplina **Princípios de Desenvolvimento Web** (Ciência da Computação). 

## 🎨 Protótipo (Figma)
https://www.figma.com/design/z4YP4GTonVJ4jjQ1PFZfIC/Livrarium-Oficial?node-id=0-1&p=f&t=TyTtkGISSRqsHDvq-0 --- 

## 🚀 Objetivo do Projeto Permitir que o usuário: 

- criar conta e fazer login;
- visualizar o catálogo de livros;
- pesquisar e filtrar livros;
- ver detalhes de cada livro;
- adicionar livros ao carrinho;
- finalizar compra e/ou aluguel;
- acessar a biblioteca pessoal;
- consultar histórico de compras e aluguéis;
- visualizar e editar informações do perfil.

## 🛠️ Tecnologias Utilizadas 
- **React**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **Axios**
- **CSS**
- 
## 🔗 Integração com o Backend ### Endpoints principais utilizados
- `POST /auth/login`
- `POST /auth/logout`
- `POST /register`
- `GET /books`
- `GET /books/:id`
- `POST /purchases`
- `POST /rentals`
- `GET /purchases/user/:userId`
- `GET /rentals/user/:userId`
- `PUT /users/:id`
- > Observação: a aplicação assume que o backend retorna dados no padrão esperado pelos services (ex.: arrays/objetos com `data`, quando aplicável).

## ⚙️ Configuração 
### Pré-requisitos
- **Node.js 18+**
- **npm**
### Variáveis de ambiente Crie um arquivo
`.env` na raiz do projeto: ```env VITE_API_BASE_URL=http://localhost:3000 ```

## ▶️ Como Executar 
### 1) Instalar dependências 
```bash npm install ``` 
### 2) Rodar em modo desenvolvimento 
```bash npm run dev ``` A aplicação ficará disponível em um endereço semelhante a: - `http://localhost:5173` 
### 3) Build de produção 
```bash npm run build ``` 
### 4) Preview do build 
```bash npm run preview ```

## ✅ Como Testar (roteiro rápido) 
Com o backend rodando e o `.env` configurado: 
1. **Cadastro** - vá em `/signup` - crie um usuário
2. **Login** - vá em `/login` - autentique com email/senha
3. **Catálogo** - verifique listagem e filtros
4. **Detalhe do livro** - clique em um livro - escolha compra ou aluguel - adicione ao carrinho
5. **Carrinho** - remova item - vá para checkout
6. **Checkout** - selecione forma de pagamento - finalize pedido
7. **Histórico** - verifique compras e aluguéis
8. **Perfil** - edite nome/email e salve Dica: abra o DevTools do navegador (F12) e acompanhe as requisições na aba **Network**.

## 🧭 Estrutura do Projeto

```bash
front-end/
├── public/
│   ├── livrarium-icon.png        # Ícone usado no layout e favicon (se configurado)
│   └── ...                       # Assets públicos
├── src/
│   ├── components/               # Componentes reutilizáveis (Header, NavTabs, BookCard etc.)
│   ├── context/                  # Context API (ex.: CartContext)
│   ├── pages/                    # Páginas (Home, Cart, Checkout, Login, Signup, Profile etc.)
│   ├── services/                 # Integração com a API (axios)
│   ├── types/                    # Tipagens/interfaces
│   ├── utils/                    # Funções auxiliares
│   ├── App.tsx                   # Rotas principais
│   ├── main.tsx                  # Ponto de entrada
│   └── index.css                 # Estilos globais
├── .env
├── index.html                    # Onde configura o favicon (<link rel="icon" ... />)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 👨‍💻 Autores

- Felipe Gangorra
- Abraão

Desenvolvido para a disciplina Princípios de Desenvolvimento Web — Ciência da Computação.
