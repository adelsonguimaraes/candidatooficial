function mainCtrl ($location, $rootScope, authenticationAPI, $uibModal) {
    // authenticationAPI.verificaSessao();
    authenticationAPI.sessionCtrl();
}
angular
    .module(module)
    .controller('mainCtrl', mainCtrl);