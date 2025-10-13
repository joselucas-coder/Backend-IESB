// controllers/tarefaController.js
const model = require("./");

const listarTarefas = async (req, res) => {
  try {
    const tarefas = await model.listar();
    return res.json(tarefas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Erro ao listar tarefas" });
  }
};

const criarTarefa = async (req, res) => {
  try {
    const novaTarefa = await model.criar(req.body);
    return res.status(201).json(novaTarefa);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Erro ao criar tarefa" });
  }
};

// middleware que busca por id e seta req.tarefa
const pesquisarId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);
    if (Number.isNaN(idNum)) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    // tenta usar um método específico se existir (ex: buscarPorId), senão lista e procura
    let tarefaEncontrada = null;
    if (typeof model.buscarPorId === "function") {
      tarefaEncontrada = await model.buscarPorId(idNum);
    } else {
      const tarefas = await model.listar();
      tarefaEncontrada = tarefas.find((item) => item.id === idNum);
    }

    if (tarefaEncontrada) {
      req.tarefa = tarefaEncontrada;
      return next();
    }

    return res.status(404).json({ msg: "Tarefa não encontrada" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Erro ao buscar tarefa" });
  }
};

const exibirTarefa = (req, res) => {
  if (!req.tarefa) {
    return res.status(500).json({ msg: "Middleware pesquisarId não setou req.tarefa" });
  }
  return res.json(req.tarefa);
};

const alterarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);
    if (Number.isNaN(idNum)) return res.status(400).json({ msg: "ID inválido" });

    const tarefaAtualizada = await model.alterar({ id: idNum, ...req.body });

    if (!tarefaAtualizada) {
      return res.status(404).json({ msg: "Tarefa não encontrada" });
    }

    return res.json(tarefaAtualizada);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Erro ao alterar tarefa" });
  }
};

const apagarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);
    if (Number.isNaN(idNum)) return res.status(400).json({ msg: "ID inválido" });

    const resultado = await model.excluir(idNum);
    // dependendo da implementação do model, 'resultado' pode ser:
    // - true/false
    // - objeto removido
    // - número de itens removidos
    const excluiu = !!resultado && (resultado === true || (typeof resultado === "object") || Number(resultado) > 0);

    if (!excluiu) {
      return res.status(404).json({ msg: "Tarefa não encontrada" });
    }

    // 204 No Content é uma boa prática para DELETE bem-sucedido sem corpo
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Erro ao excluir tarefa" });
  }
};

module.exports = {
  listarTarefas,
  criarTarefa,
  pesquisarId,
  alterarTarefa,
  apagarTarefa,
  exibirTarefa,
};
