angular.module("dashboardApp")
.controller('NavCtrl', function NavCtrl($location, $scope) {
  $scope.currentPage = 'home';
  $scope.go = function go(page) {
    $location.path('/selecaodegrupos');
  };
});