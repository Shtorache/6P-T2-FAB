const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const env = require("../config/env");
const AppError = require("../utils/AppError");

function sanitizeUsuario(usuario) {
  if (!usuario) {
    return null;
  }

  const { senhaHash, ...safeUsuario } = usuario;
  return safeUsuario;
}

async function listUsuarios() {
  const usuarios = await prisma.usuario.findMany({
    orderBy: { id: "asc" }
  });
  return usuarios.map(sanitizeUsuario);
}

async function getUsuarioById(id) {
  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) }
  });

  if (!usuario) {
    throw new AppError("Usuario nao encontrado", 404);
  }

  return sanitizeUsuario(usuario);
}

async function createUsuario(data) {
  const exists = await prisma.usuario.findUnique({
    where: { email: data.email }
  });

  if (exists) {
    throw new AppError("Email ja cadastrado", 409);
  }

  const senhaHash = await bcrypt.hash(data.senha, env.bcryptSaltRounds);

  const usuario = await prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      senhaHash,
      role: data.role || "USER"
    }
  });

  return sanitizeUsuario(usuario);
}

async function updateUsuario(id, data) {
  await getUsuarioById(id);

  if (data.email) {
    const emailOwner = await prisma.usuario.findUnique({
      where: { email: data.email }
    });

    if (emailOwner && emailOwner.id !== Number(id)) {
      throw new AppError("Email ja cadastrado", 409);
    }
  }

  const updateData = { ...data };
  delete updateData.senha;

  if (data.senha) {
    updateData.senhaHash = await bcrypt.hash(data.senha, env.bcryptSaltRounds);
  }

  const usuario = await prisma.usuario.update({
    where: { id: Number(id) },
    data: updateData
  });

  return sanitizeUsuario(usuario);
}

async function deleteUsuario(id) {
  await getUsuarioById(id);
  await prisma.usuario.delete({
    where: { id: Number(id) }
  });
}

module.exports = {
  sanitizeUsuario,
  listUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};

