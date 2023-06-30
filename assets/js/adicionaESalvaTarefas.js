import { criaTarefa } from "./criaTarefa.js";

export function salvarTarefas() {
  const tarefas = document.querySelector(".tarefas");
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];
  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
    const tarefaCor = tarefa.getAttribute("data-color");
    const tarefaInputValue = tarefa.querySelector(".numero").value;
    const tarefaValorProduto = tarefa.querySelector(".valor-produto").value;
    const tarefaObjeto = {
      texto: tarefaTexto,
      cor: tarefaCor,
      inputValue: tarefaInputValue,
      valorProduto: tarefaValorProduto,
    };
    listaDeTarefas.push(tarefaObjeto);
  }
  const tarefasJson = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJson);
}

export function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  if (tarefas) {
    const listaDeTarefas = JSON.parse(tarefas);
    if (Array.isArray(listaDeTarefas)) {
      for (let tarefaObjeto of listaDeTarefas) {
        const tarefaTexto = tarefaObjeto.texto;
        const tarefaCor = tarefaObjeto.cor;
        const tarefaInputValue = tarefaObjeto.inputValue;
        const tarefaValorProduto = tarefaObjeto.valorProduto;
        criaTarefa(tarefaTexto, tarefaCor, tarefaInputValue, tarefaValorProduto);
      }
    }
  }
}

adicionaTarefasSalvas();
