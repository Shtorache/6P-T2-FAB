const carroService = require("../services/carro.service");
const createCrudController = require("./crudNoSql.controller");

module.exports = createCrudController(carroService);

