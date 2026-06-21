(async () => {
  const base = 'http://localhost:3000';
  const results = [];
  async function req(path, opts = {}) {
    try {
      const res = await fetch(base + path, opts);
      const text = await res.text();
      let body;
      try { body = JSON.parse(text); } catch { body = text; }
      return { status: res.status, body };
    } catch (e) {
      return { error: e.message };
    }
  }

  // register validator user
  results.push({ step: 'register validator' });
  let r = await req('/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nome: 'validator', email: 'validator+2026@example.com', senha: 'Senha123!' }) });
  results.push({ action: 'register validator', r });
  const token = r.body?.token;
  const userId = r.body?.usuario?.id || r.body?.usuario?._id;

  // login
  results.push({ step: 'login validator' });
  r = await req('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'validator+2026@example.com', senha: 'Senha123!' }) });
  results.push({ action: 'login validator', r });
  const tokenLogin = r.body?.token || r.body?.accessToken || r.body?.data?.token;

  // try register admin (role field)
  results.push({ step: 'register admin attempt' });
  r = await req('/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nome: 'adminTry', email: 'adminTry+2026@example.com', senha: 'Senha123!', role: 'ADMIN' }) });
  results.push({ action: 'register admin attempt', r });
  const adminToken = r.body?.token;

  // resources
  const resources = [
    { path: '/carros', payload: { marca: 'TestMarca', modelo: 'T1', ano: 2020, cor: 'Azul', preco: 10000 }, idField: '_id' },
    { path: '/motos', payload: { marca: 'Yamaha', modelo: 'M1', cilindradas: 600, ano: 2019, preco: 8000 }, idField: '_id' },
    { path: '/marcas-roupa', payload: { nome: 'BrandX', paisOrigem: 'BR', categoria: 'casual', anoFundacao: 1990 }, idField: '_id' }
  ];

  const authHeader = () => ({ Authorization: 'Bearer ' + (tokenLogin || token) });

  for (const resrc of resources) {
    results.push({ step: `testing ${resrc.path}` });
    // create
    r = await req(resrc.path, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify(resrc.payload) });
    results.push({ action: 'create', r });
    const id = r.body?.[resrc.idField] || r.body?.id;
    // list
    const list = await req(resrc.path, { headers: { ...authHeader() } });
    results.push({ action: 'list', list });
    if (id) {
      const get = await req(`${resrc.path}/${id}`, { headers: { ...authHeader() } });
      results.push({ action: 'get', get });
      const update = await req(`${resrc.path}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify(Object.keys(resrc.payload).includes('cor') ? { cor: 'Alterado' } : { nome: 'Alterado' }) });
      results.push({ action: 'update', update });
      const del = await req(`${resrc.path}/${id}`, { method: 'DELETE', headers: { ...authHeader() } });
      results.push({ action: 'delete', del });
    }
  }

  // usuarios checks
  results.push({ step: 'usuarios checks' });
  const usuariosList = await req('/usuarios', { headers: { ...authHeader() } });
  results.push({ action: 'GET /usuarios', usuariosList });
  if (userId) {
    const getU = await req(`/usuarios/${userId}`, { headers: { ...authHeader() } });
    results.push({ action: `GET /usuarios/${userId}`, getU });
    const updU = await req(`/usuarios/${userId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify({ nome: 'validator-updated' }) });
    results.push({ action: 'PUT /usuarios/:id', updU });
    const delU = await req(`/usuarios/${userId}`, { method: 'DELETE', headers: { ...authHeader() } });
    results.push({ action: 'DELETE /usuarios/:id (as user)', delU });
  }

  // admin actions if possible
  if (adminToken) {
    results.push({ step: 'admin actions' });
    const lg = await req('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'adminTry+2026@example.com', senha: 'Senha123!' }) });
    results.push({ action: 'login adminTry', lg });
    const tAdmin = lg.body?.token;
    if (tAdmin) {
      const adminList = await req('/usuarios', { headers: { Authorization: 'Bearer ' + tAdmin } });
      results.push({ action: 'GET /usuarios as admin', adminList });
      if (userId) {
        const delUser = await req(`/usuarios/${userId}`, { method: 'DELETE', headers: { Authorization: 'Bearer ' + tAdmin } });
        results.push({ action: 'DELETE userA as admin', delUser });
      }
    }
  }

  console.log(JSON.stringify(results, null, 2));
})();
