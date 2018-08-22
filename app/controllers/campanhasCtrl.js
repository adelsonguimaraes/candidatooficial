angular.module(module).controller('campanhasCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert) {
    if (!$rootScope.usuario) $location.path('/login');

    $scope.novo = false;

    $scope.clickNovo = function () {
        $scope.novo = true;
    }
    $scope.cancelar = function () {
        $scope.novo = false;
    }
    $scope.enviar = function (obj) {
        var dados = { 'session': true, 'metodo': 'enviar', 'data': obj, 'class': 'wppapi' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    console.log(response.data);
                    $rootScope.loading = 'none';
                    SweetAlert.swal({ html: true, title: "Sucesso", text: "A campanha foi enviada com sucesso!", type: "success" }); // avisa que deu tudo certo
                } else {
                    var msg = getCode(response.data.result_code);
                    SweetAlert.swal({ html: true, title: "Atenção", text: msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
});