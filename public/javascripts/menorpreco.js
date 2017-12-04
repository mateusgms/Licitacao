function atualizaListas() {

    var html = '';

    var grupoArray = ['Option 1', 'Option 2', 'Option 3'];

    grupoArray.forEach(function(word) {
        html+='<option value="'+word+'">';
    });

    $("#listagrupo").append(html);

}

function Add(){

    var row = '<tr>';
    // $.each(names, function(index, name) {
    //     row += '<td>' + c + '</td>';
    // });
    row += '<td>' + 'andre' + '</td>';
    row += '<td>' + 'andre' + '</td>';
    row += "<td><img src='images/butaodeletar.png' class='btnDelete' width='20' height='20'/></td>";
    row += '<tr>';

    $("#tblData tbody").append(row);

    $(".btnDelete").bind("click", Delete);

};

function Delete(){
    var par = $(this).parent().parent(); //tr
    par.remove();
};











