import { salvarTarefas } from "./adicionaESalvaTarefas.js";

export function criaBotao(li, inputValue, valorProduto) {
  const textoTarefa = li.firstChild.textContent;

  const divGeral = document.createElement("div");
  divGeral.setAttribute("class", "estilo-div-geral");

  const spanTexto = document.createElement("span");
  spanTexto.setAttribute("class", "estilo-span");
  spanTexto.innerText = textoTarefa;

  const divTexto = document.createElement("div");
  divTexto.setAttribute("class", "estilo-div");
  divTexto.appendChild(spanTexto);

  const inputNumber = document.createElement("input");
  inputNumber.setAttribute("type", "number");
  inputNumber.setAttribute("class", "numero");
  inputNumber.value = (inputValue !== undefined && inputValue !== null) ? inputValue : 1;
  inputNumber.min = 0;

  inputNumber.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  });

  const inputValorProduto = document.createElement("input");
  inputValorProduto.setAttribute("type", "number");
  inputValorProduto.setAttribute("class", "valor-produto");
  inputValorProduto.value = (valorProduto !== undefined && valorProduto !== null) ? valorProduto : 0;
  inputValorProduto.min = 0;

  const botaoApagar = document.createElement("button");
  botaoApagar.setAttribute("class", "apagar");
  botaoApagar.setAttribute("title", "apagar esta tarefa");

  const botaoChecar = document.createElement("button");
  botaoChecar.setAttribute("class", "checar");
  botaoChecar.setAttribute("title", "checar esta tarefa");

  const botaoQuantidade = document.createElement("button");
  botaoQuantidade.setAttribute("class", "quantidade");

  const botaoIncremento = document.createElement("span");
  botaoIncremento.innerText = '+';
  botaoIncremento.setAttribute("class", "incremento");
  botaoIncremento.addEventListener("click", function () {
    inputNumber.stepUp();
    calcularTotal();
    salvarTarefas();
  });

  const botaoDecremento = document.createElement("span");
  botaoDecremento.innerText = '-';
  botaoDecremento.setAttribute("class", "decremento");
  botaoDecremento.addEventListener("click", function () {
    if (inputNumber.value > 0) {
      inputNumber.stepDown();
      calcularTotal();
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
  divGeral.appendChild(inputValorProduto);
  divGeral.appendChild(botaoApagar);

  li.appendChild(divGeral);

  botaoApagar.addEventListener("click", function () {
    li.remove();
    calcularTotal();
    salvarTarefas();
  });

  botaoChecar.addEventListener("click", function () {
    const novaCor = li.getAttribute("data-color") ? "" : "green";
    li.setAttribute("data-color", novaCor);
    salvarTarefas();
  });

  inputNumber.addEventListener("input", function () {
    calcularTotal();
    salvarTarefas();
  });

  inputValorProduto.addEventListener("input", function () {
    calcularTotal();
    salvarTarefas();
  });

  // Função para calcular o total dos produtos multiplicados
  function calcularTotal() {
    const itens = document.querySelectorAll("li");
    let total = 0;

    itens.forEach((item) => {
      const quantidade = item.querySelector(".numero").value;
      const valor = parseFloat(item.querySelector(".valor-produto").value);
      const subtotal = quantidade * valor;

      total += subtotal;
    });

    // Exibe o total para o cliente
    const totalElement = document.getElementById("total");
    totalElement.innerText = "Total: R$" + total.toFixed(2);

    // Salva o valor total no localStorage
    localStorage.setItem("total", total.toFixed(2));
  }

  // Carrega o valor total do localStorage, se existir
  const totalSalvo = localStorage.getItem("total");
  if (totalSalvo) {
    const totalElement = document.getElementById("total");
    totalElement.innerText = "Total: R$" + totalSalvo;
  }
}
