// 3.a) Importar o pacote do "express"
const express = require("express");

// 3.b) Criar um array em memória chamado "tarefas"
const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// 3.c) Criar uma instância de uma aplicação Express
const app = express();

// 3.d) Utilizar o middleware integrado "express.json()"
app.use(express.json());

// 3.e) Middleware de aplicação que registra a requisição
app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
  next();
});

// 4.a) Criar um roteador específico para tarefas
const tarefasRouter = express.Router();

// 4.b) Rota GET /tarefas → listar todas
tarefasRouter.get("/", (req, res) => {
  res.json(tarefas);
});

// 4.c) Rota POST /tarefas → criar nova tarefa
tarefasRouter.post("/", (req, res) => {
  const { nome, concluida } = req.body;
  const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1;

  const novaTarefa = {
    id: novoId,
    nome,
    concluida: concluida ?? false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// 4.d) Rota GET /tarefas/:tarefaId → buscar por id
tarefasRouter.get("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return next(new Error("Não localizado"));
  }

  res.json(tarefa);
});

// 4.e) Rota PUT /tarefas/:tarefaId → atualizar tarefa
tarefasRouter.put("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefaIndex = tarefas.findIndex(t => t.id === id);

  if (tarefaIndex === -1) {
    return next(new Error("Não localizado"));
  }

  const tarefaAtualizada = { ...tarefas[tarefaIndex], ...req.body };
  tarefas[tarefaIndex] = tarefaAtualizada;

  res.json(tarefaAtualizada);
});

// 4.f) Rota DELETE /tarefas/:tarefaId → excluir tarefa
tarefasRouter.delete("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefaIndex = tarefas.findIndex(t => t.id === id);

  if (tarefaIndex === -1) {
    return next(new Error("Não localizado"));
  }

  tarefas.splice(tarefaIndex, 1);
  res.status(204).send();
});

// Montar o roteador no caminho base /tarefas
app.use("/tarefas", tarefasRouter);

// 5.d) Middleware de erro
app.use((err, req, res, next) => {
  res.status(400).json({ message: err.message });
});

// 3.f) Servidor ouvindo na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

// 3.g) Exportar a instância da aplicação Express
module.exports = app;
