const { z } = require("zod");
const { mongoIdParamSchema } = require("./common.schema");

const body = {
  nome: z.string().trim().min(1).max(100),
  paisOrigem: z.string().trim().max(80).optional(),
  categoria: z.string().trim().max(80).optional(),
  anoFundacao: z.coerce.number().int().min(1000).max(2100).optional()
};

const createMarcaRoupaSchema = z.object({
  body: z.object(body)
});

const updateMarcaRoupaSchema = mongoIdParamSchema.extend({
  body: z.object(body).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizacao"
  })
});

module.exports = {
  createMarcaRoupaSchema,
  updateMarcaRoupaSchema,
  marcaRoupaIdSchema: mongoIdParamSchema
};

