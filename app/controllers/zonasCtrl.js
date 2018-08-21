angular.module(module).controller('zonasCtrl', function ($location, $rootScope, $scope, genericAPI, SweetAlert) {
    if (!$rootScope.usuario) $location.path('/login');

    $scope.clickZona = function (zona) {
        var dados = { 'session': true, 'metodo': 'listarPorZona', 'data': zona, 'class': 'bairro' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.lista = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    $rootScope.loading = 'none';
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    };
    $scope.clickZona('tudo');
});