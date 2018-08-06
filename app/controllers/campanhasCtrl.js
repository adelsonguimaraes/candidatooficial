angular.module(module).controller('campanhasCtrl', function ($rootScope, $scope, $location, genericAPI) {
    if (!$rootScope.usuario) $location.path('/login');
    
    $scope.codes = [
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

    $scope.novo = false;

    $scope.clickNovo = function () {
        $scope.novo = true;
    }
    $scope.cancelar = function () {
        $scope.novo = false;
    }
    $scope.enviar = function (obj) {
        var dados = { 'session': true, 'metodo': 'enviar', 'data': obj, 'class': 'wppapi' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    if (response.data.result_code < 0) {
                        SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                    }else{
                        SweetAlert.swal({ html: true, title: "Sucesso", text: "A campanha foi enviada", type: "success" }); // avisa que deu tudo certo
                    }
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
});