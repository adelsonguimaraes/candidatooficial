angular.module(module).controller('campanhasCtrl', function ($rootScope, $scope, $location, genericAPI) {
    if (!$rootScope.usuario) $location.path('/login');
    console.log('vamos criar uma campanha');
});