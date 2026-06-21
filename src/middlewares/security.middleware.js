const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Muitas tentativas. Tente novamente mais tarde." }
});

function applySecurity(app) {
  app.use(helmet());
  app.use(cors());
  app.use(globalLimiter);
}

module.exports = {
  applySecurity,
  authLimiter
};

