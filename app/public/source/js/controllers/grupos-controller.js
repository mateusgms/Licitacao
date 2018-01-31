angular.module("dashboardApp")
       .controller("GruposController", function ($scope, ListaGrupo) {
            ListaGrupo.getData(function (dados) {
                $scope.grupos = dados.grupos;
            });
        });
