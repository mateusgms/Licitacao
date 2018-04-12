angular.module('dashboardApp')
    .controller('ContratoController',
        function ($scope, ListaContrato) {
            ListaContrato.getData(function (dados) {
                $scope.user = dados.user;
                $scope.contratos = dados.contratos;
            });
        });
