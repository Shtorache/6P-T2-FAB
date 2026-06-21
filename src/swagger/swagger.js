const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API T2 - Node.js, Express, PostgreSQL e MongoDB",
      version: "1.0.0",
      description:
        "API com autenticacao JWT, CRUD SQL de usuarios e CRUD NoSQL de carros, motos e marcas de roupa."
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Login: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: { type: "string", example: "admin@email.com" },
            senha: { type: "string", example: "123456" }
          }
        },
        RegistroUsuario: {
          type: "object",
          required: ["nome", "email", "senha"],
          properties: {
            nome: { type: "string", example: "Admin" },
            email: { type: "string", example: "admin@email.com" },
            senha: { type: "string", example: "123456" },
            role: { type: "string", enum: ["USER", "ADMIN"], example: "ADMIN" }
          }
        },
        Usuario: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nome: { type: "string", example: "Admin" },
            email: { type: "string", example: "admin@email.com" },
            role: { type: "string", example: "ADMIN" }
          }
        },
        Carro: {
          type: "object",
          required: ["marca", "modelo", "ano"],
          properties: {
            marca: { type: "string", example: "Toyota" },
            modelo: { type: "string", example: "Corolla" },
            ano: { type: "integer", example: 2024 },
            cor: { type: "string", example: "Prata" },
            preco: { type: "number", example: 150000 }
          }
        },
        Moto: {
          type: "object",
          required: ["marca", "modelo", "cilindradas", "ano"],
          properties: {
            marca: { type: "string", example: "Honda" },
            modelo: { type: "string", example: "CB 500F" },
            cilindradas: { type: "integer", example: 500 },
            ano: { type: "integer", example: 2023 },
            preco: { type: "number", example: 38000 }
          }
        },
        MarcaRoupa: {
          type: "object",
          required: ["nome"],
          properties: {
            nome: { type: "string", example: "Reserva" },
            paisOrigem: { type: "string", example: "Brasil" },
            categoria: { type: "string", example: "Casual" },
            anoFundacao: { type: "integer", example: 2004 }
          }
        }
      }
    },
    paths: {
      "/health": {
        get: {
          summary: "Verifica saude da API",
          responses: { 200: { description: "API em execucao" } }
        }
      },
      "/auth/register": {
        post: {
          summary: "Cadastra usuario",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegistroUsuario" }
              }
            }
          },
          responses: {
            201: { description: "Usuario cadastrado" },
            409: { description: "Email ja cadastrado" }
          }
        }
      },
      "/auth/login": {
        post: {
          summary: "Autentica usuario",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Login" }
              }
            }
          },
          responses: {
            200: { description: "Login realizado" },
            401: { description: "Credenciais invalidas" }
          }
        }
      }
    }
  },
  apis: []
});

const crudPaths = {
  usuarios: {
    base: "/usuarios",
    schema: "Usuario",
    protected: true,
    create: false
  },
  carros: {
    base: "/carros",
    schema: "Carro",
    protected: true,
    create: true
  },
  motos: {
    base: "/motos",
    schema: "Moto",
    protected: true,
    create: true
  },
  marcasRoupa: {
    base: "/marcas-roupa",
    schema: "MarcaRoupa",
    protected: true,
    create: true
  }
};

Object.values(crudPaths).forEach((resource) => {
  swaggerSpec.paths[resource.base] = {
    get: {
      summary: `Lista ${resource.schema}`,
      security: [{ bearerAuth: [] }],
      responses: { 200: { description: "Lista retornada" }, 401: { description: "Token ausente" } }
    }
  };

  if (resource.create) {
    swaggerSpec.paths[resource.base].post = {
      summary: `Cria ${resource.schema}`,
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: `#/components/schemas/${resource.schema}` }
          }
        }
      },
      responses: { 201: { description: "Recurso criado" }, 400: { description: "Dados invalidos" } }
    };
  }

  swaggerSpec.paths[`${resource.base}/{id}`] = {
    get: {
      summary: `Busca ${resource.schema} por id`,
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      responses: { 200: { description: "Recurso encontrado" }, 404: { description: "Nao encontrado" } }
    },
    put: {
      summary: `Atualiza ${resource.schema}`,
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: `#/components/schemas/${resource.schema}` }
          }
        }
      },
      responses: { 200: { description: "Recurso atualizado" }, 404: { description: "Nao encontrado" } }
    },
    delete: {
      summary: `Remove ${resource.schema}`,
      security: [{ bearerAuth: [] }],
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      responses: { 204: { description: "Recurso removido" }, 404: { description: "Nao encontrado" } }
    }
  };
});

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));
}

module.exports = {
  setupSwagger,
  swaggerSpec
};

