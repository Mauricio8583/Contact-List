class contato{
    constructor(nome){
        this.nome = nome;                        // Classe dos contatos
    }
}



let buscador = document.getElementById("buscador");    // Campo que busca o nome durante a digitação
let contatos = document.getElementById("contatos");    // Lista de contatos


function mostraContatos(contato){                // Função que mostra os contatos na tela
    let row = document.createElement("li");
    row.classList.add("table-sm");
    row.innerHTML += "<a href='#'>" + contato.nome + "</a><input type='submit' id='exclui' class='form-label' value='Excluir'>";
    contatos.appendChild(row);     
}

function removeContato(linha){       // Remove os contatos da tela
    linha.parentNode.remove();
}

function getContatos(){   // Pega os contatos ja inseridos no localStorage
    let lista;
    if(localStorage.getItem("lista") == null){
        lista = [];
    }
    else{
        lista = JSON.parse(localStorage.getItem("lista"));
    }
    return lista;
}

function adicionaContato(contato){  // Adiciona os contatos no localStorage
    const lista = getContatos();
    lista.push(contato);
    localStorage.setItem("lista", JSON.stringify(lista));
}

function excluiContato(nome){  // Exclui os contatos no localStorage
    const lista = getContatos();

    lista.forEach((contato, index) => {
        if(contato.nome == nome){
            lista.splice(index, 1);
        }
    })
    localStorage.setItem("lista", JSON.stringify(lista));
}

const lista = getContatos();

let i = 0;
                                          //  Faz os contatos ja existentes no localStorage aparecerem na tela
while(lista[i]!=null){
    mostraContatos(lista[i]);
    i++;
}
let nomes = contatos.querySelectorAll("li.table-sm");  // Seleciona todos os campos li de classe table-sm dentro da lista

buscador.addEventListener("keyup", buscaNomes);   // Chama o evento na hora que algo for digitado no campo de busca

document.getElementById("adicionar").addEventListener("click", (e) => {  // Evento de click na hora de adicionar novo contato
    e.preventDefault();
    const nome_inserido = document.getElementById("nome").value;
    const novo_contato = new contato(nome_inserido);
    if(nome_inserido == " "){
        alert("Campo Obrigatorio!!");              // Chama um alert caso o campo esteja vazio
    }
    else{
        document.getElementById("nome").value = " ";
        adicionaContato(novo_contato);
        mostraContatos(novo_contato);
                
    }

})
document.getElementById("contatos").addEventListener("click", (e) => {  // Evento no que exclui o contato da lista e do localStorage
    excluiContato(e.target.parentNode.textContent);
    removeContato(e.target);
        
})

function buscaNomes(){  // Função de busca ao nome conforme as letras digitadas no campo de busca 
    let nome = buscador.value.toUpperCase();
    for( let i = 0; i < nomes.length; i++){
        let a = nomes[i].getElementsByTagName("a")[0];
        if(a.innerHTML.toUpperCase().indexOf(nome) > -1){
            nomes[i].style.display = "";
        }
        else{
            nomes[i].style.display = "none";
        }

    }
    
}

