const marcaRoupaService = require("../services/marcaRoupa.service");
const createCrudController = require("./crudNoSql.controller");

module.exports = createCrudController(marcaRoupaService);

