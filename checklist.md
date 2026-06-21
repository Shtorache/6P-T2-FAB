# Checklist operacional - Trabalho T2 API Node.js/Express

Este arquivo deve servir como roteiro de execucao e passagem de contexto. Qualquer agente deve conseguir continuar o trabalho lendo:

- o que ja foi feito;
- como foi feito;
- o que falta fazer;
- como deve ser feito;
- qual texto pode ser transcrito no papel/documentacao escrita.

## 1. Resumo da tarefa

### O que foi solicitado

Desenvolver uma API backend com Node.js e Express contemplando:

- CRUD de `carro`, `moto` e `marca de roupa` usando banco NoSQL;
- CRUD de `usuarios` usando banco SQL relacional;
- autenticacao com JWT;
- autorizacao e rotas protegidas;
- boas praticas de seguranca alinhadas a OWASP Top 10;
- testes de integracao com Jest e Supertest;
- conteinerizacao com Dockerfile e docker-compose;
- execucao principal via Docker;
- documentacao automatica com Swagger;
- documentacao escrita com pelo menos 10 linhas;
- entrega via GitHub publico.

### Decisao tecnica recomendada

Para concluir tudo de uma vez com baixa complexidade e boa aderencia aos requisitos:

- Backend: Node.js + Express.
- Banco SQL: PostgreSQL para usuarios.
- Banco NoSQL: MongoDB para carros, motos e marcas de roupa.
- ORM/cliente SQL: Prisma, por simplificar migrations, modelos e testes.
- ODM NoSQL: Mongoose.
- Autenticacao: JWT com `jsonwebtoken`.
- Hash de senha: `bcryptjs`.
- Validacao de entrada: `zod` ou `joi`.
- Seguranca HTTP: `helmet`, `cors`, `express-rate-limit`, sanitizacao e validacao.
- Testes: Jest + Supertest.
- Swagger: `swagger-jsdoc` + `swagger-ui-express`.
- Docker: um container da API, um do PostgreSQL e um do MongoDB.

## 2. Estado atual do projeto

### Feito

- Foi analisado o arquivo `todo.md`.
- Foi identificado que o projeto ainda nao possui codigo-fonte da API.
- Foi criado este checklist operacional no arquivo `checklist.md`.
- Foi inicializado o projeto Node.js com Express.
- Foram instaladas as dependencias de producao e desenvolvimento.
- Foi criada a estrutura de pastas prevista.
- Foram configurados PostgreSQL com Prisma e MongoDB com Mongoose.
- Foi implementado CRUD SQL de usuarios.
- Foram implementados CRUDs NoSQL de carros, motos e marcas de roupa.
- Foi implementada autenticacao com JWT.
- Foram implementadas rotas protegidas e autorizacao por role.
- Foram aplicadas protecoes basicas com Helmet, CORS, rate limit, validacao e tratamento centralizado de erros.
- Foi criada documentacao Swagger em `/api-docs`.
- Foram criados testes de integracao com Jest e Supertest.
- Foi criado Dockerfile e `docker-compose.yml`.
- Foi criado README com documentacao escrita.
- A execucao via Docker foi validada.
- Os testes foram executados e passaram.

### Como foi feito

- O arquivo `todo.md` foi lido integralmente.
- Os requisitos foram separados por area: arquitetura, persistencia, seguranca, testes, Docker, Swagger, documentacao e entrega.
- As proximas etapas foram organizadas em ordem de execucao para evitar retrabalho.
- O projeto foi inicializado com `npm init -y`.
- As dependencias foram instaladas com npm.
- O Prisma foi mantido na serie 6.x para usar `schema.prisma` e migrations no formato classico.
- O PostgreSQL foi modelado com a tabela `Usuario`.
- O MongoDB foi modelado com schemas Mongoose para `Carro`, `Moto` e `MarcaRoupa`.
- Os endpoints foram separados em `routes`, `controllers`, `services`, `schemas`, `models` e `middlewares`.
- A autenticacao gera JWT com `jsonwebtoken` e protege rotas por header `Authorization: Bearer <token>`.
- As senhas sao salvas apenas como hash com bcrypt.
- Os testes usam Supertest contra `src/app.js` e limpam os bancos entre cenarios.
- A validacao final foi feita com `npm test`, `docker compose up --build -d api`, `/health` e `/api-docs.json`.

### Falta fazer

- Publicar no GitHub.
- Conferir se o repositorio ficou publico.
- Entregar o link publico.

## 3. Ordem geral de execucao

Executar as etapas nesta ordem:

1. Inicializar projeto Node.js.
2. Instalar dependencias.
3. Criar estrutura de pastas.
4. Configurar variaveis de ambiente.
5. Criar Dockerfile e docker-compose.
6. Configurar conexoes com PostgreSQL e MongoDB.
7. Criar modelo SQL de usuarios.
8. Criar modelos NoSQL de carro, moto e marca de roupa.
9. Implementar autenticacao.
10. Implementar middlewares de seguranca e autorizacao.
11. Implementar CRUD de usuarios.
12. Implementar CRUD de carros.
13. Implementar CRUD de motos.
14. Implementar CRUD de marcas de roupa.
15. Implementar Swagger.
16. Implementar testes de integracao.
17. Rodar tudo via Docker.
18. Corrigir falhas encontradas.
19. Escrever documentacao final.
20. Subir para GitHub publico.

## 4. Estrutura de pastas recomendada

### O que sera feito

Criar uma estrutura simples, modular e facil de testar:

```text
.
|-- src
|   |-- app.js
|   |-- server.js
|   |-- config
|   |   |-- env.js
|   |   |-- mongo.js
|   |   `-- prisma.js
|   |-- controllers
|   |   |-- auth.controller.js
|   |   |-- usuario.controller.js
|   |   |-- carro.controller.js
|   |   |-- moto.controller.js
|   |   `-- marcaRoupa.controller.js
|   |-- middlewares
|   |   |-- auth.middleware.js
|   |   |-- error.middleware.js
|   |   |-- validate.middleware.js
|   |   `-- security.middleware.js
|   |-- models
|   |   |-- carro.model.js
|   |   |-- moto.model.js
|   |   `-- marcaRoupa.model.js
|   |-- routes
|   |   |-- auth.routes.js
|   |   |-- usuario.routes.js
|   |   |-- carro.routes.js
|   |   |-- moto.routes.js
|   |   `-- marcaRoupa.routes.js
|   |-- schemas
|   |   |-- usuario.schema.js
|   |   |-- carro.schema.js
|   |   |-- moto.schema.js
|   |   `-- marcaRoupa.schema.js
|   |-- services
|   |   |-- auth.service.js
|   |   |-- usuario.service.js
|   |   |-- carro.service.js
|   |   |-- moto.service.js
|   |   `-- marcaRoupa.service.js
|   `-- swagger
|       `-- swagger.js
|-- tests
|   |-- auth.test.js
|   |-- usuarios.test.js
|   |-- carros.test.js
|   |-- motos.test.js
|   `-- marcasRoupa.test.js
|-- prisma
|   `-- schema.prisma
|-- Dockerfile
|-- docker-compose.yml
|-- .env.example
|-- package.json
`-- README.md
```

### Como sera feito

- `src/app.js`: configura Express, middlewares e rotas.
- `src/server.js`: inicia o servidor e conecta os bancos.
- `controllers`: recebem requisicoes HTTP e retornam respostas.
- `services`: concentram regras de negocio e acesso a dados.
- `models`: modelos Mongoose para MongoDB.
- `schemas`: validacao dos dados de entrada.
- `middlewares`: autenticacao, autorizacao, validacao, tratamento de erros e seguranca.
- `tests`: testes de integracao com Supertest.
- `prisma`: modelo SQL e migrations dos usuarios.

## 5. Dependencias recomendadas

### O que sera feito

Instalar dependencias de producao:

```bash
npm install express dotenv cors helmet express-rate-limit jsonwebtoken bcryptjs mongoose @prisma/client zod swagger-ui-express swagger-jsdoc
```

Instalar dependencias de desenvolvimento:

```bash
npm install -D jest supertest nodemon prisma
```

### Como sera feito

- `express`: servidor HTTP.
- `dotenv`: leitura das variaveis de ambiente.
- `cors`: controle de acesso entre origens.
- `helmet`: cabecalhos HTTP de seguranca.
- `express-rate-limit`: limitacao de requisicoes.
- `jsonwebtoken`: criacao e verificacao de JWT.
- `bcryptjs`: hash seguro de senhas.
- `mongoose`: persistencia NoSQL com MongoDB.
- `prisma` e `@prisma/client`: persistencia SQL com PostgreSQL.
- `zod`: validacao de payloads.
- `swagger-ui-express` e `swagger-jsdoc`: documentacao automatica.
- `jest` e `supertest`: testes de integracao.

## 6. Variaveis de ambiente

### O que sera feito

Criar `.env.example` e usar `.env` localmente/Docker.

### Como sera feito

Conteudo sugerido para `.env.example`:

```env
PORT=3000
NODE_ENV=development

DATABASE_URL=postgresql://postgres:postgres@postgres:5432/t2_api?schema=public
MONGO_URI=mongodb://mongo:27017/t2_api

JWT_SECRET=troque_esta_chave_em_producao
JWT_EXPIRES_IN=1h

BCRYPT_SALT_ROUNDS=10
```

### Cuidado importante

- O `.env.example` pode ir para o GitHub.
- O `.env` real nao deve conter segredo sensivel em producao.
- Para trabalho academico, pode-se entregar um `.env.example` com orientacoes claras.

## 7. Docker e Docker Compose

### O que sera feito

Criar `Dockerfile` para a API e `docker-compose.yml` para orquestrar:

- API Node.js;
- PostgreSQL;
- MongoDB.

### Como sera feito

Fluxo principal de execucao:

```bash
docker compose up --build
```

O `docker-compose.yml` deve:

- expor a API na porta `3000`;
- subir o PostgreSQL na porta interna `5432`;
- subir o MongoDB na porta interna `27017`;
- configurar variaveis de ambiente da API;
- usar volumes para manter dados dos bancos;
- garantir que a API dependa dos servicos `postgres` e `mongo`.

### Validacao

Depois de subir os containers:

- acessar `http://localhost:3000/health`;
- acessar `http://localhost:3000/api-docs`;
- rodar testes dentro do ambiente Docker ou em container separado.

## 8. Banco SQL - usuarios

### O que sera feito

Criar CRUD de usuarios em PostgreSQL usando Prisma.

### Como sera feito

Modelo recomendado no `prisma/schema.prisma`:

```prisma
model Usuario {
  id        Int      @id @default(autoincrement())
  nome      String
  email     String   @unique
  senhaHash String
  role      String   @default("USER")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Endpoints recomendados:

- `POST /auth/register`: cadastra usuario.
- `POST /auth/login`: autentica usuario e retorna JWT.
- `GET /usuarios`: lista usuarios, protegido.
- `GET /usuarios/:id`: busca usuario por id, protegido.
- `PUT /usuarios/:id`: atualiza usuario, protegido.
- `DELETE /usuarios/:id`: remove usuario, protegido.

### Regras

- Nunca retornar a senha ou `senhaHash` na resposta.
- Salvar senha com bcrypt.
- Validar email unico.
- Proteger rotas de usuarios com JWT.
- Opcional recomendado: permitir delete/listagem geral apenas para usuario `ADMIN`.

## 9. Banco NoSQL - recursos carro, moto e marca de roupa

### O que sera feito

Criar CRUD completo para tres recursos em MongoDB com Mongoose.

### Como sera feito

#### Modelo `Carro`

Campos recomendados:

- `marca`: texto obrigatorio.
- `modelo`: texto obrigatorio.
- `ano`: numero obrigatorio.
- `cor`: texto opcional.
- `preco`: numero opcional.

Endpoints:

- `POST /carros`
- `GET /carros`
- `GET /carros/:id`
- `PUT /carros/:id`
- `DELETE /carros/:id`

#### Modelo `Moto`

Campos recomendados:

- `marca`: texto obrigatorio.
- `modelo`: texto obrigatorio.
- `cilindradas`: numero obrigatorio.
- `ano`: numero obrigatorio.
- `preco`: numero opcional.

Endpoints:

- `POST /motos`
- `GET /motos`
- `GET /motos/:id`
- `PUT /motos/:id`
- `DELETE /motos/:id`

#### Modelo `MarcaRoupa`

Campos recomendados:

- `nome`: texto obrigatorio.
- `paisOrigem`: texto opcional.
- `categoria`: texto opcional, por exemplo casual, esportiva ou luxo.
- `anoFundacao`: numero opcional.

Endpoints:

- `POST /marcas-roupa`
- `GET /marcas-roupa`
- `GET /marcas-roupa/:id`
- `PUT /marcas-roupa/:id`
- `DELETE /marcas-roupa/:id`

### Regras

- Todas as rotas de CRUD devem ser protegidas com JWT.
- Validar campos obrigatorios.
- Retornar `404` quando o recurso nao existir.
- Retornar `400` para payload invalido.
- Retornar `401` quando nao houver token.
- Retornar `403` quando o usuario nao tiver permissao, se houver regra de role.

## 10. Autenticacao e autorizacao

### O que sera feito

Implementar autenticacao com JWT e protecao de rotas.

### Como sera feito

Fluxo:

1. Usuario faz cadastro em `POST /auth/register`.
2. Senha e validada e armazenada como hash.
3. Usuario faz login em `POST /auth/login`.
4. API compara senha enviada com hash salvo.
5. API gera JWT com `id`, `email` e `role`.
6. Cliente envia token em `Authorization: Bearer <token>`.
7. Middleware valida token antes de liberar rotas protegidas.

Middleware `auth` deve:

- ler o header `Authorization`;
- verificar se existe token Bearer;
- validar token com `JWT_SECRET`;
- anexar usuario decodificado em `req.user`;
- retornar `401` se o token estiver ausente, invalido ou expirado.

Middleware `authorize` deve:

- receber roles permitidas;
- comparar com `req.user.role`;
- retornar `403` quando o usuario autenticado nao tiver permissao.

## 11. Seguranca baseada em OWASP Top 10

### O que sera feito

Aplicar praticas basicas e defensivas de seguranca.

### Como sera feito

Implementar:

- Hash de senha com bcrypt.
- JWT com segredo via variavel de ambiente.
- Expiracao de token.
- Rotas protegidas por middleware.
- Validacao de entrada com Zod/Joi.
- Tratamento centralizado de erros.
- Helmet para cabecalhos HTTP seguros.
- CORS configurado.
- Rate limit para reduzir abuso em login e API.
- Nao expor stack trace em producao.
- Nao retornar senha/hash em respostas.
- Nao aceitar IDs invalidos sem validacao.
- Sanitizar/validar dados antes de persistir.

### Relacao com OWASP

- Broken Access Control: uso de JWT, roles e middleware de autorizacao.
- Cryptographic Failures: senha armazenada com hash bcrypt.
- Injection: validacao de entrada e uso de Prisma/Mongoose.
- Security Misconfiguration: Helmet, CORS e variaveis de ambiente.
- Identification and Authentication Failures: login com hash, token assinado e expiracao.

## 12. Swagger

### O que sera feito

Gerar documentacao automatica da API e disponibilizar em `/api-docs`.

### Como sera feito

- Configurar `swagger-jsdoc` com titulo, versao e servidores.
- Usar comentarios JSDoc nas rotas ou arquivo central com definicoes OpenAPI.
- Expor com `swagger-ui-express`.

Endpoints que devem aparecer no Swagger:

- Auth:
  - `POST /auth/register`
  - `POST /auth/login`
- Usuarios:
  - `GET /usuarios`
  - `GET /usuarios/{id}`
  - `PUT /usuarios/{id}`
  - `DELETE /usuarios/{id}`
- Carros:
  - `POST /carros`
  - `GET /carros`
  - `GET /carros/{id}`
  - `PUT /carros/{id}`
  - `DELETE /carros/{id}`
- Motos:
  - `POST /motos`
  - `GET /motos`
  - `GET /motos/{id}`
  - `PUT /motos/{id}`
  - `DELETE /motos/{id}`
- Marcas de roupa:
  - `POST /marcas-roupa`
  - `GET /marcas-roupa`
  - `GET /marcas-roupa/{id}`
  - `PUT /marcas-roupa/{id}`
  - `DELETE /marcas-roupa/{id}`

## 13. Testes de integracao

### O que sera feito

Criar testes de integracao com Jest e Supertest cobrindo todos os endpoints.

### Como sera feito

Arquivos recomendados:

- `tests/auth.test.js`
- `tests/usuarios.test.js`
- `tests/carros.test.js`
- `tests/motos.test.js`
- `tests/marcasRoupa.test.js`

Casos obrigatorios por recurso:

- Criar recurso com dados validos.
- Listar recursos autenticado.
- Buscar recurso por id.
- Atualizar recurso.
- Deletar recurso.
- Tentar acessar sem token e receber `401`.
- Enviar dados invalidos e receber `400`.
- Buscar id inexistente e receber `404`.

Casos obrigatorios de autenticacao:

- Registrar usuario.
- Nao registrar email duplicado.
- Login com credenciais validas.
- Login com senha incorreta.
- Login com email inexistente.
- Acessar rota protegida com token valido.
- Acessar rota protegida sem token.

### Observacao

Os testes devem preparar dados antes de executar e limpar dados depois, para nao dependerem de estado anterior.

## 14. Sequencia detalhada de implementacao

### Etapa 1 - Inicializar o projeto

Status: concluida.

O que sera feito:

- Criar `package.json`.
- Configurar scripts.
- Instalar dependencias.

Como sera feito:

```bash
npm init -y
npm install express dotenv cors helmet express-rate-limit jsonwebtoken bcryptjs mongoose @prisma/client zod swagger-ui-express swagger-jsdoc
npm install -D jest supertest nodemon prisma
```

Scripts recomendados:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --runInBand",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  }
}
```

Mesmo existindo `npm start`, a entrega deve documentar que a execucao principal e via Docker.

O que foi feito:

- `package.json` foi criado e configurado.
- Dependencias de producao e desenvolvimento foram instaladas.
- Scripts `start`, `dev`, `test`, `prisma:generate`, `prisma:migrate` e `prisma:deploy` foram configurados.

Como foi feito:

- Projeto inicializado com npm.
- Prisma foi mantido na serie `6.x`; apos `npm audit fix`, o lockfile resolveu `6.19.3`.
- Testes foram configurados para rodar com Jest em modo sequencial.

### Etapa 2 - Criar configuracao base do Express

Status: concluida.

O que sera feito:

- Criar `src/app.js`.
- Criar `src/server.js`.
- Criar rota `GET /health`.

Como sera feito:

- `app.js` exporta a instancia Express.
- `server.js` importa o app, conecta bancos e chama `listen`.
- `/health` retorna status simples para validar container.

O que foi feito:

- Criados `src/app.js` e `src/server.js`.
- Criada rota `GET /health`.

Como foi feito:

- `app.js` monta middlewares, Swagger e rotas.
- `server.js` conecta Prisma, MongoDB e inicia o servidor.

### Etapa 3 - Configurar bancos

Status: concluida.

O que sera feito:

- Configurar Prisma/PostgreSQL.
- Configurar Mongoose/MongoDB.

Como sera feito:

- Criar `prisma/schema.prisma` com datasource PostgreSQL.
- Rodar migration de usuario.
- Criar `src/config/prisma.js`.
- Criar `src/config/mongo.js`.
- Usar `DATABASE_URL` e `MONGO_URI` do ambiente.

O que foi feito:

- Criado `prisma/schema.prisma`.
- Criada migration inicial em `prisma/migrations/20260621120000_init/migration.sql`.
- Criadas configuracoes `src/config/prisma.js` e `src/config/mongo.js`.
- Criados `.env.example` e `.env` local.

Como foi feito:

- PostgreSQL usa Prisma Client.
- MongoDB usa Mongoose.
- A migration foi aplicada com `npx prisma migrate deploy`.

### Etapa 4 - Implementar usuarios e autenticacao

Status: concluida.

O que sera feito:

- Criar cadastro e login.
- Criar CRUD de usuarios.
- Implementar hash de senha.
- Implementar JWT.

Como sera feito:

- `auth.service.js` cuida de register/login.
- `usuario.service.js` cuida de CRUD SQL.
- `auth.middleware.js` protege rotas.
- `usuario.schema.js` valida payloads.

O que foi feito:

- Implementados cadastro e login.
- Implementado CRUD de usuarios.
- Implementado hash de senha.
- Implementado JWT.

Como foi feito:

- `auth.service.js` gera token JWT.
- `usuario.service.js` usa Prisma para operar no PostgreSQL.
- `auth.middleware.js` valida Bearer token e role.
- Rotas de usuario foram protegidas.

### Etapa 5 - Implementar CRUDs NoSQL

Status: concluida.

O que sera feito:

- Criar modelos Mongoose.
- Criar services, controllers e rotas de carros, motos e marcas de roupa.

Como sera feito:

- Cada recurso tera model, schema, service, controller e route.
- Rotas usam `auth.middleware.js`.
- IDs MongoDB serao validados antes de buscar/alterar/remover.

O que foi feito:

- Implementados CRUDs de carros, motos e marcas de roupa.
- Criados models, schemas, services, controllers e routes.

Como foi feito:

- Os recursos NoSQL usam Mongoose.
- As rotas sao protegidas por JWT.
- IDs MongoDB sao validados com Zod antes do acesso.

### Etapa 6 - Implementar seguranca

Status: concluida.

O que sera feito:

- Adicionar middlewares globais de seguranca.

Como sera feito:

- Aplicar `helmet()`.
- Aplicar `cors()` com configuracao.
- Aplicar `express.json({ limit: "10kb" })`.
- Aplicar rate limit global e/ou especifico para login.
- Aplicar validacao de entrada com schemas.
- Aplicar middleware central de erro.

O que foi feito:

- Helmet, CORS e rate limit foram configurados.
- Validacao de entrada foi aplicada.
- Tratamento centralizado de erro foi criado.

Como foi feito:

- `security.middleware.js` aplica middlewares globais.
- `validate.middleware.js` padroniza validacao com Zod.
- `error.middleware.js` centraliza erros e 404.

### Etapa 7 - Implementar Swagger

Status: concluida.

O que sera feito:

- Criar documentacao OpenAPI.

Como sera feito:

- Criar `src/swagger/swagger.js`.
- Registrar `/api-docs`.
- Documentar todos os endpoints e schemas.
- Incluir autenticacao Bearer JWT no Swagger.

O que foi feito:

- Swagger foi implementado em `/api-docs`.
- JSON OpenAPI foi exposto em `/api-docs.json`.

Como foi feito:

- `swagger-jsdoc` gera a especificacao.
- `swagger-ui-express` exibe a interface visual.
- A autenticacao Bearer JWT foi documentada.

### Etapa 8 - Implementar testes

Status: concluida.

O que sera feito:

- Testar todos os endpoints.

Como sera feito:

- Usar Supertest contra o `app.js`.
- Criar usuario de teste e obter token antes dos testes protegidos.
- Testar sucesso e falhas principais.
- Limpar bancos entre testes.

O que foi feito:

- Criados testes de auth, usuarios, carros, motos e marcas de roupa.
- Criado helper compartilhado para conexao, limpeza e usuario autenticado.

Como foi feito:

- Supertest chama `src/app.js`.
- Jest executa 5 suites.
- Resultado validado: 37 testes passaram.

### Etapa 9 - Conteinerizar e validar

Status: concluida.

O que sera feito:

- Criar Dockerfile.
- Criar docker-compose.
- Validar API, bancos, Swagger e testes.

Como sera feito:

```bash
docker compose up --build
```

Depois validar:

```bash
docker compose ps
```

Testar:

```bash
curl http://localhost:3000/health
```

E abrir:

```text
http://localhost:3000/api-docs
```

O que foi feito:

- Dockerfile criado.
- `docker-compose.yml` criado com API, PostgreSQL e MongoDB.
- Build e execucao da API via Docker validados.

Como foi feito:

- Executado `docker compose up --build -d api`.
- Logs confirmaram migration do Prisma e servidor na porta 3000.
- `/health` retornou `ok`.
- `/api-docs.json` retornou OpenAPI `3.0.0`.

### Etapa 10 - Documentacao e entrega

Status: parcialmente concluida.

O que sera feito:

- Criar README.
- Incluir comandos Docker.
- Incluir descricao da arquitetura.
- Incluir link do Swagger.
- Incluir texto escrito minimo de 10 linhas.
- Subir para GitHub publico.

Como sera feito:

- README deve explicar tecnologias, bancos, rotas e como executar.
- Confirmar que o repositorio possui Dockerfile, docker-compose, `.env.example`, testes e Swagger.
- Publicar no GitHub e entregar o link.

O que foi feito:

- README foi criado.
- Documentacao escrita foi incluida no README e neste checklist.

Como foi feito:

- O README descreve tecnologias, arquitetura, execucao via Docker, testes, rotas, seguranca e documentacao escrita.

Falta:

- Publicar o repositorio no GitHub.
- Confirmar que o repositorio esta publico.
- Informar o link final.
- Observacao: `git rev-parse --show-toplevel` mostrou `C:/Users/wever`, ou seja, ha um repositorio Git em diretorio pai. Nao publicar a partir dessa raiz, pois ela inclui arquivos fora do trabalho.
- Observacao: o GitHub CLI (`gh`) nao esta instalado nesta maquina. Para publicar, criar um repositorio Git separado dentro desta pasta ou enviar os arquivos manualmente pelo GitHub Desktop/site.

Validacao executada:

- `npx prisma generate`: sucesso.
- `npx prisma migrate deploy`: sucesso.
- `npm test`: 5 suites passaram, 37 testes passaram.
- `docker compose up --build -d api`: sucesso.
- `GET http://localhost:3000/health`: retornou `ok`.
- `GET http://localhost:3000/api-docs.json`: retornou OpenAPI `3.0.0`.
- `npm audit fix`: aplicado para remover vulnerabilidades altas do Prisma CLI.
- `npm audit --omit=dev`: encontrou 0 vulnerabilidades em dependencias de producao.
- Observacao: restam vulnerabilidades moderadas apenas na cadeia de desenvolvimento do Jest; o fix sugerido pelo npm exige alteracao quebravel de versao, entao nao foi aplicado.

## 15. Checklist de aceite antes da entrega

Marcar cada item ao finalizar:

- [x] `todo.md` analisado.
- [x] `checklist.md` criado com plano de execucao.
- [x] Projeto Node.js inicializado.
- [x] Dependencias instaladas.
- [x] Estrutura de pastas criada.
- [x] `.env.example` criado.
- [x] Dockerfile criado.
- [x] `docker-compose.yml` criado.
- [x] PostgreSQL configurado.
- [x] MongoDB configurado.
- [x] Prisma configurado.
- [x] Migration de usuario criada.
- [x] Modelo SQL `Usuario` criado.
- [x] Modelos MongoDB criados.
- [x] CRUD de usuarios implementado.
- [x] CRUD de carros implementado.
- [x] CRUD de motos implementado.
- [x] CRUD de marcas de roupa implementado.
- [x] Cadastro de usuario implementado.
- [x] Login implementado.
- [x] JWT implementado.
- [x] Middleware de autenticacao implementado.
- [x] Middleware de autorizacao implementado.
- [x] Validacao de entrada implementada.
- [x] Helmet configurado.
- [x] CORS configurado.
- [x] Rate limit configurado.
- [x] Tratamento centralizado de erros implementado.
- [x] Swagger implementado.
- [x] Testes de auth implementados.
- [x] Testes de usuarios implementados.
- [x] Testes de carros implementados.
- [x] Testes de motos implementados.
- [x] Testes de marcas de roupa implementados.
- [x] Execucao via Docker validada.
- [x] Swagger acessivel em `/api-docs`.
- [x] README/documentacao criada.
- [ ] Repositorio publicado no GitHub.
- [ ] Link publico conferido.

## 16. Parte para transcrever no papel

Copiar este texto na documentacao escrita/manual. Ele possui mais de 10 linhas e cobre arquitetura, tecnologias e decisoes adotadas.

```text
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
Os testes de integracao foram planejados com Jest e Supertest para validar os endpoints principais e os fluxos de erro.
A documentacao automatica da API foi gerada com Swagger, facilitando a visualizacao e o teste das rotas.
A aplicacao foi conteinerizada com Docker, usando docker-compose para orquestrar a API, o PostgreSQL e o MongoDB.
O fluxo principal de execucao do projeto acontece via Docker, conforme exigido, sem depender de npm run dev ou npm start para a entrega.
Essa arquitetura foi escolhida por ser simples, organizada, facil de testar e adequada aos requisitos de seguranca, persistencia e documentacao do trabalho.
```

## 17. README sugerido

### O que sera feito

Criar um `README.md` com instrucoes objetivas.

### Como sera feito

Estrutura recomendada:

```text
# API T2 - Node.js, Express, PostgreSQL e MongoDB

## Tecnologias
- Node.js
- Express
- PostgreSQL
- MongoDB
- Prisma
- Mongoose
- JWT
- Docker
- Jest
- Supertest
- Swagger

## Como executar
1. Copie `.env.example` para `.env`, se necessario.
2. Execute `docker compose up --build`.
3. Acesse `http://localhost:3000/health`.
4. Acesse a documentacao em `http://localhost:3000/api-docs`.

## Testes
Com os servicos configurados, execute os testes conforme script definido no projeto.

## Rotas principais
- `/auth/register`
- `/auth/login`
- `/usuarios`
- `/carros`
- `/motos`
- `/marcas-roupa`

## Seguranca
A API usa JWT, bcrypt, validacao de entrada, Helmet, CORS e rate limit.
```

## 18. Ordem de trabalho para o proximo agente

Se outro agente assumir, seguir exatamente esta ordem:

1. Ler `todo.md`.
2. Ler este `checklist.md`.
3. Criar o projeto Node.js.
4. Implementar a base Express.
5. Subir Docker com PostgreSQL e MongoDB.
6. Implementar usuarios SQL primeiro, pois auth depende disso.
7. Implementar JWT e rotas protegidas.
8. Implementar CRUDs NoSQL.
9. Implementar Swagger.
10. Implementar testes.
11. Rodar validacao via Docker.
12. Atualizar este checklist marcando o que foi concluido.
13. Criar README.
14. Publicar no GitHub.

## 19. Criterios de qualidade

Antes de considerar pronto:

- Nenhuma rota protegida deve funcionar sem token.
- Nenhuma resposta deve expor senha ou hash de senha.
- Todos os CRUDs devem ter tratamento para sucesso, erro de validacao e item inexistente.
- Swagger deve abrir sem erro.
- Docker deve subir a aplicacao e os bancos.
- O projeto deve ser executavel por outra pessoa apenas com Docker e as instrucoes do README.
- Os testes devem cobrir todos os recursos exigidos no enunciado.
- O link do GitHub deve estar publico.

## 20. Observacoes finais

- A prioridade e cumprir integralmente o enunciado.
- Evitar funcionalidades extras que aumentem o risco de erro.
- Manter o codigo simples, legivel e dividido por responsabilidade.
- Sempre que uma etapa for concluida, atualizar este arquivo informando:
  - o que foi feito;
  - como foi feito;
  - quais arquivos foram criados ou alterados;
  - qual e a proxima etapa.

