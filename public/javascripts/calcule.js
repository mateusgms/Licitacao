var menor = 75;
var maior = 300;
$(document).ready(function() {

    $("#adicionarItem").click(function(){
        Add();
    });

    $("#calcular").click(function () {
       AtualizaLista();
       AtualizaSegundaTabela();
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

    $("#nomeItem").attr("readonly", true);

    var tabela = $("#tabelaPrincipal");

    var corpo = tabela.find("tbody");

    var linha = document.createElement("tr");

    var colCNPJ = document.createElement("td");
    colCNPJ.innerHTML = CNPJ;
    linha.appendChild(colCNPJ);

    var colRazaoSocial = document.createElement("td");
    colRazaoSocial.innerHTML = razaoSocial;
    linha.appendChild(colRazaoSocial);

    var colPreco = document.createElement("td");
    colPreco.innerHTML = precoItem;
    colPreco.setAttribute('id','preco');
    linha.appendChild(colPreco);

    var colUtilizando = document.createElement("td");
    colUtilizando.setAttribute('id','utiliza');
    var imgDeletar = document.createElement('i');
    imgDeletar.setAttribute('class', 'material-icons');
    imgDeletar.innerHTML = "done";
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
        }
        else{
            icone.html("clear");
        }

    });

}

function AtualizaSegundaTabela() {

    var menorValor = -1;
    var quantidadeValida = 0;
    var todos = 0;
    var maiorValor = 0;
    var valorTotal = 0;

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
        valorTotal = 0;
        quantidadeValida = 1;
    }

    tabela.find("#menorPreco").html("R$ " + menorValor);
    tabela.find("#precoMedio").html("R$ " + valorTotal/quantidadeValida);
    tabela.find("#maiorPreco").html("R$ " + maiorValor);
    tabela.find("#qtdPrecos").html(todos);
    tabela.find("#qtdUtilizada").html(quantidadeValida);

}

$( function() {
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