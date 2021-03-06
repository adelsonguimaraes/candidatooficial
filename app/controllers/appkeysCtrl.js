angular.module(module).controller('appkeysCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert, $uibModal, $timeout) {
    if (!$rootScope.usuario) $location.path('/login');

    $scope.appkeys = [];
    $scope.obj = {
        id: null,
        celular: null,
        wpp: null
    }
    $scope.view = 1; // 1. Grid 2. Form 3. APIWHA

    $scope.clickNovo = function () {
        $scope.view = 2; // form
        $scope.obj = {
            id: null,
            celular: null,
            wpp: null
        }
    }
    $scope.cancelar = function () {
        $scope.view = 1; // grid
    }

    $scope.listarAppkeys = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'wppapi' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.appkeys = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.listarAppkeys();

    $scope.cadastrar = function (obj) {
        if (obj.id > 0) {
            var dados = { 'session': true, 'metodo': 'atualizar', 'data': obj, 'class': 'wppapi' };
        } else {
            var dados = { 'session': true, 'metodo': 'cadastrar', 'data': obj, 'class': 'wppapi' };
        }

        $rootScope.loading = 'block';

        // tratando celular
        obj.celular = obj.celular.replace(/[\W]/g, '');

        // tratando celular
        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cancelar();
                    $scope.listarAppkeys();
                    SweetAlert.swal("Sucesso!", "Sucesso na operação!", "success");
                    $rootScope.loading = 'none';
                    // alert('Cadastrado com Sucesso');
                } else {
                    // alert(response.data.msg);
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.edit = function (obj) {
        $scope.view = 2; // form
        $scope.obj = {
            id: obj.id,
            celular: obj.celular,
            appkey: obj.appkey
        }
    }
    $scope.delete = function (obj) {
        SweetAlert.swal({
            title: "Deseja remover?",
            text: "Os dados serão removidos do sistema!",
            type: "warning",
            showCancelButton: true,
            html: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, remova!",
            cancelButtonText: "Não, cancele!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                swal.close();
                if (isConfirm) {
                    var dados = { 'session': true, 'metodo': 'deletar', 'data': obj, 'class': 'wppapi' };

                    $rootScope.loading = 'block';

                    genericAPI.generic(dados)
                        .then(function successCallback(response) {
                            if (response.data.success) {
                                $scope.listarAppkeys();
                                $timeout(function () {
                                    $rootScope.loading = 'none';
                                    SweetAlert.swal("Removido!", "Essa informação foi removida.", "success");
                                }, 100);
                            } else {
                                $timeout(function () {
                                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                                    $rootScope.loading = 'none';
                                }, 100);
                            }
                        }, function errorCallback(response) {
                        });
                } else {
                    $timeout(function () {
                        SweetAlert.swal("Cancelado", "A informação foi mantida :)", "error");
                    }, 100);
                }
            });
    }
    $scope.busca = {
        busca: ''
    };
    $scope.buscarAppkey = function (obj) {
        if (obj.busca === undefined) {
            SweetAlert.swal({ html: true, title: "Atenção", text: 'Preencha o campo de busca corretamente.', type: "error" });
            return false;
        }

        var dados = { 'session': true, 'metodo': 'buscarAppkey', 'data': obj.busca, 'class': 'wppapi' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.appkeys = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.limparBusca = function () {
        $scope.listarAppkeys();
        $scope.busca.busca = '';
    }
    $scope.whatspanel = function () {
        $scope.view = 3; // api panel
    }
    $scope.whatspanelcancel = function () {
        $scope.view = 1; // api panel
    }
});
