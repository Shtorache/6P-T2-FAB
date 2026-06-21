const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const env = require("../config/env");
const AppError = require("../utils/AppError");
const { createUsuario, sanitizeUsuario } = require("./usuario.service");

function signToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      role: usuario.role
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

async function register(data) {
  const usuario = await createUsuario(data);
  const token = signToken(usuario);
  return { usuario, token };
}

async function login(data) {
  const usuario = await prisma.usuario.findUnique({
    where: { email: data.email }
  });

  if (!usuario) {
    throw new AppError("Credenciais invalidas", 401);
  }

  const passwordOk = await bcrypt.compare(data.senha, usuario.senhaHash);

  if (!passwordOk) {
    throw new AppError("Credenciais invalidas", 401);
  }

  const safeUsuario = sanitizeUsuario(usuario);
  const token = signToken(safeUsuario);
  return { usuario: safeUsuario, token };
}

module.exports = {
  register,
  login
};

