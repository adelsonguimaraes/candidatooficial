angular.module(module).controller('campanhagrupoCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert) {
    if (!$rootScope.usuario) $location.path('/login');

    var codes = [
        { code: 0, description: 'Mensagem enfileirada' },
        { code: -1, description: 'A chave da API não é válida' },
        { code: -2, description: 'Faltam parâmetros na reuisição, verifique seu código' },
        { code: -3, description: 'Você não pode enviar mensagens para este número, porque ele nunca escreveu para você.' },
        { code: -5, description: 'Você não pode enviar mensagens para este número.' },
        { code: -6, description: 'A chave da sua API não está pronta.' },
        { code: -7, description: 'A chave da sua API está offline, verifique no painel.' },
        { code: -8, description: 'Você precisa codificar o parâmetro TEXT com UTF-8.' },
        { code: -9, description: 'Você não pode enviar Mensagem para sí mesmo.' }
    ];

    var getCode = function (code) {
        var result = null;
        for (var i in codes) {
            if (codes[i].code === code) {
                result = codes[i].description;
            }
        }
        return result;
    }

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