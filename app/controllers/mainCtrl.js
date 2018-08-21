function mainCtrl ($location, $rootScope, $scope, authenticationAPI, $uibModal) {
    // authenticationAPI.verificaSessao();
    authenticationAPI.sessionCtrl();
    $rootScope.candidato = {
        nome: 'Marcel Alexandre',
        cargo: 'Deputado Federal'
    }

    // modal
    $rootScope.modal = {
        title: 'My Modal',
        content: 'My content',
        rodape: '<button class="btn">Close</button>'
     }

    $rootScope.loading = 'none';

    $rootScope.loadon = function () {
        var load = document.getElementById('loading');
        load.style.display = 'block';
    }
    $rootScope.loadoff = function () {
        var load = document.getElementById('loading');
        load.style.display = 'none';
    }
    
}
angular
    .module(module)
    .controller('mainCtrl', mainCtrl);