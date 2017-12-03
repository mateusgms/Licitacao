function atualizaListas() {

    var html = '';

    var grupoArray = ['Option 1', 'Option 2', 'Option 3'];

    grupoArray.forEach(function(word) {
        html+='<option value="'+word+'">';
    });

    $("#listagrupo").append(html);

}

// { "osCars": [
//     {   "id": 1,
//         "name": "Cadillac",
//         "type": "Sedan",
//         "desc": "A fine American automobile"
//     },
//     {   "id": 2,
//         "name": "BWM",
//         "type": "Sedan",
//         "desc": "A fine German automobile"
//     },
//     {   "id": 3,
//         "name": "Lexus",
//         "type": "Sedan",
//         "desc": "A fine Japanese automobile"
//     }
// ]}

/*Funcao para futuro Json*/
// function getCars() {
//     var url, carOption;
//     url = 'js/cars.json';
//
//     $.getJSON(url, function(data) {
//         //populate the cars datalist
//         $(data.osCars).each(function() {
//             carsOption = "<option value=\"" + this.id + "\">" + this.name + "</option>";
//             $('#carList').append(carsOption);
//         });
//     });
// }
