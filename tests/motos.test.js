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
  label: "Motos",
  endpoint: "/motos",
  validPayload: {
    marca: "Honda",
    modelo: "CB 500F",
    cilindradas: 500,
    ano: 2023,
    preco: 38000
  },
  updatePayload: { preco: 36000 },
  expectedUpdate: { field: "preco", value: 36000 }
});

