const env = require("../config/env");

function notFound(req, res, next) {
  const error = new Error(`Rota nao encontrada: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const response = {
    message: err.message || "Erro interno do servidor"
  };

  if (env.nodeEnv !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = {
  notFound,
  errorHandler
};

