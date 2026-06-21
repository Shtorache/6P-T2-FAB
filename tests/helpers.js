const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const prisma = require("../src/config/prisma");
const { connectMongo, disconnectMongo } = require("../src/config/mongo");
const Carro = require("../src/models/carro.model");
const Moto = require("../src/models/moto.model");
const MarcaRoupa = require("../src/models/marcaRoupa.model");

async function connectDatabases() {
  await prisma.$connect();
  if (mongoose.connection.readyState === 0) {
    await connectMongo();
  }
}

async function disconnectDatabases() {
  await prisma.$disconnect();
  if (mongoose.connection.readyState !== 0) {
    await disconnectMongo();
  }
}

async function cleanDatabases() {
  await prisma.usuario.deleteMany();
  await Carro.deleteMany({});
  await Moto.deleteMany({});
  await MarcaRoupa.deleteMany({});
}

async function createAuthUser(role = "USER") {
  const email = `${role.toLowerCase()}-${Date.now()}-${Math.random()}@email.com`;
  const response = await request(app).post("/auth/register").send({
    nome: `Usuario ${role}`,
    email,
    senha: "123456",
    role
  });

  return {
    token: response.body.token,
    usuario: response.body.usuario
  };
}

module.exports = {
  app,
  request,
  connectDatabases,
  disconnectDatabases,
  cleanDatabases,
  createAuthUser
};

