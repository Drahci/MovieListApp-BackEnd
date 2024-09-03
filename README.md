# Movie List App - Backend

Este é o backend para a aplicação de Lista de Filmes, que permite aos usuários pesquisar e salvar filmes em uma lista de favoritos. A aplicação integra-se com a API do The Movie Database (TMDb) para exibir detalhes como a nota (rating) dos filmes.

## Tecnologias Utilizadas

- Node.js
- Express
- Supabase
- Axios
- Cors
- Dotenv

## Funcionalidades

- Pesquisa de filmes na API do TMDb.
- Exibição de detalhes dos filmes, incluindo a nota do TMDb.
- Gerenciamento da lista de filmes favoritos (adicionar/remover).
- Armazenamento da lista de favoritos no Supabase.

## Requisitos

- Node.js (v18.19.1 ou superior)
- NPM (v6.14.15 ou superior)

## Configuração do Projeto

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/movie-list-app-backend.git
   cd movie-list-app-backend
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

   ```env
   PORT=3000
   SUPABASE_URL=https://cwegnwmlakddhsmpuctu.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3ZWdud21sYWtkZGhzbXB1Y3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMTMyNDMsImV4cCI6MjA0MDg4OTI0M30.wMK2_Mzffuu3rcb9VxHjmkMfDqvhrR02FUT1Fc2CRM4
   TMDB_API_KEY=997fc7e026a52c0353e9fe9190f94343
   ```

## Executando o Projeto

1. Inicie o servidor:

   ```sh
   npm start
   ```

2. O servidor estará rodando na porta definida no arquivo `.env` (por padrão, `3000`). Você pode acessar a API em `http://localhost:3000/api`.

## Endpoints da API

### Filmes

- `GET /api/movies`: Retorna uma lista de filmes populares.
- `GET /api/movies/:id`: Retorna os detalhes de um filme específico.
- `GET /api/search`: Pesquisa filmes com base em uma query.
- `POST /api/movies`: Criação de filmes (não suportada pela API do TMDb).
- `PUT /api/movies/:id`: Atualização de filmes (não suportada pela API do TMDb).
- `DELETE /api/movies/:id`: Exclusão de filmes (não suportada pela API do TMDb).

### Favoritos

- `POST /api/favorites`: Adiciona um filme aos favoritos.
- `GET /api/favorites`: Retorna a lista de filmes favoritos.
- `PUT /api/favorites/:id`: Atualiza o estado de favorito de um filme.

## Estrutura do Projeto

```plaintext
movie-list-app-backend/
├── config/
│   └── supabaseClient.js
├── controllers/
│   └── movieController.js
├── models/
│   ├── Favorite.js
│   └── Movie.js
├── routes/
│   └── movieRoutes.js
├── .env
├── app.js
├── package.json
└── README.md
```

## Deploy

O backend pode ser implantado em qualquer serviço de hospedagem que suporte Node.js. Certifique-se de configurar as variáveis de ambiente no serviço de hospedagem.

## Frontend

O frontend da aplicação está hospedado na Vercel e pode ser acessado através do seguinte link: [Movie List App](https://movie-list-app-henna.vercel.app/)

## Contribuição

Sinta-se à vontade para contribuir com o projeto. Para isso, siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.
