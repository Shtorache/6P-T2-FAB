require("dotenv").config();

const env = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/t2_api?schema=public",
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/t2_api",
  jwtSecret: process.env.JWT_SECRET || "troque_esta_chave_em_producao",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10)
};

module.exports = env;

