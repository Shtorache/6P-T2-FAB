const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const prisma = require("../src/config/prisma");
const env = require("../src/config/env");
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

  await prisma.usuario.create({
    data: {
      nome: `Usuario ${role}`,
      email,
      senhaHash: await bcrypt.hash("123456", env.bcryptSaltRounds),
      role
    }
  });

  const response = await request(app).post("/auth/login").send({
    email,
    senha: "123456"
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
