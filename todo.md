Desenvolva uma API com Node.js e Express contemplando dois contextos diferentes de persistencia de dados e cobrindo seguranca, testes e conteinerizacao da aplicacao.

### Objetivo
Criar uma aplicacao backend com:

- um CRUD simples para os recursos carro, moto e marca de roupa utilizando banco NoSQL;
- um CRUD de usuarios para acesso ao sistema utilizando banco relacional SQL;
- autenticacao e autorizacao com JWT;
- protecao de rotas com foco em boas praticas baseadas na OWASP Top 10;
- testes de integracao para todos os recursos da aplicacao.

### Requisitos obrigatorios

- Utilizar Node.js com Express.
- Utilizar variaveis de ambiente com arquivo .env.
- Implementar autenticacao com JWT.
- Criar rotas protegidas para recursos que exigem autenticacao.
- Aplicar mecanismos de autenticacao e autorizacao de acesso.
- Implementar os CRUDs solicitados:
    carro, moto e marca de roupa em banco NoSQL;
    usuarios em banco SQL relacional.
- Escrever testes de integracao com Jest e Supertest para todos os endpoints da aplicacao.
- Disponibilizar a aplicacao com Docker, incluindo:
    Dockerfile para build da aplicacao;
    docker-compose.yml para orquestracao dos servicos.
- A execucao do projeto deve acontecer via Docker. Nao utilizar npm run dev ou npm start como fluxo principal de entrega.
- Gerar documentacao automatica da API com Swagger.
- Entregar tambem uma documentacao escrita, com no minimo 10 linhas, explicando o que foi utilizado no trabalho.

### Entregaveis

- Codigo-fonte da API.
- Arquivo Dockerfile.
- Arquivo docker-compose.yml.
- Arquivo .env com orientacoes de configuracao ou exemplo equivalente.
- Testes de integracao cobrindo todos os recursos.
- Documentacao automatica via Swagger.
- Documentacao escrita descrevendo arquitetura, tecnologias e decisoes adotadas.
- Via GITHUB, link público.
