const checkbox = document.querySelector('#checkboxSelecionarTodos');
const submit = document.querySelector('form');
const input = document.querySelector('#inputAdicionarTarefas');
const listaAFazer = document.querySelector('.aFazer');
const listaFeitos = document.querySelector('.feitos');
const itensAFazer = document.querySelector('.footer > span');
const botaoTodas = document.querySelector('#botaoTodas');
const botaoAFazer = document.querySelector('#botaoAFazer');
const botaoCompletadas = document.querySelector('#botaoCompletadas');
const botaoLimpar = document.querySelector('#botaoLimpar');

const selecionaTodas = () => {
    const listaItensAFazer = listaAFazer.querySelectorAll('li');

    if (listaItensAFazer.length !== 0) {
        for (const item of listaItensAFazer) {
            listaFeitos.append(item);
            item.querySelector("input").checked = true;
        }
    } else {
        const listaItensFeitos = listaFeitos.querySelectorAll('li');
        for (const feito of listaItensFeitos) {
            listaAFazer.append(feito);
            feito.querySelector("input").checked = false;
        }
    }
    numeroItensAFazer();
}

const criaElemento = () => {
    if (input.value !== '') {
        const criarTarefa = document.createElement('li');

        const adicionarTexto = document.createElement('span');
        adicionarTexto.append(input.value);

        const criarCheckbox = document.createElement('input');
        criarCheckbox.setAttribute("type", "checkbox");

        const criarBotao = document.createElement('button');
        criarBotao.setAttribute("type", "button");
        criarBotao.innerText = 'Deletar';

        criarTarefa.append(criarCheckbox);
        criarTarefa.append(adicionarTexto);
        criarTarefa.append(criarBotao);

        listaAFazer.append(criarTarefa);
        input.value = '';
        numeroItensAFazer();

        criarCheckbox.addEventListener("input", marcaComoFeita);
        criarBotao.addEventListener("click", deletarTarefa);
    }
}


const marcaComoFeita = (event) => {
    const checkbox = event.target;
    const tarefa = checkbox.closest("li");
    if (checkbox.checked) {
        listaFeitos.append(tarefa);
    } else {
        listaAFazer.append(tarefa);
    }
    numeroItensAFazer();
}

const deletarTarefa = (event) => {
    const botaoDeletar = event.target;
    const tarefa = botaoDeletar.closest("li");
    tarefa.remove();
    numeroItensAFazer();
}

const numeroItensAFazer = () => {
    const textoItens = document.querySelector('.footer > span');
    const numeroItens = listaAFazer.querySelectorAll('li').length;

    (numeroItens === 1) ?  textoItens.innerText = `${numeroItens} item a fazer` : textoItens.innerText = `${numeroItens} itens a fazer`;
    (numeroItens === 0) ? checkbox.checked = true : checkbox.checked = false;
}

const limparCompletadas = () => {
    listaFeitos.querySelectorAll('li').forEach((item) => item.remove()) 
}

botaoTodas.addEventListener('click', () => {
    listaAFazer.removeAttribute("hidden");
    listaFeitos.removeAttribute("hidden");
    
    botaoTodas.classList.add("ativo");
    botaoAFazer.classList.remove("ativo");
    botaoCompletadas.classList.remove("ativo");
})

botaoAFazer.addEventListener('click', () => {
    listaAFazer.removeAttribute("hidden");
    listaFeitos.setAttribute("hidden",'');

    botaoTodas.classList.remove("ativo");
    botaoAFazer.classList.add("ativo");
    botaoCompletadas.classList.remove("ativo");
})

botaoCompletadas.addEventListener('click', () => {
    listaFeitos.removeAttribute("hidden");
    listaAFazer.setAttribute("hidden",'');

    botaoTodas.classList.remove("ativo");
    botaoAFazer.classList.remove("ativo");
    botaoCompletadas.classList.add("ativo");
})

submit.addEventListener('submit', event => {
    event.preventDefault();

    criaElemento();
})

botaoLimpar.addEventListener('click', limparCompletadas);

checkbox.addEventListener('input', selecionaTodas);
