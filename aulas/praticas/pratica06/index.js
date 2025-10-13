const readline = require("readline-sync")
const controlador = require("./controlador.js")

function menu() {
  console.log("\n=== MENU PRINCIPAL ===");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair")
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case "1": {
      const nome = readline.question("Digite o nome da tarefa: ");
      await controlador.adicionarTarefa(nome);
      console.log("Tarefa adicionada com sucesso!");
      break;
    }

    case "2": {
      const nome = readline.question("Digite o nome da tarefa: ");
      const tarefa = await controlador.buscarTarefa(nome);
      console.log("Tarefa encontrada:");
      console.log(`Nome: ${tarefa.nome}`);
      console.log(`Concluída: ${tarefa.concluida ? "Sim" : "Não"}`);
      break;
    }

    case "3": {
      const nome = readline.question("Digite o nome da tarefa: ");
      const concluida = readline.question("A tarefa está concluída? (sim/não): ");
      const status = concluida.toLowerCase() === "sim";
      await controlador.atualizarTarefa(nome, status);
      console.log("Tarefa atualizada!");
      break;
    }

    case "4": {
      const nome = readline.question("Digite o nome da tarefa: ");
      await controlador.removerTarefa(nome);
      console.log("Tarefa removida!");
      break;
    }

    case "5": {
      console.log("Sair");
      process.exit();
    }

    default:
      console.log("Opção inválida! Tente novamente.");
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opção: ");
    await escolherOpcao(opcao);
  }
}

main();
