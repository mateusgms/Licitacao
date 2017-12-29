var menor = 75;
var maior = 300;
var maiorvalor = 500;

var menorOficial = 75;
var maiorOficial = 300;

var item;

$(document).ready(function() {

    $("#adicionarItem").click(function(){
        Add();
    });

    $("#calcular").click(function () {
       AtualizaLista();
       AtualizaSegundaTabela();
    });

    $("#orcamento").click(function () {

        var CNPJs = [];
        var razoes = [];
        var precos = [];
        var utilizados = [];

        $("#tabelaPrincipal tbody tr").each(function () {

            var CNPJ = $(this).find("td#cnpj").html();

            var razao = $(this).find("td#razao").html();

            var preco = parseFloat($(this).find("td#preco").html());

            var ultiliza = $(this).find("td#utiliza").find('i').html();

            if(ultiliza === 'done') ultiliza = 1;
            else ultiliza = 0;

            CNPJs.push(CNPJ);
            razoes.push(razao);
            precos.push(preco);
            utilizados.push(ultiliza);
        });

        console.log(CNPJs);

        $("#razaoInput").val(razoes);
        $("#CNPJInput").val(CNPJs);
        $("#utilizadoInput").val(utilizados);
        $("#precoInput").val(precos);
        $("#itemInput").val(item);

    });

});

function Add() {

    var nomeItem = $("#nomeItem").val();
    var CNPJ = $("#CNPJ").val();
    var data = $("#data").val();
    var razaoSocial = $("#razaoSocial").val();
    var precoItem = $("#precoItem").val();

    if((nomeItem === "") || (CNPJ === "") || (data === "") || (razaoSocial === "") || (precoItem === "")){
        alert("Insira todos os itens");
    }

    item = nomeItem;

    precoItem = parseFloat(precoItem).toFixed(2);

    maiorvalor = Math.max(maiorvalor,precoItem);

    $('#slider-range').slider( "option", "max", maiorvalor);

    $("#nomeItem").attr("readonly", true);

    var tabela = $("#tabelaPrincipal");

    var corpo = tabela.find("tbody");

    var linha = document.createElement("tr");

    var colCNPJ = document.createElement("td");
    colCNPJ.setAttribute('id','cnpj');
    colCNPJ.innerHTML = CNPJ;
    linha.appendChild(colCNPJ);

    var colRazaoSocial = document.createElement("td");
    colRazaoSocial.setAttribute('id','razao');
    colRazaoSocial.innerHTML = razaoSocial;
    linha.appendChild(colRazaoSocial);

    var colPreco = document.createElement("td");
    colPreco.innerHTML = precoItem;
    colPreco.setAttribute('id','preco');
    linha.appendChild(colPreco);

    var colUtilizando = document.createElement("td");
    colUtilizando.setAttribute('id','utiliza');
    var imgDeletar = document.createElement('i');

    if(menorOficial <= precoItem && precoItem <= maiorOficial){
        imgDeletar.setAttribute('class', 'material-icons verde');
        imgDeletar.innerHTML = "done";
    }
    else{
        imgDeletar.setAttribute('class', 'material-icons red');
        imgDeletar.innerHTML = "clear";
    }
    colUtilizando.append(imgDeletar);
    linha.appendChild(colUtilizando);

    var colDeletar = document.createElement("td");
    var imgDeletar = document.createElement('i');
    imgDeletar.setAttribute('class', 'material-icons deletar');
    imgDeletar.onclick = Delete;
    imgDeletar.innerHTML = "&#xE92B;";
    colDeletar.append(imgDeletar);
    linha.appendChild(colDeletar);

    corpo.prepend(linha);

}

function Delete(){
    var raiz = $(this).parent().parent(); //tr
    raiz.remove();
}

function AtualizaLista() {

    $("#tabelaPrincipal tbody tr").each(function () {

        var preco = $(this).find("td#preco").html();
        preco = parseFloat(preco);

        var pai = $(this).find("td#utiliza");

        var icone = pai.find('i');

        if(preco >= menor && preco <= maior){
            icone.html("done");
            icone.attr("class",'material-icons verde');
        }
        else{
            icone.html("clear");
            icone.attr("class",'material-icons red');
        }

    });

}

function AtualizaSegundaTabela() {

    var menorValor = -1;
    var quantidadeValida = 0;
    var todos = 0;
    var maiorValor = 0;
    var valorTotal = 0;

    menorOficial = menor;
    maiorOficial = maior;

    $("#tabelaPrincipal tbody tr").each(function () {

        var preco = $(this).find("td#preco").html();
        preco = parseFloat(preco);

        todos++;

        if(preco >= menor && preco <= maior){
            valorTotal += preco;
            maiorValor = Math.max(maiorValor,preco);
            if(menorValor === -1) menorValor = preco;
            else menorValor = Math.min(menorValor,preco);
            quantidadeValida++;
        }

    });

    var tabela = $("#tabelaSecundaria");

    if(quantidadeValida === 0){
        menorValor = 0;
        maiorValor = 0;
        quantidadeValida = 0;
    }

    tabela.find("#menorPreco").html("R$ " + menorValor);
    if(quantidadeValida === 0) tabela.find("#precoMedio").html("R$ " + valorTotal);
    else tabela.find("#precoMedio").html("R$ " + parseFloat(valorTotal/quantidadeValida).toFixed(2));
    tabela.find("#maiorPreco").html("R$ " + maiorValor);
    tabela.find("#qtdPrecos").html(todos);
    tabela.find("#qtdUtilizada").html(quantidadeValida);

}

$( function () {
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 500,
        values: [ 75, 300 ],
        slide: function( event, ui ) {
            menor = ui.values[ 0 ];
            maior = ui.values[ 1 ];
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            //AtualizaLista();
            //AtualizaSegundaTabela();
        }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
        " - $" + $( "#slider-range" ).slider( "values", 1 ) );
} );