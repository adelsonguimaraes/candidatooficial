angular.module(module).controller('panelCtrl', function ($location, $rootScope, $scope, genericAPI) {
    if (!$rootScope.usuario) $location.path('/login');
});