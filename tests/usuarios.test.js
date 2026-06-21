const {
  app,
  request,
  connectDatabases,
  disconnectDatabases,
  cleanDatabases,
  createAuthUser
} = require("./helpers");

let adminToken;
let userToken;
let usuarioId;

beforeAll(async () => {
  await connectDatabases();
});

beforeEach(async () => {
  await cleanDatabases();
  const admin = await createAuthUser("ADMIN");
  const user = await createAuthUser("USER");
  adminToken = admin.token;
  userToken = user.token;
  usuarioId = user.usuario.id;
});

afterAll(async () => {
  await disconnectDatabases();
});

describe("Usuarios", () => {
  test("lista usuarios como admin", async () => {
    const response = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].senhaHash).toBeUndefined();
  });

  test("bloqueia listagem para usuario comum", async () => {
    const response = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(403);
  });

  test("busca usuario por id", async () => {
    const response = await request(app)
      .get(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(usuarioId);
  });

  test("atualiza usuario", async () => {
    const response = await request(app)
      .put(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ nome: "Usuario Atualizado" });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Usuario Atualizado");
  });

  test("remove usuario como admin", async () => {
    const response = await request(app)
      .delete(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(204);
  });

  test("retorna 404 para usuario inexistente", async () => {
    const response = await request(app)
      .get("/usuarios/999999")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(404);
  });

  test("retorna 400 para id invalido", async () => {
    const response = await request(app)
      .get("/usuarios/abc")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(400);
  });
});

