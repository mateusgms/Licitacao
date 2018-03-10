var carrinho = {};

var json = jQuery.parseJSON(data);

var govAtual = "Escolha o governo";

$(document).ready(function() {

    // $.getJSON("http://codeforces.com/api/contest.list?gym=true", function(result){
    //     console.log(result);
    // });

    /*pega itens ja existentes e adiciona no carrinho*/
    $('#tblData tr').each(function(){
        var quantidade = $(this).find('td#quantidade');
        quantidade = quantidade.find('input').val();
        var codigo = $(this).find('td#codigo').html();
        var fonte = $(this).find('td#fonte').html();
        if(!(quantidade === undefined || codigo === undefined || fonte === undefined)) {
            codigo = codigo.toString().trim();
            quantidade = parseInt(quantidade);
            fonte = fonte.trim();
            var id = [codigo,fonte];
            carrinho[id] = quantidade;
        }
    });

    /*gera dois vetores (codigo, qt) para o metodo post*/
    $("#orcamento").click(function () {
        var codigos = [];
        var quantidades = [];
        var fontes = [];

        for (var key in carrinho) {
            var chave = key.split(',');
            codigos.push(chave[0]);
            fontes.push(chave[1]);
            quantidades.push(carrinho[key]);
        }

        $("#codInput").val(codigos);
        $("#qtInput").val(quantidades);
        $("#govInput").val(fontes);
    });

    criarListas();

    $("#adicionarItem").click(function(){
        Add();
    });

    $("#limparLista").click(function () {
        var raiz =  $('#tblData');
        var deletar = raiz.find('tbody');

        deletar.remove();

        var tbody = document.createElement("tbody");
        tbody.setAttribute('id','tblbody');
        raiz.append(tbody);

        carrinho = {};

    });

    $("#salvarLista").click(function () {
        var codigos = [];
        var quantidades = [];
        var govs = [];

        for (var key in carrinho) {
            var chave = key.split(',');
            codigos.push(chave[0]);
            govs.push(chave[1]);
            quantidades.push(carrinho[key]);
        }

        $("#codInputS").val(codigos);
        $("#qtInputS").val(quantidades);
        $("#govInputS").val(govs);
    });

    $('#selectGov').click(function() {

        var governoSelecionado = $('#selectGov').find(":selected").text();

        if(governoSelecionado.toString().trim() === govAtual.toString().trim()) return;

        govAtual = governoSelecionado.toString().trim();

        atualizaSelectProduto(govAtual, -1);
        atualizaSelectGrupo(govAtual);

    });

    $(".modificaqt").on("change", function (e) {

        var raiz = $(e.target).parent().parent(); // tr

        var codigo = raiz.find('td#codigo').html().toString().trim();

        var quantidade = raiz.find('td#quantidade');
        quantidade = parseInt(quantidade.find('input').val());

        var preco = parseFloat(raiz.find('td#preco').html());

        var valorIndex = raiz.find('td#valor');

        var gov = raiz.find("td#fonte").html().trim();

        console.log(carrinho);

        console.log(codigo);
        console.log(gov);

        var id = [codigo,gov];

        carrinho[id] = quantidade;

        valorIndex.html("R$ " + parseFloat(quantidade*preco).toFixed(2));
    });

    $('.deletar').click(function(e){
        var raiz = $(e.target).parent().parent(); //tr
        var codigo = raiz.find('td#codigo').html().trim();
        var gov = raiz.find("td#fonte").html().trim();

        var id = [codigo,gov];

        delete carrinho[id];
        raiz.remove();
    });
});


function atualizaSelectGrupo(cidade) {

    var $el = $("#selectGrupo");
     $('#selectGrupo').children('option').remove(); // remove opcoes antigas

    var conjunto = new Set();

    var select = document.getElementById("selectGrupo");

    for(var i = 0; i < json.length; i++){
        if(cidade === json[i]["FONTE"]){
            if(conjunto.has(json[i]["GRUPO"])) continue;
            conjunto.add(json[i]["GRUPO"]);

            var novaOpcao = document.createElement("OPTION");
            novaOpcao.setAttribute("value", json[i]["GRUPO"]);
            var novoTexto = document.createTextNode(json[i]["GRUPO"]);
            novaOpcao.appendChild(novoTexto);
            select.appendChild(novaOpcao);
        }
    }
}

function atualizaSelectProduto(cidade, grupo) {

    cidade = cidade.toUpperCase();
    if(grupo !== -1) grupo = grupo.toUpperCase();

    $('#selectProduto').children('option').remove(); // remove opcoes antigas

    var select = document.getElementById("selectProduto");

    var conjunto = new Set();

    for(var i = 0; i < json.length; i++){
        if(cidade === json[i]["FONTE"] && grupo === -1){
            if(conjunto.has(json[i]["CODIGO"])) continue;
            conjunto.add(json[i]["CODIGO"]);

            var novaOpcao = document.createElement("OPTION");
            novaOpcao.setAttribute("value", json[i]["CODIGO"]);
            var novoTexto = document.createTextNode(json[i]["NOME"].toLowerCase());
            novaOpcao.appendChild(novoTexto);
            select.appendChild(novaOpcao);
        }
        else if(cidade === json[i]["FONTE"] && grupo === json[i]["GRUPO"]){
            if(conjunto.has(json[i]["CODIGO"])) continue;
            conjunto.add(json[i]["CODIGO"]);
            var novaOpcao = document.createElement("OPTION");
            novaOpcao.setAttribute("value", json[i]["CODIGO"]);
            var novoTexto = document.createTextNode(json[i]["NOME"].toLowerCase());
            novaOpcao.appendChild(novoTexto);
            select.appendChild(novaOpcao);
        }
    }
}

function criarListas() {

    var todos = new Set();

    for(var i = 0; i < json.length; i++){
        todos.add(json[i]["FONTE"]);
    }

    var tipos = Array.from(todos);

    var select = document.getElementById("selectGov");

    for(var i = 0; i < tipos.length; i++){
        var novaOpcao = document.createElement("OPTION");
        novaOpcao.setAttribute("value", tipos[i]);
        var novoTexto = document.createTextNode(tipos[i]);
        novaOpcao.appendChild(novoTexto);
        select.appendChild(novaOpcao);
    }
}

function Add(){

    var produto = $('#selectProduto').val();
    var gov = $('#selectGov').val();

    if(gov === null){
        alert("Selecione o Governo");
        return;
    }

    /*busca no json com esses valores de cima e atualiza embaixo a tabela*/

    var codigoItem = produto.toString().trim();

    gov = gov.toString().trim();

    var id = [codigoItem,gov];

    // item ja foi colocado no carrinho
    if(carrinho.hasOwnProperty(id)){
        alert('O item ja foi adicionado.');
        return;
    }

    var item;

    for(var i = 0; i < json.length; i++){
        if(json[i]["CODIGO"].toString().trim() === codigoItem && json[i]["FONTE"].toString().trim() === gov){
            item = json[i];
        }
    }

    if(!item){
        alert("erro!");
        return;
    }

    carrinho[id] = 0;

    var tabela = $('#tblData');

    var corpo = tabela.find('tbody');

    var linha = document.createElement("tr");

    var colCodigo = document.createElement("td");
    colCodigo.setAttribute('id','codigo');
    colCodigo.innerHTML = item["CODIGO"];
    linha.appendChild(colCodigo);

    var colNome = document.createElement("td");
    colNome.innerHTML = item["NOME"].toLowerCase();
    linha.appendChild(colNome);

    var colEspecificacao = document.createElement("td");
    colEspecificacao.innerHTML = item["DESCRICAO"].toLowerCase();
    linha.appendChild(colEspecificacao);

    var colUnidade = document.createElement("td");
    colUnidade.innerHTML = item["UNIDADE"];
    linha.appendChild(colUnidade);

    var colGrupo = document.createElement("td");
    colGrupo.innerHTML = item["GRUPO"];
    linha.appendChild(colGrupo);

    var colReferencia = document.createElement("td");
    colReferencia.innerHTML = item["REFERENCIA/PORTARIA"];
    linha.appendChild(colReferencia);

    var colGov = document.createElement("td");
    colGov.setAttribute('id','gov');
    colGov.innerHTML = item["FONTE"];
    linha.appendChild(colGov);

    var colPreco = document.createElement("td");
    colPreco.setAttribute('id','preco');
    colPreco.setAttribute('class','preco');
    colPreco.innerHTML = parseFloat(item["PRECO"]).toFixed(2);
    linha.appendChild(colPreco);

    var colQuantidade = document.createElement("td");
    colQuantidade.setAttribute('id', 'quantidade');
    colQuantidade.setAttribute('class', 'modificaqt');
    var inputQuantidade = document.createElement('input');
    inputQuantidade.type = 'number';
    inputQuantidade.class = 'quantidade';
    inputQuantidade.value = 0;
    inputQuantidade.min = 0;
    inputQuantidade.style = 'width: 80px';
    inputQuantidade.onchange = AtualizaValor;
    colQuantidade.append(inputQuantidade);
    linha.appendChild(colQuantidade);

    var colValor = document.createElement("td");
    colValor.setAttribute('id', 'valor');
    colValor.innerHTML = "R$ 0";
    linha.appendChild(colValor);

    var colDeletar = document.createElement("td");
    var imgDeletar = document.createElement('i');
    imgDeletar.setAttribute('class', 'material-icons deletar');
    imgDeletar.onclick = Delete;
    imgDeletar.innerHTML = "&#xE92B;";
    colDeletar.append(imgDeletar);
    linha.appendChild(colDeletar);

    corpo.prepend(linha);
}

function AtualizaValor() {
    var raiz = $(this).parent().parent(); // tr
    var codigo = raiz.find('td#codigo').html().toString().trim();

    var quantidade = raiz.find('td#quantidade');
    quantidade = parseInt(quantidade.find('input').val());

    var valorIndex = raiz.find('td#valor');
    var preco = parseFloat(raiz.find('td#preco').html());

    var gov = raiz.find("td#gov").html().trim();

    var id = [codigo,gov];

    carrinho[id] = quantidade;
    valorIndex.html("R$ " + parseFloat(quantidade*preco).toFixed(2));
}

function Delete(){
    var raiz = $(this).parent().parent(); //tr
    var codigo = raiz.find('td#codigo').html().toString().trim();
    var gov = raiz.find("td#gov").html().trim();

    var id = [codigo,gov];

    delete carrinho[id];

    raiz.remove();
}

