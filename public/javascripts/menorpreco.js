var carrinho = {};

$(document).ready(function() {

    // $.getJSON('HTTP AQUI', function(data) {
    //     //data is the JSON string
    // });

    /*ESSA FUNCAO VAI PEGAR O CODIGO E QUANTIDADE DOS ELEMENTOS QUE JA EXISTEM
    * E ADICIONAR NO CARRINHO*/
    $('#tblData tr').each(function(){
        $(this).find('td').each(function(){
            //do your stuff, you can use $(this) to get current cell
        })
    });

    /*ESSA FUNCAO GERA OS DOIS VETORES COM OS ELEMENTOS DO CARRINHO
    * PARA PASSAR PARA O POST*/
    $("#orcamento").click(function () {
        var codigos = [];
        var quantidades = [];

        for (var codigo in carrinho) {
            codigos.push(codigo);
            quantidades.push(carrinho[codigo]);
        }

        $("#cod").val(codigos);
        $("#qt").val(quantidades);
    });

    atualizaListas();

    $("#novoItem").click(function(){
        Add();
    });

    $("#selectGrupo").change(function() {
        var val = $(this).val();
        if (val === "value1") {
            atualizaAlimentos();
        } else if (val === "value2") {
            atualizaOutra();
        } else if (val === "value3") {
            atualizaOutra();
        }
    });

    $('.deletar').click(function(e){
        var par = $(e.target).parent().parent(); //tr
        par.remove();
    });

    $(".quantidade").on("change", function (e) {

        /*pegar o codigo e atualizar a quantidade*/

        var qt = parseInt($(e.target).parent().parent().find('.quantidade').val());
        var valorIndex = $(e.target).parent().parent().find('.valor');
        var preco = parseFloat($(e.target).parent().parent().find('.preco').html());
        valorIndex.html(qt*preco);
    });

});

function atualizaAlimentos() {

    var newOptions = {
        "alimento1": "value1",
        "alimento2": "value2",
        "alimento3": "value3"
    };

    var $el = $("#selectProduto");
    $el.empty(); // remove old options
    $.each(newOptions, function(key,value) {
        $el.append($("<option></option>")
            .attr("value", value/*entra o codigo do produto*/).text(key));
    });
}

function atualizaListas() {

    /* atualiza todas as listas com o primeiro elemento ja selecionado*/

    var newOptions = {
        "Option 1": "value1",
        "Option 2": "value2",
        "Option 3": "value3"
    };

    var $el = $("#selectGrupo");
    //$el.empty(); // remove old options
    $.each(newOptions, function(key,value) {
        $el.append($("<option></option>")
            .attr("value", value).text(key));
    });

    atualizaAlimentos();
}

function Add(){

    var grupo = $('#selectGrupo').val();
    var produto = $('#selectProduto').val();
    var regiao = $('#selectRegiao').val();

    /*busca no json com esses valores de cima e atualiza embaixo a tabela*/

    var codigoItem = Math.random();

    // item ja foi colocado no carrinho
    if(carrinho.hasOwnProperty(codigoItem)){
        alert('O item ja foi adicionado.');
        return;
    }

    carrinho[codigoItem] = 0;

    var row = '<tr>';
    row += "<td class = 'codigo'>  "+ (codigoItem) +" </td>";
    row += '<td> Arroz </td>';
    row += "<td> 3 </td>";
    row += '<td>' + 'Kg' + '</td>';
    row += '<td>' + 'SE' + '</td>';
    row += "<td> 5 </td>";
    //row += "<td><input id = \"menorPreco\" type=\"checkbox\"> 8,0 </td>";
    //row += "<td><input id = \"precoMedio\" type=\"checkbox\"> 9,0 </td>";
    row += "<td class = 'preco' > 10.57 </td>";
    row += "<td><input class = 'quantidade' type=\"number\" min=\"0\" style='width: 80px' >  </td>";
    row += "<td class = 'valor'> 0 </td>";
    row += "<td><img src='images/butaodeletar.png' class='btnDelete' width='20' height='20'/></td>";
    row += '</tr>';

    $("#tblData tbody").after(row);

    $(".btnDelete").bind("click", Delete);

    $(".quantidade").on("change", AtualizaValor);
}

function AtualizaValor() {
    var qt = parseInt($(this).parent().parent().find('.quantidade').val());

    $(this).parent().parent().find('.qtInput').val(qt);

    var valorIndex = $(this).parent().parent().find('.valor');
    var preco = parseFloat($(this).parent().parent().find('.preco').html());
    valorIndex.html(qt*preco);
}

function Delete(){
    var par = $(this).parent().parent(); //tr
    par.remove();
}











