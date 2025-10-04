let tarefas = [];

function gerarId() {
    return Math.random().toString(36).substring(2, 9);
}

function listar() {
    return tarefas;
}

function criar(tarefa) {
    const novaTarefa = { ...tarefa, id: gerarId() };
    tarefas.push(novaTarefa);
    return novaTarefa;
}

function buscarPeloId(tarefaId) {
    return tarefas.find(t => t.id === tarefaId) || null;
}

function atualizar(tarefaId, tarefaAtualizada) {
    const index = tarefas.findIndex(t => t.id === tarefaId);
    
    if (index === -1) {
        return null;
    }

    tarefas[index] = { ...tarefas[index], ...tarefaAtualizada };
    return tarefas[index];
}

function remover(tarefaId) {
    const index = tarefas.findIndex(t => t.id === tarefaId);

    if (index === -1) {
        return null;
    }

    const [tarefaRemovida] = tarefas.splice(index, 1);
    return tarefaRemovida;
}

module.exports = {
    listar,
    criar,
    buscarPeloId,
    atualizar,
    remover
};

