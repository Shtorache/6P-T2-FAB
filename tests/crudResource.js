function runCrudResourceTests({ label, endpoint, validPayload, updatePayload, expectedUpdate }) {
  describe(label, () => {
    test("bloqueia listagem sem token", async () => {
      const response = await global.apiRequest.get(endpoint);
      expect(response.status).toBe(401);
    });

    test("cria recurso com dados validos", async () => {
      const response = await global.apiRequest
        .post(endpoint)
        .set("Authorization", `Bearer ${global.authToken}`)
        .send(validPayload);

      expect(response.status).toBe(201);
      expect(response.body._id).toBeDefined();
    });

    test("lista recursos autenticado", async () => {
      await global.apiRequest
        .post(endpoint)
        .set("Authorization", `Bearer ${global.authToken}`)
        .send(validPayload);

      const response = await global.apiRequest
        .get(endpoint)
        .set("Authorization", `Bearer ${global.authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });

    test("busca recurso por id", async () => {
      const created = await global.apiRequest
        .post(endpoint)
        .set("Authorization", `Bearer ${global.authToken}`)
        .send(validPayload);

      const response = await global.apiRequest
        .get(`${endpoint}/${created.body._id}`)
        .set("Authorization", `Bearer ${global.authToken}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(created.body._id);
    });

    test("atualiza recurso", async () => {
      const created = await global.apiRequest
        .post(endpoint)
        .set("Authorization", `Bearer ${global.authToken}`)
        .send(validPayload);

      const response = await global.apiRequest
        .put(`${endpoint}/${created.body._id}`)
        .set("Authorization", `Bearer ${global.authToken}`)
        .send(updatePayload);

      expect(response.status).toBe(200);
      expect(response.body[expectedUpdate.field]).toBe(expectedUpdate.value);
    });

    test("remove recurso", async () => {
      const created = await global.apiRequest
        .post(endpoint)
        .set("Authorization", `Bearer ${global.authToken}`)
        .send(validPayload);

      const response = await global.apiRequest
        .delete(`${endpoint}/${created.body._id}`)
        .set("Authorization", `Bearer ${global.authToken}`);

      expect(response.status).toBe(204);
    });

    test("retorna 400 com dados invalidos", async () => {
      const response = await global.apiRequest
        .post(endpoint)
        .set("Authorization", `Bearer ${global.authToken}`)
        .send({});

      expect(response.status).toBe(400);
    });

    test("retorna 404 para id inexistente", async () => {
      const response = await global.apiRequest
        .get(`${endpoint}/507f1f77bcf86cd799439011`)
        .set("Authorization", `Bearer ${global.authToken}`);

      expect(response.status).toBe(404);
    });
  });
}

module.exports = runCrudResourceTests;

