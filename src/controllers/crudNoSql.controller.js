function createCrudController(service) {
  async function list(req, res) {
    const resources = await service.list();
    res.json(resources);
  }

  async function getById(req, res) {
    const resource = await service.getById(req.validated.params.id);
    res.json(resource);
  }

  async function create(req, res) {
    const resource = await service.create(req.validated.body);
    res.status(201).json(resource);
  }

  async function update(req, res) {
    const resource = await service.update(req.validated.params.id, req.validated.body);
    res.json(resource);
  }

  async function remove(req, res) {
    await service.remove(req.validated.params.id);
    res.status(204).send();
  }

  return {
    list,
    getById,
    create,
    update,
    remove
  };
}

module.exports = createCrudController;

