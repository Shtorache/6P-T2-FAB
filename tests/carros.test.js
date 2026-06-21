const {
  app,
  request,
  connectDatabases,
  disconnectDatabases,
  cleanDatabases,
  createAuthUser
} = require("./helpers");
const runCrudResourceTests = require("./crudResource");

beforeAll(async () => {
  await connectDatabases();
});

beforeEach(async () => {
  await cleanDatabases();
  global.apiRequest = request(app);
  global.authToken = (await createAuthUser()).token;
});

afterAll(async () => {
  await disconnectDatabases();
});

runCrudResourceTests({
  label: "Carros",
  endpoint: "/carros",
  validPayload: {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2024,
    cor: "Prata",
    preco: 150000
  },
  updatePayload: { cor: "Preto" },
  expectedUpdate: { field: "cor", value: "Preto" }
});

