$(document).ready(function() {

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

    /*verifica se o codigo ja nao esta no vetor*/

    var row = '<tr>';
    row += "<td style=\"display: none\"><input class = 'codInput' name = 'codigo'>  </td>";
    row += "<td style=\"display: none\"><input class = 'qtInput' name = 'quantidade'>  </td>";
    row += "<td class = 'codigo'> 165 </td>";
    row += '<td>' + 'Arroz' + '</td>';
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
    row += '<tr>';

    $("#tblData tbody").after(row);

    setaCodigo($(".quantidade"));

    $(".btnDelete").bind("click", Delete);

    $(".quantidade").on("change", AtualizaValor);


}

function setaCodigo(path) {
    var cod = path.parent().parent().find('.codigo').html();
    path.parent().parent().find('.codInput').val(cod);
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












