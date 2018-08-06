function mainCtrl ($location, $rootScope, authenticationAPI, $uibModal) {
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
}
angular
    .module(module)
    .controller('mainCtrl', mainCtrl);