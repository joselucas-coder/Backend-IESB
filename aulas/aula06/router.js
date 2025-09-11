const express = require("express");
// middlware de roteamento
const router = express.Router();
router.get('/', (req, res) => {
    res.send("Listar as Tarefas");
});

router.post('/', (req, res) => {
    res.status(201).send("Tarefa criada com sucesso");
});

router.put('/:id', (req, res) => {
    const {id} = req.params; // desestruturando o objeto
    if (id == 1) return res.send("Tarefa atualizada");
    res.status(404).send("Tarefa não encontrada");
});
router.delete('/:id', (req, res) => {
    const {id} = req.params; // desestruturando o objeto
    if (id == 1) return res.status(204).end(); // sem conteudo
    throw Error("Tarefa não encontrada");


});