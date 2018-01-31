angular.module("dashboardApp", ["minhasDiretivas", "ngAnimate", "ngRoute", "meusServicos"])
       .config(function($routeProvider, $locationProvider) {
         $locationProvider.html5Mode(true);
         $routeProvider.when("/", {
             templateUrl : "partials/welcome.html",
             controller : "ContratoController"
         });
         $routeProvider.when("/novocontrato", {
             templateUrl : "partials/novo-contrato.html",
             controller : "ControllerContrato"
         });
        $routeProvider.when("/selecaodegrupos/:numero", {
             templateUrl : "partials/selecao-grupos.html",
             controller : "ContratoController"
         });
         $routeProvider.when("/listavariacao",{
          templateUrl : "partials/lista-variacao.html",
          controller : "GruposController"
         });
         $routeProvider.when("/adicionavariacao/:indice",{
          templateUrl : "partials/adicionar-variacao.html",
          controller : "GruposController"
         });
          $routeProvider.when("/novogrupo",{
          templateUrl : "partials/adiciona-grupo.html",
          controller : "SelecaoController"
         });
           $routeProvider.when("/novoindice",{
          templateUrl : "partials/adiciona-indice.html",
          controller : "SelecaoController"
         });
         $routeProvider.when("/resultadofinal", {
           templateUrl : "partials/resultado-final.html",
           controller : "SelecaoController"
         });
         $routeProvider.otherwise({redirectTo : "/"});
       });
