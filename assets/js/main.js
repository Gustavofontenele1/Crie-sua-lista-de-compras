import { salvarTarefas } from "./adicionaESalvaTarefas.js";
import { criaTarefa } from "./criaTarefa.js";
import { criaBotao } from "./criaBotao.js";

const inputTarefa = document.querySelector(".input-tarefa"); 
const btnTarefa = document.querySelector(".btn-tarefa");
export const tarefas = document.querySelector(".tarefas");

export function criaLi() {
  const li = document.createElement("li");
  return li;
}

inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

export function limpaInput() {
  const inputTarefa = document.querySelector(".input-tarefa"); 
  inputTarefa.value = "";
  inputTarefa.focus();
}

btnTarefa.addEventListener("click", (e) => {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value, "", 1);
  criaBotao(tarefas.lastChild, 0); // Chama a função criaBotao para o novo li
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("apagar")) {
    const liElement = e.target.closest("li");
    liElement?.remove();
    salvarTarefas();
  }
});