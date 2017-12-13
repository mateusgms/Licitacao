var carrinho = {};

var json = jQuery.parseJSON('[{"CODIGO":"278852",' +
    '"TIPO" : "OBJETO",' +
    '"UNIDADE":"G",' +
    '"NOME" : "PRANCHETA PORTATIL",' +
    '"DESCRICAO":"MATERIAL EUCATEX, COMPRIMENTO 340 MM, LARGURA 230 MM, COR MARROM, CARACTERÍSTICAS ADICIONAIS COM PEGADOR METALICO",' +
    '"DATA" : "3",' +
    '"REGIAO":"SU",' +
    '"QUANTIDADE":"2",' +
    '"MEDIA":"1.93",' +
    '"MINIMO":"1.87",' +
    '"MAXIMO":"1.99"  },' +
    ' {"CODIGO":"278852",' +
    '"TIPO" : "OBJETO",' +
    '"UNIDADE":"G",' +
    '"NOME" : "PRANCHETA PORTATIL",' +
    '"DESCRICAO":"MATERIAL EUCATEX, COMPRIMENTO 340 MM, LARGURA 230 MM, COR MARROM,CARACTERÍSTICAS ADICIONAIS COM PEGADOR METALICO",' +
    '"DATA" : "3",' +
    '"REGIAO":"SE",' +
    '"QUANTIDADE":"6",' +
    '"MEDIA":"2.18666666666667",' +
    '"MINIMO":"1.91",' +
    '"MAXIMO":"2.52"}, ' +
    '{"CODIGO":"278852",' +
    '"TIPO" : "OBJETO",' +
    '"UNIDADE":"G",' +
    '"NOME" : "PRANCHETA PORTATIL",' +
    '"DESCRICAO":"MATERIAL EUCATEX, COMPRIMENTO 340 MM, LARGURA 230 MM, COR MARROM, CARACTERÍSTICAS ADICIONAIS COM PEGADOR METALICO",' +
    '"DATA" : "3",' +
    '"REGIAO":"CO",' +
    '"QUANTIDADE":"9",' +
    '"MEDIA":"15.9144444444444",' +
    '"MINIMO":"2",' +
    '"MAXIMO":"41.78"},' +
    ' { "CODIGO":"278852",' +
    '"TIPO" : "OBJETO",' +
    '"UNIDADE":"G",' +
    '"NOME" : "PRANCHETA PORTATIL","DESCRICAO":"MATERIAL EUCATEX, COMPRIMENTO 340 MM, LARGURA 230 MM, COR MARROM, CARACTERÍSTICAS ADICIONAIS COM PEGADOR METALICO",' +
    '"DATA" : "3",' +
    '"REGIAO":"NE",' +
    '"QUANTIDADE":"2",' +
    '"MEDIA":"4.945",' +
    '"MINIMO":"2.99",' +
    '"MAXIMO":"6.9" }, ' +
    '{ "CODIGO":"278852",' +
    '"TIPO" : "OBJETO",' +
    '"UNIDADE":"G",' +
    '"NOME" : "PRANCHETA PORTATIL",' +
    '"DESCRICAO":"MATERIAL EUCATEX, COMPRIMENTO 340 MM, LARGURA 230 MM, COR MARROM, CARACTERÍSTICAS ADICIONAIS COM PEGADOR METALICO",' +
    '"DATA" : "3",' +
    '"REGIAO":"NO",' +
    '"QUANTIDADE":"2",' +
    '"MEDIA":"6.1",' +
    '"MINIMO":"2.81",' +
    '"MAXIMO":"9.39"}, {"CODIGO":"216913","TIPO" : "ALIMENTO","UNIDADE":"G","NOME" : "SAL","DESCRICAO":' +
    '"SAL, TIPO GROSSO, APLICAÇÃO ALIMENTÍCIA, TEOR MAXIMO SÓDIO 360 MG/G, ADITIVOS IODO/PRUSSIATO AMARELO SODA, ACIDEZ 7,20 PH",' +
    '"DATA" : "3","REGIAO":"SU","QUANTIDADE":"23","MEDIA":"2.01434782608696","MINIMO":"0.63","MAXIMO":"3.27"}, ' +
    '{"CODIGO":"216913","TIPO" : "ALIMENTO","UNIDADE":"KG","NOME" : "SAL",' +
    '"DESCRICAO":"SAL, TIPO GROSSO, APLICAÇÃO ALIMENTÍCIA, TEOR MAXIMO SÓDIO 360 MG/G, ADITIVOS IODO/PRUSSIATO AMARELO SODA, ACIDEZ 7,20 PH",' +
    '"DATA" : "3",' +
    '"REGIAO":"SE","QUANTIDADE":"10","MEDIA":"2.932","MINIMO":"0.85","MAXIMO":"12.48"}, ' +
    '{"CODIGO":"216913","TIPO" : "ALIMENTO","UNIDADE":"KG","NOME" : "SAL",' +
    '"DESCRICAO":"SAL, TIPO GROSSO, APLICAÇÃO ALIMENTÍCIA, TEOR MAXIMO SÓDIO 360 MG/G, ADITIVOS IODO/PRUSSIATO AMARELO SODA, ACIDEZ 7,20 PH",' +
    '"DATA" : "3","REGIAO":"CO","QUANTIDADE":"5","MEDIA":"1.424","MINIMO":"0.9","MAXIMO":"1.99"}, ' +
    '{"CODIGO":"216913","TIPO" :"ALIMENTO","UNIDADE":"KG","NOME" : "SAL","DESCRICAO":"SAL, TIPO GROSSO, APLICAÇÃO ALIMENTÍCIA, TEOR MAXIMO SÓDIO 360 MG/G, ADITIVOS IODO/PRUSSIATO AMARELO SODA, ACIDEZ 7,20 PH","DATA" : "3",' +
    '"REGIAO":"NE","QUANTIDADE":"6","MEDIA":"1.56333333333333","MINIMO":"0.9","MAXIMO":"3.96"},' +
    '{"CODIGO":"216913","TIPO" : "ALIMENTO","UNIDADE":"KG","NOME" : "SAL","DESCRICAO":"TIPO GROSSO, APLICAÇÃO ALIMENTÍCIA, TEOR MAXIMO SÓDIO 360 MG/G, ADITIVOS IODO/PRUSSIATO AMARELO SODA, ACIDEZ 7,20 PH","DATA" : "3",' +
    '"REGIAO":"NO","QUANTIDADE":"9","MEDIA":"12.4166666666667","MINIMO":"1.19","MAXIMO":"100"}]');


$(document).ready(function() {

    // $.getJSON("http://codeforces.com/api/contest.list?gym=true", function(result){
    //     console.log(result);
    // });

    /*pega itens ja existentes e adicona no carrinho*/
    $('#tblData tr').each(function(){
        var quantidade = $(this).find('td#quantidade');
        quantidade = quantidade.find('input').val();
        var codigo = $(this).find('td#codigo').html();
        var preco = parseFloat($(this).find('td#preco').find('select').val());
        var regiao = $(this).find('td#regiao').html();
        if(!(quantidade === undefined || codigo === undefined || regiao === undefined)) {
            codigo = parseInt(codigo);
            quantidade = parseInt(quantidade);
            regiao = regiao.trim();
            var novo = {
                quantidade : quantidade,
                preco : preco
            };
            var id = [codigo,regiao];
            carrinho[id] = novo;
        }
    });

    /*gera dois vetores (codigo, qt) para o metodo post*/
    $("#orcamento").click(function () {
        var codigos = [];
        var quantidades = [];
        var precos = [];
        var regioes = [];

        for (var key in carrinho) {
            var chave = key.split(',');
            codigos.push(chave[0]);
            regioes.push(chave[1]);
            quantidades.push(carrinho[key]['quantidade']);
            precos.push(carrinho[key]['preco']);
        }

        $("#codInput").val(codigos);
        $("#qtInput").val(quantidades);
        $("#precoInput").val(precos);
        $("#regiaoInput").val(regioes);
    });

    criarListas();

    $("#novoItem").click(function(){
        Add();
    });

    $('.sel__box__options').click(function() {

        var txt = $(this).text();

        $(this).siblings('.sel__box__options').removeClass('selected');
        $(this).addClass('selected');

        var $currentSel = $(this).closest('.sel');
        $currentSel.children('.sel__placeholder').text(txt);

        if($(this).parent().attr('id').toString().trim() === "selectGrupo"){
            atualizaSelectProduto(txt);
            atualizaSelectRegiao(-1);
        }

    });

    $('.deletar').click(function(e){
        var raiz = $(e.target).parent().parent(); //tr
        var codigo = raiz.find('td#codigo').html().trim();
        var regiao = raiz.find("td#regiao").html().trim();

        var id = [codigo,regiao];

        delete carrinho[id];
        raiz.remove();
    });

    $(".modificaqt").on("change", function (e) {

        var raiz = $(e.target).parent().parent(); // tr

        var codigo = parseInt(raiz.find('td#codigo').html());

        var quantidade = raiz.find('td#quantidade');
        quantidade = parseInt(quantidade.find('input').val());

        var preco = parseFloat(raiz.find('td#preco').find('select').val());

        var valorIndex = raiz.find('td#valor');

        var regiao = raiz.find("td#regiao").html().trim();

        var id = [codigo,regiao];

        carrinho[id]['quantidade'] = quantidade;

        valorIndex.html(quantidade*preco);
    });

    $(".preco").on('change', function (e) {

        var raiz = $(e.target).parent().parent(); // tr

        var codigo = raiz.find('td#codigo').html().trim();

        var quantidade = raiz.find('td#quantidade');
        quantidade = parseInt(quantidade.find('input').val());

        var preco = parseFloat(raiz.find('td#preco').find('select').val());

        var valorIndex = raiz.find('td#valor');

        var regiao = raiz.find("td#regiao").html().trim();

        var id = [codigo,regiao];

        carrinho[id]['preco'] = preco;
        valorIndex.html(quantidade*preco);
    })

});

$('.sel').click(function() {
    $(this).toggleClass('active');
});

function atualizaSelectRegiao(produto) {

    var codigo = parseInt(produto);

    var $el = $("#selectRegiao");
    if($el) $el.remove(); // remove opcoes antigas

    var conjunto = new Set();

    var $pai = $('#selectRegiaoPai').closest('.sel');
    $pai.children('.sel__placeholder').text('Região');

    if(produto === -1) return;

    var div = document.createElement("div");
    div.setAttribute('id','selectRegiao');
    div.setAttribute('class','sel__box');

    for(var i = 0; i < json.length; i++){
        if(codigo === parseInt(json[i]["CODIGO"])){
            if(conjunto.has(json[i]["REGIAO"])) continue;
            conjunto.add(json[i]["REGIAO"]);
            var span = document.createElement("span");
            span.setAttribute('class',"sel__box__options");
            span.setAttribute('onclick',"atualizaRegiaoSelecionada(event)");
            span.innerHTML = json[i]["REGIAO"];
            div.append(span);
        }
    }

    $('#selectRegiaoPai').append(div);

}

function atualizaSelectProduto(tipo) {

    if(tipo !== -1) tipo = tipo.toUpperCase();

    var $el = $("#selectProduto");
    if($el) $el.remove(); // remove opcoes antigas

    var $pai = $('#selectProdutoPai').closest('.sel');
    $pai.children('.sel__placeholder').text('Produto');

    var conjunto = new Set();

    var div = document.createElement("div");
    div.setAttribute('id','selectProduto');
    div.setAttribute('class','sel__box');

    for(var i = 0; i < json.length; i++){
        if(tipo === -1 || tipo === json[i]["TIPO"]){
            if(conjunto.has(json[i]["CODIGO"])) continue;
            conjunto.add(json[i]["CODIGO"]);
            var span = document.createElement("span");
            span.setAttribute('class',"sel__box__options");
            span.setAttribute('onclick',"atualizaProdutoSelecionado(event)");
            span.innerHTML = json[i]["NOME"].toLowerCase();
            span.setAttribute('codigo',json[i]["CODIGO"]);
            div.append(span);
        }
    }

    $('#selectProdutoPai').append(div);

}

function atualizaRegiaoSelecionada(e) {
    var raiz = $(e.target);

    var txt = raiz.text().toString().trim();

    raiz.siblings('.sel__box__options').removeClass('selected').removeAttr('id');
    raiz.addClass('selected');
    raiz.attr('id', 'selecionadoRegiao');

    var $currentSel = raiz.closest('.sel');
    $currentSel.children('.sel__placeholder').text(txt);
}

function atualizaProdutoSelecionado(e) {

    var raiz = $(e.target);

    var txt = raiz.text().toString().trim();

    var codigo = raiz.attr('codigo');

    raiz.siblings('.sel__box__options').removeClass('selected').removeAttr('id');
    raiz.addClass('selected');
    raiz.attr('id', 'selecionadoProduto');

    var $currentSel = raiz.closest('.sel');
    $currentSel.children('.sel__placeholder').text(txt);

    atualizaSelectRegiao(codigo);

}

function criarListas() {

    var todos = new Set();

    for(var i = 0; i < json.length; i++){
        todos.add(json[i]["TIPO"]);
    }

    var tipos = Array.from(todos);

    var $el = $("#selectGrupo");
    if($el) $el.remove(); // remove opcoes antigas

    var div = document.createElement("div");
    div.setAttribute('id','selectGrupo');
    div.setAttribute('class','sel__box');

    for(var i = 0; i < tipos.length; i++){
        var span = document.createElement("span");
        span.setAttribute('class',"sel__box__options");
        span.innerHTML = tipos[i].toLowerCase();
        div.append(span);
    }

    $('#selectGrupoPai').append(div);

    atualizaSelectProduto(-1);

}

function Add(){

    var produto = $('#selecionadoProduto');
    var regiao = $('#selecionadoRegiao');

    if(!produto.length){
        alert("Selecione o Produto");
        return;
    }
    if(!regiao.length){
        alert("Selecione a Região");
        return;
    }


    regiao = regiao.html().toString().trim();

    /*busca no json com esses valores de cima e atualiza embaixo a tabela*/

    var codigoItem = parseInt(produto.attr('codigo'));

    var id = [codigoItem,regiao];

    // item ja foi colocado no carrinho
    if(carrinho.hasOwnProperty(id)){
        alert('O item ja foi adicionado.');
        return;
    }

    var item;

    for(var i = 0; i < json.length; i++){
        if(parseInt(json[i]["CODIGO"]) === codigoItem && json[i]["REGIAO"].toString().trim() === regiao){
            item = json[i];
        }
    }

    if(!item){
        alert("erro!");
        return;
    }

    var novo = {
        quantidade : 0,
        preco : item["MEDIA"]/*preco medio*/
    };

    carrinho[id] = novo;

    var tabela = $('#tblData');

    var corpo = tabela.find('tbody');

    var linha = document.createElement("tr");

    var colCodigo = document.createElement("td");
    colCodigo.setAttribute('id','codigo');
    colCodigo.innerHTML = item["CODIGO"];
    linha.appendChild(colCodigo);

    var colNome = document.createElement("td");
    colNome.innerHTML = item["NOME"].toLowerCase();
    linha.appendChild(colNome);

    var colEspecificacao = document.createElement("td");
    colEspecificacao.innerHTML = item["DESCRICAO"].toLowerCase();
    linha.appendChild(colEspecificacao);

    var colVencimento = document.createElement("td");
    colVencimento.innerHTML = item["DATA"];
    linha.appendChild(colVencimento);

    var colUnidade = document.createElement("td");
    colUnidade.innerHTML = item["UNIDADE"];
    linha.appendChild(colUnidade);

    var colRegiao = document.createElement("td");
    colRegiao.setAttribute('id','regiao');
    colRegiao.innerHTML = item["REGIAO"];
    linha.appendChild(colRegiao);

    var colQtdp = document.createElement("td");
    colQtdp.innerHTML = item["QUANTIDADE"];
    linha.appendChild(colQtdp);

    var colPreco = document.createElement("td");
    colPreco.setAttribute('id','preco');
    colPreco.setAttribute('class','preco');
    var selectPreco = document.createElement('select');
    selectPreco.onchange = AtualizaPreco;
    var opcao1 = document.createElement('option');
    opcao1.value = item["MINIMO"];
    opcao1.innerHTML = 'R$ ' + item["MINIMO"] + ' (minimo)';
    selectPreco.append(opcao1);
    var opcao2 = document.createElement('option');
    opcao2.value = item["MEDIA"];
    opcao2.selected = 'selected';
    opcao2.innerHTML = 'R$ ' + item["MEDIA"] + ' (medio)';
    selectPreco.append(opcao2);
    var opcao3 = document.createElement('option');
    opcao3.value = item["MAXIMO"];
    opcao3.innerHTML = 'R$ ' + item["MAXIMO"] + ' (maximo)';
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

    var regiao = raiz.find("td#regiao").html().trim();

    var id = [codigo,regiao];

    carrinho[id]['quantidade'] = quantidade;
    valorIndex.html(quantidade*preco);
}

function Delete(){
    var raiz = $(this).parent().parent(); //tr
    var codigo = parseInt(raiz.find('td#codigo').html());
    var regiao = raiz.find("td#regiao").html().trim();

    var id = [codigo,regiao];

    delete carrinho[id];

    raiz.remove();
}

function AtualizaPreco() {
    var raiz = $(this).parent().parent(); // tr
    var codigo = parseInt(raiz.find('td#codigo').html());

    var quantidade = raiz.find('td#quantidade');
    quantidade = parseInt(quantidade.find('input').val());

    var valorIndex = raiz.find('td#valor');
    var preco = parseFloat(raiz.find('td#preco').find('select').val());

    var regiao = raiz.find("td#regiao").html().trim();

    var id = [codigo,regiao];

    carrinho[id]['preco'] = preco;
    valorIndex.html(quantidade*preco);
}










