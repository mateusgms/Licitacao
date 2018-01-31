angular.module('meusServicos', ['ngResource'])
    .factory("RecursosItens", function ($resource) {
        return $resource('contratos.json', {}, {
            getData: {
                method: 'GET',
                isArray: false
            }
        });
    })
    .factory('ListaContrato', function ($resource) {
        return $resource('contratos.json', {}, {
            getData: {
                method: 'GET',
                isArray: false
            }
        });
    })
 .factory('ListaGrupo', function ($resource) {
        return $resource('grupoindice.json', {}, {
            getData: {
                method: 'GET',
                isArray: false
            }
        });
    });
