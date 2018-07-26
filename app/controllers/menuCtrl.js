angular.module(module).controller('menuCtrl', function ($location, $rootScope, $scope) {
    $rootScope.menu = 'app/views/commons/';
    $rootScope.menu += ($rootScope.usuario.idlider > 0) ? 'subheaderPanelLider.html' : 'subheaderPanel.html';
    
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
                $location.path('/lideres');
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