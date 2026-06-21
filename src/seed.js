const bcrypt = require("bcryptjs");
const prisma = require("./config/prisma");
const env = require("./config/env");
const Carro = require("./models/carro.model");
const Moto = require("./models/moto.model");
const MarcaRoupa = require("./models/marcaRoupa.model");

const sampleUsers = [
  { nome: "Admin P2", email: "admin@p2.local", senha: "senha123", role: "ADMIN" },
  { nome: "Joao Silva", email: "joao@p2.local", senha: "Senha123", role: "USER" },
  { nome: "Maria Costa", email: "maria@p2.local", senha: "Senha123", role: "USER" }
];

const sampleCarros = [
  { marca: "Tesla", modelo: "Model S", ano: 2023, cor: "Preto", preco: 425000 },
  { marca: "BMW", modelo: "M3", ano: 2022, cor: "Azul", preco: 320000 },
  { marca: "Audi", modelo: "RS7", ano: 2024, cor: "Cinza", preco: 410000 }
];

const sampleMotos = [
  { marca: "Yamaha", modelo: "MT-09", cilindradas: 847, ano: 2023, preco: 62000 },
  { marca: "Honda", modelo: "CBR600RR", cilindradas: 599, ano: 2022, preco: 54000 },
  { marca: "Ducati", modelo: "Panigale V4", cilindradas: 1103, ano: 2024, preco: 195000 }
];

const sampleMarcas = [
  { nome: "CyberWear", paisOrigem: "EUA", categoria: "Streetwear", anoFundacao: 2018 },
  { nome: "NovaTech", paisOrigem: "Japao", categoria: "Athleisure", anoFundacao: 2016 },
  { nome: "Lumiere", paisOrigem: "Franca", categoria: "High-fashion", anoFundacao: 2020 }
];

async function ensureUser(user) {
  const exists = await prisma.usuario.findUnique({ where: { email: user.email } });
  if (!exists) {
    const senhaHash = await bcrypt.hash(user.senha, env.bcryptSaltRounds);
    await prisma.usuario.create({
      data: {
        nome: user.nome,
        email: user.email,
        senhaHash,
        role: user.role || "USER"
      }
    });
  }
}

async function seedCollection(Model, items) {
  const count = await Model.countDocuments();
  if (count === 0) {
    await Model.insertMany(items);
  }
}

async function seedDatabase() {
  try {
    await Promise.all(sampleUsers.map(ensureUser));
    await seedCollection(Carro, sampleCarros);
    await seedCollection(Moto, sampleMotos);
    await seedCollection(MarcaRoupa, sampleMarcas);
    console.log("Seed inicial aplicada com sucesso.");
  } catch (error) {
    console.error("Erro ao aplicar seed inicial:", error);
  }
}

async function runSeed() {
  const { connectMongo, disconnectMongo } = require("./config/mongo");

  await prisma.$connect();
  await connectMongo();
  await seedDatabase();
  await prisma.$disconnect();
  await disconnectMongo();
}

if (require.main === module) {
  runSeed().catch(async (error) => {
    console.error("Erro ao executar seed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
}

module.exports = {
  seedDatabase
};
