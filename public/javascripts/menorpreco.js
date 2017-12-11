var carrinho = {};

$(document).ready(function() {

    /*pega itens ja existentes e adicona no carrinho*/
    $('#tblData tr').each(function(){
        var quantidade = $(this).find('td#quantidade');
        quantidade = quantidade.find('input').val();
        var codigo = $(this).find('td#codigo').html();
        var preco = parseFloat($(this).find('td#preco').find('select').val());
        if(!(quantidade === undefined || codigo === undefined)) {
            codigo = parseInt(codigo);
            quantidade = parseInt(quantidade);
            var novo = {
                quantidade : quantidade,
                preco : preco
            };
            carrinho[codigo] = novo;
        }
    });

    /*gera dois vetores (codigo, qt) para o metodo post*/
    $("#orcamento").click(function () {
        var codigos = [];
        var quantidades = [];
        var precos = [];

        for (var codigo in carrinho) {
            codigos.push(codigo);
            quantidades.push(carrinho[codigo]['quantidade']);
            precos.push(carrinho[codigo]['preco']);
        }

        $("#codInput").val(codigos);
        $("#qtInput").val(quantidades);
        $("#precoInput").val(precos);
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
        var raiz = $(e.target).parent().parent(); //tr
        var codigo = raiz.find('td#codigo').html().trim();
        delete carrinho[codigo];
        raiz.remove();
    });

    $(".modificaqt").on("change", function (e) {

        var raiz = $(e.target).parent().parent(); // tr

        var codigo = raiz.find('td#codigo').html().trim();

        var quantidade = raiz.find('td#quantidade');
        quantidade = parseInt(quantidade.find('input').val());

        var preco = parseFloat(raiz.find('td#preco').find('select').val());

        var valorIndex = raiz.find('td#valor');

        carrinho[codigo]['quantidade'] = quantidade;
        valorIndex.html(quantidade*preco);

        console.log(carrinho);
    });

    $(".preco").on('change', function (e) {

        var raiz = $(e.target).parent().parent(); // tr

        var codigo = raiz.find('td#codigo').html().trim();

        var quantidade = raiz.find('td#quantidade');
        quantidade = parseInt(quantidade.find('input').val());

        var preco = parseFloat(raiz.find('td#preco').find('select').val());

        var valorIndex = raiz.find('td#valor');

        carrinho[codigo]['preco'] = preco;
        valorIndex.html(quantidade*preco);
    })

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

    var codigoItem = 1050;

    // item ja foi colocado no carrinho
    if(carrinho.hasOwnProperty(codigoItem)){
        alert('O item ja foi adicionado.');
        return;
    }

    var novo = {
        quantidade : 0,
        preco : 9/*preco medio*/
    };

    carrinho[codigoItem] = novo;

    var tabela = $('#tblData');

    var corpo = tabela.find('tbody');

    var linha = document.createElement("tr");

    var colCodigo = document.createElement("td");
    colCodigo.setAttribute('id','codigo');
    colCodigo.innerHTML = codigoItem;
    linha.appendChild(colCodigo);

    var colNome = document.createElement("td");
    colNome.innerHTML = 'Arroz';
    linha.appendChild(colNome);

    var colEspecificacao = document.createElement("td");
    colEspecificacao.innerHTML = 'Arroz tipo 1, estilo tio joao. Pre processado';
    linha.appendChild(colEspecificacao);

    var colVencimento = document.createElement("td");
    colVencimento.innerHTML = '3';
    linha.appendChild(colVencimento);

    var colUnidade = document.createElement("td");
    colUnidade.innerHTML = 'Kg';
    linha.appendChild(colUnidade);

    var colRegiao = document.createElement("td");
    colRegiao.innerHTML = 'SE';
    linha.appendChild(colRegiao);

    var colQtdp = document.createElement("td");
    colQtdp.innerHTML = '5';
    linha.appendChild(colQtdp);

    var colPreco = document.createElement("td");
    colPreco.setAttribute('id','preco');
    colPreco.setAttribute('class','preco');
    var selectPreco = document.createElement('select');
    selectPreco.onchange = AtualizaPreco;
    var opcao1 = document.createElement('option');
    opcao1.value = 8.5;
    opcao1.innerHTML = 'R$ ' + 8.5 + ' (minimo)';
    selectPreco.append(opcao1);
    var opcao2 = document.createElement('option');
    opcao2.value = 9;
    opcao2.selected = 'selected';
    opcao2.innerHTML = 'R$ ' + 9 + ' (medio)';
    selectPreco.append(opcao2);
    var opcao3 = document.createElement('option');
    opcao3.value = 10;
    opcao3.innerHTML = 'R$ ' + 10 + ' (maximo)';
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
    inputQuantidade.style = 'width: 80px';
    inputQuantidade.onchange = AtualizaValor;
    colQuantidade.append(inputQuantidade);
    linha.appendChild(colQuantidade);

    var colValor = document.createElement("td");
    colValor.setAttribute('id', 'valor');
    colValor.innerHTML = 0;
    linha.appendChild(colValor);

    var colDeletar = document.createElement("td");
    var imgDeletar = document.createElement('img');
    imgDeletar.class = 'btnDelete';
    imgDeletar.style = 'width: 20px';
    imgDeletar.src = 'images/butaodeletar.png';
    imgDeletar.onclick = Delete;
    colDeletar.append(imgDeletar);
    linha.appendChild(colDeletar);

    corpo.prepend(linha);
}

function AtualizaValor() {
    var raiz = $(this).parent().parent(); // tr
    var codigo = parseInt(raiz.find('td#codigo').html());

    var quantidade = raiz.find('td#quantidade');
    quantidade = parseInt(quantidade.find('input').val());

    var valorIndex = raiz.find('td#valor');
    var preco = parseFloat(raiz.find('td#preco').find('select').val());

    carrinho[codigo]['quantidade'] = quantidade;
    valorIndex.html(quantidade*preco);
}

function Delete(){
    var raiz = $(this).parent().parent(); //tr
    var codigo = parseInt(raiz.find('td#codigo').html());
    delete carrinho[codigo];
    raiz.remove();
}

function AtualizaPreco() {
    var raiz = $(this).parent().parent(); // tr
    var codigo = parseInt(raiz.find('td#codigo').html());

    var quantidade = raiz.find('td#quantidade');
    quantidade = parseInt(quantidade.find('input').val());

    var valorIndex = raiz.find('td#valor');
    var preco = parseFloat(raiz.find('td#preco').find('select').val());

    carrinho[codigo]['preco'] = preco;
    valorIndex.html(quantidade*preco);
}










