angular.module(module).controller('menuCtrl', function ($location, $rootScope, $scope) {
    
    if ($rootScope.usuario) {
        $rootScope.menu = 'app/views/commons/';
        $rootScope.menu += ($rootScope.usuario.perfil > 'ADM') ? 'subheaderPanelLider.html' : 'subheaderPanel.html';
    }
    
    var activeMenu = function (item) {
        var menus = document.querySelector('.subheader-menu');
        if (menus!==null) {
            menus = menus.querySelectorAll('a');
            for (i in menus) {
                if (menus[i] !== null && menus[i].tagName === 'A') {
                    menus[i].classList.remove('subheader-menu-active');
                    if (menus[i].id === item) {
                        menus[i].classList.add('subheader-menu-active');
                    }
                }
            }
        }
    }
    activeMenu(window.location.hash.replace('#/', ''));
    
    if ("onhashchange" in window) {
        window.addEventListener("hashchange", function (e) {
            activeMenu(window.location.hash.replace('#/', ''));
        });
    }


    $scope.itemClick = function (item) {
        activeMenu(window.location.hash.replace('#/', ''));

        switch (item) {
            case 'home':
                $location.path('/home');
                break;
            case 'Sobre':
                alert('Sobre');
                // $location.path('/login');
                break;
            case 'filiar':
                $location.path('/filiar');
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
                $location.path('/filiados');
                break;
            case 'campanhas':
                $location.path('/campanhas');
                break;
            case 'logout':
                $rootScope.logout();
                break;
        }
    }
});