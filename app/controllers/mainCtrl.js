function mainCtrl ($location, $rootScope, authenticationAPI, $uibModal) {
    // authenticationAPI.verificaSessao();
    authenticationAPI.sessionCtrl();
    $rootScope.candidato = {
        nome: 'Marcel Alexandre',
        cargo: 'Deputado Federal'
    }
}
angular
    .module(module)
    .controller('mainCtrl', mainCtrl);