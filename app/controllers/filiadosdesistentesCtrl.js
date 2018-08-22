angular.module(module).controller('filiadosdesistentesCtrl', function ($rootScope, $scope, genericAPI, SweetAlert, $uibModalInstance) {
    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.efetivar = function () {
        var desistentes = [];
        for (var i in $rootScope.filiadosDesistentes) {
            var desistente = $rootScope.filiadosDesistentes[i];
            if (desistente.checked) {
                desistentes.push(desistente);
            }
        }
        if (desistentes.length <= 0) {
            SweetAlert.swal("Atenção", "Marque filiados para efetivar!", "error");
        }

        var dados = { 'session': true, 'metodo': 'efetivarDesistentes', 'data': desistentes, 'class': 'filiado' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $rootScope.loading = 'none';
                    $uibModalInstance.dismiss('cancel'); // fecha a modal
                    SweetAlert.swal({ html: true, title: "Sucesso", text: "As atualizações foram efetivadas", type: "success" }); // avisa que deu tudo certo
                    $rootScope.listarFiliados();
                } else {
                    $rootScope.loading = 'none';
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
});