const Moto = require("../models/moto.model");
const createCrudService = require("./crudNoSql.service");

module.exports = createCrudService(Moto, "Moto");

