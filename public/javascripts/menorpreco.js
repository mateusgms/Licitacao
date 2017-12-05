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
            .attr("value", value).text(key));
    });

}

function atualizaListas() {

    /* atualiza todas as listas com o primeiro elemento selecionado*/

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

    var row = '<tr>';
    // $.each(names, function(index, name) {
    //     row += '<td>' + c + '</td>';
    // });
    row += '<td>' + grupo + '</td>';
    row += '<td>' + produto + '</td>';
    row += "<td><img src='images/butaodeletar.png' class='btnDelete' width='20' height='20'/></td>";
    row += '<tr>';

    $("#tblData tbody").after(row);

    $(".btnDelete").bind("click", Delete);

};

function Delete(){
    var par = $(this).parent().parent(); //tr
    par.remove();
};












