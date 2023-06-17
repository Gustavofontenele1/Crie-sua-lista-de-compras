import { criaBotao } from "./criaBotao.js";
import { criaLi } from "./main.js";
import { salvarTarefas } from "./adicionaESalvaTarefas.js";
import { limpaInput } from "./main.js";


export function criaTarefa(textoInput, corInput = "", inputValue = 1) {
    const tarefas = document.querySelector(".tarefas");
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotao(li, inputValue);
  
    li.setAttribute("data-color", corInput);
    li.querySelector(".numero").value = inputValue;
  
    salvarTarefas();
  }
  