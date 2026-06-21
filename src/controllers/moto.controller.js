const motoService = require("../services/moto.service");
const createCrudController = require("./crudNoSql.controller");

module.exports = createCrudController(motoService);

