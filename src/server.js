const app = require("./app");
const env = require("./config/env");
const prisma = require("./config/prisma");
const { connectMongo } = require("./config/mongo");

async function start() {
  await prisma.$connect();
  await connectMongo();

  app.listen(env.port, () => {
    console.log(`API executando na porta ${env.port}`);
  });
}

start().catch((error) => {
  console.error("Erro ao iniciar a aplicacao", error);
  process.exit(1);
});

