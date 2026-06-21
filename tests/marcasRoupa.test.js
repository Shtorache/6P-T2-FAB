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
  label: "Marcas de roupa",
  endpoint: "/marcas-roupa",
  validPayload: {
    nome: "Reserva",
    paisOrigem: "Brasil",
    categoria: "Casual",
    anoFundacao: 2004
  },
  updatePayload: { categoria: "Esportiva" },
  expectedUpdate: { field: "categoria", value: "Esportiva" }
});

