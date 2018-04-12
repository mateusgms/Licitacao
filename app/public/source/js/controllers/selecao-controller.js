angular.module('dashboardApp')
    .controller('ItensController',
        function($scope, $routeParams, RecursosItens){
            var numero = $routeParams.numero;
            RecursosItens.getData(function (dados){
                $scope.itens= dados.itens;
            })
})
