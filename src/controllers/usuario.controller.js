const usuarioService = require("../services/usuario.service");

async function list(req, res) {
  const usuarios = await usuarioService.listUsuarios();
  res.json(usuarios);
}

async function create(req, res) {
  const usuario = await usuarioService.createUsuario(req.validated.body);
  res.status(201).json(usuario);
}

async function getById(req, res) {
  const usuario = await usuarioService.getUsuarioById(req.validated.params.id);
  res.json(usuario);
}

async function update(req, res) {
  const usuario = await usuarioService.updateUsuario(
    req.validated.params.id,
    req.validated.body
  );
  res.json(usuario);
}

async function remove(req, res) {
  await usuarioService.deleteUsuario(req.validated.params.id);
  res.status(204).send();
}

module.exports = {
  list,
  create,
  getById,
  update,
  remove
};
