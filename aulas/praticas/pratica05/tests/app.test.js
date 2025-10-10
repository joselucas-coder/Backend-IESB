const request = require('supertest');
const app = require('../app');

describe('Testes da API de Tarefas', () => {

    let tarefaId;

    test('GET /tarefas - Deve retornar uma lista de tarefas vazia com status 200', async () => {
        const response = await request(app)
            .get('/tarefas');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    test('POST /tarefas - Deve criar uma nova tarefa e retornar com status 201', async () => {
        const novaTarefa = { nome: "Estudar Node", concluida: false };
        const response = await request(app)
            .post('/tarefas')
            .send(novaTarefa);

        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.nome).toBe(novaTarefa.nome);
        expect(response.body.concluida).toBe(novaTarefa.concluida);
        expect(response.headers['content-type']).toMatch(/json/);

        tarefaId = response.body.id; 
    });

    test('GET /tarefas/:id - Deve retornar a tarefa específica com status 200', async () => {
        const response = await request(app)
            .get(`/tarefas/${tarefaId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(tarefaId);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    test('GET /tarefas/id-invalido - Deve retornar status 404 para tarefa não encontrada', async () => {
        const response = await request(app)
            .get('/tarefas/id-invalido');
        
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe("Tarefa não encontrada");
        expect(response.headers['content-type']).toMatch(/json/);
    });

    test('PUT /tarefas/:id - Deve atualizar uma tarefa existente e retornar com status 200', async () => {
        const tarefaAtualizada = { nome: "Estudar Node e Express", concluida: true };
        const response = await request(app)
            .put(`/tarefas/${tarefaId}`)
            .send(tarefaAtualizada);

        expect(response.statusCode).toBe(200);
        expect(response.body.nome).toBe(tarefaAtualizada.nome);
        expect(response.body.concluida).toBe(tarefaAtualizada.concluida);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    test('PUT /tarefas/id-invalido - Deve retornar status 404 ao tentar atualizar tarefa inexistente', async () => {
        const response = await request(app)
            .put('/tarefas/id-invalido')
            .send({ nome: "Inexistente", concluida: false });

        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe("Tarefa não encontrada");
    });
    
    test('DELETE /tarefas/:id - Deve remover uma tarefa e retornar status 204', async () => {
        const response = await request(app)
            .delete(`/tarefas/${tarefaId}`);
            
        expect(response.statusCode).toBe(204);
        expect(response.body).toEqual({});
    });

    test('DELETE /tarefas/id-invalido - Deve retornar status 404 ao tentar remover tarefa inexistente', async () => {
        const response = await request(app)
            .delete('/tarefas/id-invalido');

        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe("Tarefa não encontrada");
    });

});

