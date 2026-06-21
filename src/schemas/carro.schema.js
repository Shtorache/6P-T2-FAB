const { z } = require("zod");
const { mongoIdParamSchema } = require("./common.schema");

const body = {
  marca: z.string().trim().min(1).max(80),
  modelo: z.string().trim().min(1).max(80),
  ano: z.coerce.number().int().min(1886).max(2100),
  cor: z.string().trim().max(50).optional(),
  preco: z.coerce.number().nonnegative().optional()
};

const createCarroSchema = z.object({
  body: z.object(body)
});

const updateCarroSchema = mongoIdParamSchema.extend({
  body: z.object(body).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao"
  })
});

module.exports = {
  createCarroSchema,
  updateCarroSchema,
  carroIdSchema: mongoIdParamSchema
};

