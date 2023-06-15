const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li
}

inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    };
})

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += ' '
    const botaoApagar = document.createElement('button');
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'apagar esta tarefa');
     const imagemApagar = document.createElement('img');
     imagemApagar.setAttribute('src', 'assets/img/excluir.png');
     imagemApagar.setAttribute('alt', 'Apagar');
     imagemApagar.setAttribute('class', 'apagar');
     botaoApagar.appendChild(imagemApagar);
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', (e) => {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
    
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('apagar')) {
        const liElement = e.target.closest('li');
        liElement?.remove();
        salvarTarefas();
    }
});


function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];
    for(let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);

    }
    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJson);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    if (tarefas) {
      const listaDeTarefas = JSON.parse(tarefas);
      if (Array.isArray(listaDeTarefas)) {
        for (let tarefa of listaDeTarefas) {
          criaTarefa(tarefa);
        }
      }
    }
  }
adicionaTarefasSalvas()
