const { z } = require("zod");
const { sqlIdParamSchema } = require("./common.schema");

const roleSchema = z.enum(["USER", "ADMIN"]).optional();

const registerSchema = z.object({
  body: z.object({
    nome: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(150),
    senha: z.string().min(6).max(100),
    role: roleSchema
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email().max(150),
    senha: z.string().min(6).max(100)
  })
});

const updateUsuarioSchema = sqlIdParamSchema.extend({
  body: z
    .object({
      nome: z.string().trim().min(2).max(100).optional(),
      email: z.string().trim().email().max(150).optional(),
      senha: z.string().min(6).max(100).optional(),
      role: roleSchema
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "Informe ao menos um campo para atualizacao"
    })
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUsuarioSchema,
  usuarioIdSchema: sqlIdParamSchema
};

