const AppError = require("../utils/AppError");

function createCrudService(Model, resourceName) {
  async function list() {
    return Model.find().sort({ createdAt: -1 });
  }

  async function getById(id) {
    const resource = await Model.findById(id);

    if (!resource) {
      throw new AppError(`${resourceName} nao encontrado`, 404);
    }

    return resource;
  }

  async function create(data) {
    return Model.create(data);
  }

  async function update(id, data) {
    const resource = await Model.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true
    });

    if (!resource) {
      throw new AppError(`${resourceName} nao encontrado`, 404);
    }

    return resource;
  }

  async function remove(id) {
    const resource = await Model.findByIdAndDelete(id);

    if (!resource) {
      throw new AppError(`${resourceName} nao encontrado`, 404);
    }
  }

  return {
    list,
    getById,
    create,
    update,
    remove
  };
}

module.exports = createCrudService;
