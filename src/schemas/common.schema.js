const { z } = require("zod");

const mongoIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Id MongoDB invalido")
  })
});

const sqlIdParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("Id invalido")
  })
});

module.exports = {
  mongoIdParamSchema,
  sqlIdParamSchema
};

