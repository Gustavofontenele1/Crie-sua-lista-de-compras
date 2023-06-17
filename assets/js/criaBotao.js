import { salvarTarefas } from "./adicionaESalvaTarefas.js";
export function criaBotao(li, inputValue) {
    const textoTarefa = li.firstChild.textContent;
  
    const divGeral = document.createElement("div")
    divGeral.setAttribute("class", "estilo-div-geral")
  
    const spanTexto = document.createElement("span");
    spanTexto.setAttribute("class", "estilo-span")
    spanTexto.innerText = textoTarefa;
  
    const divTexto = document.createElement("div")
    divTexto.setAttribute("class", "estilo-div")
    divTexto.appendChild(spanTexto)
  
    const botaoApagar = document.createElement("button");
    botaoApagar.setAttribute("class", "apagar");
    botaoApagar.setAttribute("title", "apagar esta tarefa");
  
    const botaoChecar = document.createElement("button");
    botaoChecar.setAttribute("class", "checar");
    botaoChecar.setAttribute("title", "checar esta tarefa");
  
    const inputNumber = document.createElement("input");
    inputNumber.setAttribute("type", "number");
    inputNumber.setAttribute("class", "numero");
    inputNumber.value = (inputValue !== undefined && inputValue !== null) ? inputValue : 0; // Define o valor inicial como 0 se o inputValue for indefinido ou nulo
    inputNumber.min = 0; // Define o valor mínimo como 0
  
    inputNumber.addEventListener("keydown", function (event) {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
      }
    });
  
    const botaoQuantidade = document.createElement("button");
    botaoQuantidade.setAttribute("class", "quantidade");
  
    const botaoIncremento = document.createElement("span");
    botaoIncremento.innerText = "+";
    botaoIncremento.setAttribute("class", "incremento");
    botaoIncremento.addEventListener("click", function () {
      inputNumber.stepUp();
      salvarTarefas();
    });
  
    const botaoDecremento = document.createElement("span");
    botaoDecremento.innerText = "-";
    botaoDecremento.setAttribute("class", "decremento");
    botaoDecremento.addEventListener("click", function () {
      if (inputNumber.value > 0) {
        inputNumber.stepDown();
        salvarTarefas();
      }
    });
  
    botaoQuantidade.appendChild(botaoIncremento);
    botaoQuantidade.appendChild(inputNumber);
    botaoQuantidade.appendChild(botaoDecremento);
  
    const imagemChecar = document.createElement("i");
    imagemChecar.classList.add("fas", "fa-circle-check", "fa-bounce");
    botaoChecar.appendChild(imagemChecar);
  
    const imagemApagar = document.createElement("i");
    imagemApagar.classList.add("fas", "fa-trash-can");
    botaoApagar.appendChild(imagemApagar);
  
    li.textContent = "";
  
    divGeral.appendChild(divTexto);
    divGeral.appendChild(botaoChecar);
    divGeral.appendChild(botaoQuantidade);
    divGeral.appendChild(botaoApagar);
  
    li.appendChild(divGeral)
  
    botaoApagar.addEventListener("click", function () {
      li.remove();
      salvarTarefas();
    });
  
    botaoChecar.addEventListener("click", function () {
      const novaCor = li.getAttribute("data-color") ? "" : "green";
      li.setAttribute("data-color", novaCor);
      salvarTarefas();
    });
  
    inputNumber.addEventListener("input", function () {
      salvarTarefas();
    });
  }