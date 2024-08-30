let listElement = document.querySelector('#container ul');
let inputElement = document.querySelector('#container .txtInput');
let quantElement = document.querySelector('#container .qtnInput');
let valorElement = document.querySelector('#container .valueInput');
let buttonElement = document.querySelector('#container button');

let tarefas = JSON.parse(localStorage.getItem("@listTarefas")) || [];

function renderTarefas(){
    listElement.innerHTML = "";

    let total = 0;

    tarefas.map((todo)=> {
        let liElement = document.createElement("li");
        let tarefaText = document.createTextNode(`Produto: ${todo.tarefa} - Qtn: ${todo.quantidade} - Valor: R$ ${todo.valor}`);

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');

        let linkText = document.createTextNode("Excluir");
        linkElement.appendChild(linkText)

        let position = tarefas.indexOf(todo);

        linkElement.setAttribute("onclick", `deleteTarefa(${position})`)

        liElement.appendChild(tarefaText);
        liElement.appendChild(linkElement);
        listElement.appendChild(liElement);

        // Calcula o valor total considerando a quantidade
        total += parseFloat(todo.valor) * parseInt(todo.quantidade);
    });
    // Atualiza o valor total na tela
    document.getElementById("totalCompra").innerText = `Total: R$${total.toFixed(2)}`;
}

renderTarefas();

function addTarefas(){
    if(inputElement.value === '' || quantElement.value === '' || valorElement.value === ''){
        alert("Digite alguma tarefa");
        return false;
    }else{
        let novaTarefa = {
            tarefa: inputElement.value,
            quantidade: quantElement.value,
            valor: valorElement.value
        };

        tarefas.push(novaTarefa);
        inputElement.value = '';
        quantElement.value = '';
        valorElement.value = '';

        renderTarefas();
        salvarDados();
    }
}

buttonElement.onclick = addTarefas;

function deleteTarefa(position){
   tarefas.splice(position, 1)
   renderTarefas();
   salvarDados();
}

function salvarDados(){
    localStorage.setItem("@listTarefas", JSON.stringify(tarefas));

}
