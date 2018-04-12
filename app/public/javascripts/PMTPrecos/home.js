var carrinho = {};

var json = jQuery.parseJSON(data);

var grupoAtual = "Escolha o Grupo";
var produtoAtual;

$(document).ready(function() {

    // $.getJSON("http://codeforces.com/api/contest.list?gym=true", function(result){
    //     console.log(result);
    // });

    /*pega itens ja existentes e adicona no carrinho*/
    $('#tblData tr').each(function(){
        var quantidade = $(this).find('td#quantidade');
        quantidade = quantidade.find('input').val();
        var identidade = $(this).find('td#id').html();
        var preco = parseFloat($(this).find('td#preco').find('select').val());
        if(!(quantidade === undefined || identidade === undefined)) {
            identidade = parseInt(identidade);
            quantidade = parseInt(quantidade);
            var novo = {
                quantidade : quantidade,
                preco : preco
            };
            carrinho[identidade] = novo;
        }
    });

    /*gera vetores (codigo, qt, preco e regiao) para o metodo post*/
    $("#orcamento").click(function () {
        var identidades = [];
        var quantidades = [];
        var precos = [];

        for (var key in carrinho) {
            quantidades.push(carrinho[key]['quantidade']);
            precos.push(carrinho[key]['preco']);
            identidades.push(key);
        }

        $("#codInput").val(identidades);
        $("#qtInput").val(quantidades);
        $("#precoInput").val(precos);
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
        var identidades = [];
        var quantidades = [];
        var precos = [];

        for (var key in carrinho) {
            quantidades.push(carrinho[key]['quantidade']);
            precos.push(carrinho[key]['preco']);
            identidades.push(key);
        }

        $("#codInputS").val(identidades);
        $("#qtInputS").val(quantidades);
        $("#precoInputS").val(precos);
    });

    $('#selectGrupo').click(function() {

        var grupoSelecionado = $('#selectGrupo').find(":selected").text();

        if(grupoSelecionado.toString().trim() === grupoAtual.toString().trim()) return;

        grupoAtual = grupoSelecionado.toString().trim();

        atualizaSelectProduto(grupoSelecionado);
        atualizaSelectRegiao();

    });

    $('#selectProduto').click(function() {

        var produtoSelecionado = $('#selectProduto').find(":selected").val();

        if(produtoSelecionado.toString().trim() === produtoAtual.toString().trim()) return;

        produtoAtual = produtoSelecionado.toString().trim();

        atualizaSelectRegiao();
    });

    $('.deletar').click(function(e){
        var raiz = $(e.target).parent().parent(); //tr
        var identidade = raiz.find('td#id').html().trim();

        delete carrinho[identidade];
        raiz.remove();
    });

    $(".modificaqt").on("change", function (e) {

        var raiz = $(e.target).parent().parent(); // tr

        var identidade = parseInt(raiz.find('td#id').html());

        var quantidade = raiz.find('td#quantidade');
        quantidade = parseInt(quantidade.find('input').val());

        var preco = parseFloat(raiz.find('td#preco').find('select').val());

        var valorIndex = raiz.find('td#valor');

        carrinho[identidade]['quantidade'] = quantidade;

        valorIndex.html("R$ " + parseFloat(quantidade*preco).toFixed(2));
    });

    $(".preco").on('change', function (e) {

        var raiz = $(e.target).parent().parent(); // tr

        var identidade = raiz.find('td#id').html().trim();

        var quantidade = raiz.find('td#quantidade');
        quantidade = parseInt(quantidade.find('input').val());

        var preco = parseFloat(raiz.find('td#preco').find('select').val());

        var valorIndex = raiz.find('td#valor');

        carrinho[identidade]['preco'] = preco;
        valorIndex.html("R$ " + parseFloat(quantidade*preco).toFixed(2));
    })

});

function atualizaSelectRegiao() {

    var codigo = parseInt(produtoAtual);

    $('#selectRegiao').children('option').remove(); // remove opcoes antigas

    var select =  document.getElementById("selectRegiao");

    var conjunto = new Set();

    for(var i = 0; i < json.length; i++){
        if(codigo === parseInt(json[i]["ID"])){
            if(conjunto.has(json[i]["REGIAO"])) continue;
            conjunto.add(json[i]["REGIAO"]);

            var novaOpcao = document.createElement("OPTION");
            novaOpcao.setAttribute("value", json[i]["REGIAO"]);
            var novoTexto = document.createTextNode(json[i]["REGIAO"]);
            novaOpcao.appendChild(novoTexto);
            select.appendChild(novaOpcao);
        }
    }
}

function atualizaSelectProduto(tipo) {

    if(tipo !== -1) tipo = tipo.toUpperCase().trim();

    $('#selectProduto').children('option').remove(); // remove opcoes antigas

    var select = document.getElementById("selectProduto");

    var conjunto = new Set();

    for(var i = 0; i < json.length; i++){
        if(tipo === -1 || tipo === json[i]["GRUPO"].toString().toUpperCase().trim()){
            if(conjunto.has(json[i]["ID"])) continue;
            conjunto.add(json[i]["ID"]);
            var novaOpcao = document.createElement("OPTION");
            novaOpcao.setAttribute("value", json[i]["ID"]);
            var novoTexto = document.createTextNode(json[i]["NOME"]);
            novaOpcao.appendChild(novoTexto);
            select.appendChild(novaOpcao);
        }
    }

    produtoAtual = $('#selectProduto').find(":selected").val();
}

function criarListas() {

    var todos = new Set();

    for(var i = 0; i < json.length; i++){
        todos.add(json[i]["GRUPO"]);
    }

    var tipos = Array.from(todos);

    var select = document.getElementById("selectGrupo");

    for(var i = 0; i < tipos.length; i++){
        var novaOpcao = document.createElement("OPTION");
        novaOpcao.setAttribute("value", tipos[i]);
        var novoTexto = document.createTextNode(tipos[i]);
        novaOpcao.appendChild(novoTexto);
        select.appendChild(novaOpcao);
    }

    atualizaSelectProduto(-1);
    atualizaSelectRegiao();   
}

function Add(){

    var produto = produtoAtual;

    if(!produto.length){
        alert("Selecione o Produto");
        return;
    }

    /*busca no json com esses valores de cima e atualiza embaixo a tabela*/

    var identidade = parseInt(produto);

    // item ja foi colocado no carrinho
    if(carrinho.hasOwnProperty(identidade)){
        alert('O item ja foi adicionado.');
        return;
    }

    var item;

    for(var i = 0; i < json.length; i++){
        if(parseInt(json[i]["ID"]) === identidade){
            item = json[i];
        }
    }

    if(!item){
        alert("erro!");
        return;
    }

    var novo = {
        quantidade : 0,
        preco : parseFloat(item["MEDIA"]).toFixed(2)/*preco medio*/
    };

    carrinho[identidade] = novo;

    var tabela = $('#tblData');

    var corpo = tabela.find('tbody');
    
    var linha = document.createElement("tr");

    var colCodigo = document.createElement("td");
    colCodigo.setAttribute('id','id');
    colCodigo.setAttribute('style','display:none;');
    colCodigo.innerHTML = item["ID"];
    linha.appendChild(colCodigo);

    var colCodigo = document.createElement("td");
    colCodigo.setAttribute('id','codigo');
    colCodigo.innerHTML = item["CODIGO"];
    linha.appendChild(colCodigo);

    var colNome = document.createElement("td");
    colNome.innerHTML = item["NOME"];
    linha.appendChild(colNome);

    var colUnidade = document.createElement("td");
    colUnidade.innerHTML = item["UNIDADE"];
    linha.appendChild(colUnidade);

    var colEspecificacao = document.createElement("td");
    colEspecificacao.innerHTML = item["DESCRICAO"];
    linha.appendChild(colEspecificacao);

    var colRegiao = document.createElement("td");
    colRegiao.setAttribute('id','regiao');
    colRegiao.innerHTML = item["REGIAO"];
    linha.appendChild(colRegiao);

    var colGrupo = document.createElement("td");
    colGrupo.innerHTML = item["GRUPO"];
    linha.appendChild(colGrupo);

    var colReferencia = document.createElement("td");
    colReferencia.innerHTML = item["REFERENCIA"];
    linha.appendChild(colReferencia);

    var colCNPJ = document.createElement("td");
    colCNPJ.innerHTML = item["CNPJ"];
    linha.appendChild(colCNPJ);

    var colPregao = document.createElement("td");
    colPregao.innerHTML = item["PREGOES"];
    linha.appendChild(colPregao);

    var colcotacoes = document.createElement("td");
    colcotacoes.innerHTML = item["NUMERO COTACOES"];
    linha.appendChild(colcotacoes);

    var colPreco = document.createElement("td");
    colPreco.setAttribute('id','preco');
    colPreco.setAttribute('class','preco');
    var selectPreco = document.createElement('select');
    selectPreco.onchange = AtualizaPreco;
    var opcao1 = document.createElement('option');
    opcao1.value = parseFloat(item["MINIMO"]).toFixed(2);
    opcao1.innerHTML = 'R$ ' + parseFloat(item["MINIMO"]).toFixed(2) + ' (minimo)';
    selectPreco.append(opcao1);
    var opcao2 = document.createElement('option');
    opcao2.value = parseFloat(item["MEDIA"]).toFixed(2);
    opcao2.selected = 'selected';
    opcao2.innerHTML = 'R$ ' + parseFloat(item["MEDIA"]).toFixed(2) + ' (medio)';
    selectPreco.append(opcao2);
    var opcao3 = document.createElement('option');
    opcao3.value = parseFloat(item["MAXIMO"]).toFixed(2);
    opcao3.innerHTML = 'R$ ' + parseFloat(item["MAXIMO"]).toFixed(2) + ' (maximo)';
    selectPreco.append(opcao3);
    colPreco.append(selectPreco);
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
    var identidade = parseInt(raiz.find('td#id').html());

    var quantidade = raiz.find('td#quantidade');
    quantidade = parseInt(quantidade.find('input').val());

    var valorIndex = raiz.find('td#valor');
    var preco = parseFloat(raiz.find('td#preco').find('select').val());

    carrinho[identidade]['quantidade'] = quantidade;
    valorIndex.html("R$ " + parseFloat(quantidade*preco).toFixed(2));
}

function Delete(){
    var raiz = $(this).parent().parent(); //tr
    var identidade = parseInt(raiz.find('td#id').html());

    delete carrinho[identidade];

    raiz.remove();
}

function AtualizaPreco() {
    var raiz = $(this).parent().parent(); // tr
    var identidade = parseInt(raiz.find('td#codigo').html());

    var quantidade = raiz.find('td#quantidade');
    quantidade = parseInt(quantidade.find('input').val());

    var valorIndex = raiz.find('td#valor');
    var preco = parseFloat(raiz.find('td#preco').find('select').val());

    carrinho[identidade]['preco'] = preco;
    valorIndex.html("R$ " + parseFloat(quantidade*preco).toFixed(2));
}