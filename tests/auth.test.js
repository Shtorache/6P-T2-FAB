const {
  app,
  request,
  connectDatabases,
  disconnectDatabases,
  cleanDatabases
} = require("./helpers");

beforeAll(async () => {
  await connectDatabases();
});

beforeEach(async () => {
  await cleanDatabases();
});

afterAll(async () => {
  await disconnectDatabases();
});

describe("Auth", () => {
  test("registra usuario e retorna token", async () => {
    const response = await request(app).post("/auth/register").send({
      nome: "Teste",
      email: "teste@email.com",
      senha: "123456"
    });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.usuario.email).toBe("teste@email.com");
    expect(response.body.usuario.senhaHash).toBeUndefined();
  });

  test("nao registra email duplicado", async () => {
    const payload = {
      nome: "Teste",
      email: "duplicado@email.com",
      senha: "123456"
    };

    await request(app).post("/auth/register").send(payload);
    const response = await request(app).post("/auth/register").send(payload);

    expect(response.status).toBe(409);
  });

  test("realiza login com credenciais validas", async () => {
    await request(app).post("/auth/register").send({
      nome: "Login",
      email: "login@email.com",
      senha: "123456"
    });

    const response = await request(app).post("/auth/login").send({
      email: "login@email.com",
      senha: "123456"
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test("rejeita login com senha incorreta", async () => {
    await request(app).post("/auth/register").send({
      nome: "Login",
      email: "senha@email.com",
      senha: "123456"
    });

    const response = await request(app).post("/auth/login").send({
      email: "senha@email.com",
      senha: "errada123"
    });

    expect(response.status).toBe(401);
  });

  test("rejeita login com email inexistente", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "naoexiste@email.com",
      senha: "123456"
    });

    expect(response.status).toBe(401);
  });

  test("bloqueia rota protegida sem token", async () => {
    const response = await request(app).get("/carros");

    expect(response.status).toBe(401);
  });
});

