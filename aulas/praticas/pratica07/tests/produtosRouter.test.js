const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Testes da API /produtos', () => {
  let produtoId; // variável para armazenar o ID gerado

  // f) POST válido
  test('POST /produtos deve criar um produto e retornar 201', async () => {
    const resposta = await request
      .post('/produtos')
      .send({ nome: 'Laranja', preco: 10.0 })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(resposta.body).toHaveProperty('_id');
    expect(resposta.body).toHaveProperty('nome', 'Laranja');
    expect(resposta.body).toHaveProperty('preco', 10.0);

    produtoId = resposta.body._id; // g) salvar o id
  });

  // h) POST sem JSON
  test('POST /produtos sem JSON deve retornar 422', async () => {
    const resposta = await request
      .post('/produtos')
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);

    expect(resposta.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  // i) GET /produtos
  test('GET /produtos deve retornar lista de produtos', async () => {
    const resposta = await request
      .get('/produtos')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(resposta.body)).toBe(true);
  });

  // j) GET /produtos/:id válido
  test('GET /produtos/:id deve retornar o produto correto', async () => {
    const resposta = await request
      .get(`/produtos/${produtoId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body).toHaveProperty('_id', produtoId);
    expect(resposta.body).toHaveProperty('nome', 'Laranja');
    expect(resposta.body).toHaveProperty('preco', 10.0);
  });

  // k) GET /produtos/0 → parâmetro inválido
  test('GET /produtos/0 deve retornar 400', async () => {
    const resposta = await request
      .get('/produtos/0')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(resposta.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  // l) GET inexistente
  test('GET /produtos/000000000000000000000000 deve retornar 404', async () => {
    const resposta = await request
      .get('/produtos/000000000000000000000000')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(resposta.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  // m) PUT válido
  test('PUT /produtos/:id deve atualizar o produto', async () => {
    const resposta = await request
      .put(`/produtos/${produtoId}`)
      .send({ nome: 'Laranja Pera', preco: 18.0 })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body).toHaveProperty('_id', produtoId);
    expect(resposta.body).toHaveProperty('nome', 'Laranja Pera');
    expect(resposta.body).toHaveProperty('preco', 18.0);
  });

  // n) PUT sem JSON
  test('PUT /produtos/:id sem JSON deve retornar 422', async () => {
    const resposta = await request
      .put(`/produtos/${produtoId}`)
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);

    expect(resposta.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  // o) PUT /produtos/0 inválido
  test('PUT /produtos/0 deve retornar 400', async () => {
    const resposta = await request
      .put('/produtos/0')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(resposta.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  // p) PUT produto não encontrado
  test('PUT /produtos/000000000000000000000000 deve retornar 404', async () => {
    const resposta = await request
      .put('/produtos/000000000000000000000000')
      .send({ nome: 'Qualquer', preco: 10 })
      .expect('Content-Type', /json/)
      .expect(404);

    expect(resposta.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  // q) DELETE válido
  test('DELETE /produtos/:id deve remover o produto', async () => {
    await request.delete(`/produtos/${produtoId}`).expect(204);
  });

  // r) DELETE /produtos/0 inválido
  test('DELETE /produtos/0 deve retornar 400', async () => {
    const resposta = await request
      .delete('/produtos/0')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(resposta.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  // s) DELETE produto inexistente
  test('DELETE /produtos/000000000000000000000000 deve retornar 404', async () => {
    const resposta = await request
      .delete('/produtos/000000000000000000000000')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(resposta.body).toHaveProperty('msg', 'Produto não encontrado');
  });
});
