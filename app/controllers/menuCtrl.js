angular.module(module).controller('menuCtrl', function ($location, $rootScope, $scope) {
    $scope.itemClick = function (item) {
        switch (item) {
            case 'home':
                $location.path('/home');
                break;
            case 'campanha':
                alert('Campanha');
                // $location.path('/login');
                break;
            case 'filiar':
                alert('Fialiar');
                // $location.path('/login');
                break;
            case 'login':
                $location.path('/login');
                break;
            // interno
            case 'panel':
                $location.path('/panel');
                break;
            case 'lideres':
                $location.path('/login');
                break;
            case 'filiados':
                $location.path('/login');
                break;
            case 'logout':
                $rootScope.logout();
                break;
        }
    }
});