const { z } = require("zod");
const { mongoIdParamSchema } = require("./common.schema");

const body = {
  marca: z.string().trim().min(1).max(80),
  modelo: z.string().trim().min(1).max(80),
  cilindradas: z.coerce.number().int().positive(),
  ano: z.coerce.number().int().min(1885).max(2100),
  preco: z.coerce.number().nonnegative().optional()
};

const createMotoSchema = z.object({
  body: z.object(body)
});

const updateMotoSchema = mongoIdParamSchema.extend({
  body: z.object(body).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao"
  })
});

module.exports = {
  createMotoSchema,
  updateMotoSchema,
  motoIdSchema: mongoIdParamSchema
};

