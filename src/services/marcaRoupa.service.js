const MarcaRoupa = require("../models/marcaRoupa.model");
const createCrudService = require("./crudNoSql.service");

module.exports = createCrudService(MarcaRoupa, "Marca de roupa");

