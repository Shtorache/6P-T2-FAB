const Carro = require("../models/carro.model");
const createCrudService = require("./crudNoSql.service");

module.exports = createCrudService(Carro, "Carro");

