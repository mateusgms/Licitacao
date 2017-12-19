$(document).on("click", "#pdf", function () {

    var doc = new jsPDF('p', 'pt');
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(30, 50, 'Titulo da Pagina');

    doc.setFont('courier');
    doc.setFontType('normal');
    doc.text("Texto da pagina", 30, 70);

    var columns = ["CNPJ", "Razão Social", "Preço",
        "Utilizado"];
    var rows = [];

    $('#tblData tbody tr').each(function(){

        var novo = [];

        for(var i = 0; i < 4; i++){
            var index = "td#" + i;
            novo.push($(this).find(index).html().toString().trim());
        }

        rows.push(novo);
    });

    doc.autoTable(columns, rows, {
        theme: "striped",
        startY: 120,
        headerStyles: {
            fontSize: 10,
            fontStyle: 'normal',
            textColor: [0, 0, 0],
            fillColor: [192, 207, 229]
        },
        margin: {
            right: 20,
            left: 20
        },
        styles: {
            lineWidth: 0.01,
            lineColor: 3,
            halign: 'center',
            valign: 'middle',
            columnWidth: 'auto',
            overflow: 'linebreak'
        },
        columnStyles: {
            0: {columnWidth: 150},
            1: {columnWidth: 200},
            2: {columnWidth: 100},
            3: {columnWidth: 100},
        }
    });

    doc.text("Assinatura" , 30, doc.autoTable.previous.finalY+30);

    doc.text('_______________', 30, doc.autoTable.previous.finalY+70);

    doc.save('table.pdf');
});