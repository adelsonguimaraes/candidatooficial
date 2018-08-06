angular.module(module).controller('campanhasCtrl', function ($rootScope, $scope, $location, genericAPI) {
    if (!$rootScope.usuario) $location.path('/login');
    
    $scope.novo = false;

    $scope.clickNovo = function () {
        $scope.novo = true;
    }
    $scope.cancelar = function () {
        $scope.novo = false;
    }
});