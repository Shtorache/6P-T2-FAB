# API T2 - Node.js, Express, PostgreSQL e MongoDB

API backend desenvolvida para o Trabalho T2, contemplando dois contextos de persistência, autenticação JWT, segurança, testes de integração, Swagger e conteinerização.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- MongoDB
- Prisma
- Mongoose
- JWT
- bcrypt
- Zod
- Helmet
- CORS
- express-rate-limit
- Jest
- Supertest
- Swagger
- Docker

## Arquitetura

A aplicação foi dividida em camadas:

- `routes`: definem os endpoints HTTP.
- `controllers`: recebem requisicoes e retornam respostas.
- `services`: concentram regras de negocio e acesso aos bancos.
- `models`: definem os modelos NoSQL com Mongoose.
- `schemas`: validam entradas com Zod.
- `middlewares`: tratam autenticacao, autorizacao, seguranca, validacao e erros.
- `prisma`: define o modelo SQL dos usuarios.

## Persistencia

O CRUD de usuarios utiliza PostgreSQL com Prisma, representando o contexto relacional SQL.

Os CRUDs de carros, motos e marcas de roupa utilizam MongoDB com Mongoose, representando o contexto NoSQL.

## Como executar via Docker

Copie `.env.example` para `.env` se desejar executar localmente fora do Docker. Para a entrega, o fluxo principal e com Docker:

```bash
docker compose up --build
```

Depois acesse:

```text
http://localhost:3000/health
```

Documentacao Swagger:

```text
http://localhost:3000/api-docs
```

## Testes

Com PostgreSQL e MongoDB em execucao, rode:

```bash
npm test
```

Tambem e possivel executar os bancos com Docker e rodar os testes localmente:

```bash
docker compose up -d postgres mongo
npm run prisma:deploy
npm test
```

## Rotas principais

### Autenticacao

- `POST /auth/register`
- `POST /auth/login`

### Usuarios

- `GET /usuarios`
- `GET /usuarios/:id`
- `PUT /usuarios/:id`
- `DELETE /usuarios/:id`

### Carros

- `POST /carros`
- `GET /carros`
- `GET /carros/:id`
- `PUT /carros/:id`
- `DELETE /carros/:id`

### Motos

- `POST /motos`
- `GET /motos`
- `GET /motos/:id`
- `PUT /motos/:id`
- `DELETE /motos/:id`

### Marcas de roupa

- `POST /marcas-roupa`
- `GET /marcas-roupa`
- `GET /marcas-roupa/:id`
- `PUT /marcas-roupa/:id`
- `DELETE /marcas-roupa/:id`

## Seguranca

A API utiliza JWT para autenticacao, bcrypt para hash de senhas, validacao de entrada com Zod, Helmet para cabecalhos HTTP, CORS, limitacao de requisicoes e tratamento centralizado de erros. Rotas protegidas exigem o header:

```text
Authorization: Bearer <token>
```

## Documentacao escrita

O trabalho consiste em uma API backend desenvolvida com Node.js e Express.
A aplicacao foi organizada em camadas, separando rotas, controllers, services, modelos, middlewares e configuracoes.
Foram utilizados dois contextos de persistencia de dados, conforme solicitado na atividade.
Para os usuarios do sistema foi utilizado um banco relacional PostgreSQL, acessado com Prisma.
Para os recursos carro, moto e marca de roupa foi utilizado um banco NoSQL MongoDB, acessado com Mongoose.
A autenticacao foi implementada com JWT, permitindo que apenas usuarios autenticados acessem rotas protegidas.
As senhas dos usuarios nao sao armazenadas em texto puro, pois passam por hash com bcrypt antes de serem salvas.
A API tambem possui mecanismos de autorizacao, validacao de entrada e tratamento centralizado de erros.
Foram aplicadas boas praticas de seguranca inspiradas na OWASP Top 10, como protecao de rotas, uso de variaveis de ambiente, Helmet, CORS e limitacao de requisicoes.
Todos os recursos possuem endpoints de CRUD, permitindo criar, listar, buscar, atualizar e remover registros.
Os testes de integracao foram implementados com Jest e Supertest para validar os endpoints principais e os fluxos de erro.
A documentacao automatica da API foi gerada com Swagger, facilitando a visualizacao e o teste das rotas.
A aplicacao foi conteinerizada com Docker, usando docker-compose para orquestrar a API, o PostgreSQL e o MongoDB.
O fluxo principal de execucao do projeto acontece via Docker, conforme exigido, sem depender de npm run dev ou npm start para a entrega.
Essa arquitetura foi escolhida por ser simples, organizada, facil de testar e adequada aos requisitos de seguranca, persistencia e documentacao do trabalho.

## Relatorio de verificacao

Foi gerado um arquivo `verification-report.json` com os resultados brutos das verificações automatizadas e manuais (registro, login, CRUDs e checagens de autorizacao). O arquivo está incluído no repositório para conferência do Fabrício grande mestre.

