angular.module(module).controller('usuarioCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert, $uibModal, $timeout) {
    if (!$rootScope.usuario) $location.path('/login');

    $scope.usuarios = [];
    $scope.obj = {
        id: null,
        idlider: null,
        usuario: null,
        senha: null,
        administrativo: true,
        perfil: 'ADM'
    }
    $scope.novo = false;

    $scope.clickNovo = function () {
        $scope.novo = true;
        $scope.obj = {
            id: null,
            idlider: $scope.lideres[0].id,
            usuario: null,
            senha: null,
            administrativo: true,
            perfil: 'ADM'
        }
    }
    $scope.cancelar = function () {
        $scope.novo = false;
    }

    $scope.listarUsuarios = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'usuario' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.usuarios = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    $rootScope.loading = 'none';
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.listarUsuarios();


    var listarLideres = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'lider' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $rootScope.loading = 'none';
                    $scope.lideres = response.data.data;
                    $scope.obj.idlider = (response.data.data.length > 0) ? response.data.data[0].id : null;
                } else {
                    $rootScope.loading = 'none';
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    listarLideres();

    $scope.cadastrar = function (obj) {
        if (obj.id > 0) {
            var dados = { 'session': true, 'metodo': 'atualizar', 'data': obj, 'class': 'usuario' };
        } else {
            var dados = { 'session': true, 'metodo': 'cadastrar', 'data': obj, 'class': 'usuario' };
        }

        // tratando celular
        obj.senha = MD5(obj.senha);
        obj.perfil = 'LIDER';

        if (obj.administrativo) {
            obj.idlider = null; // sem lider
            obj.perfil = 'ADM';
        }

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $rootScope.loading = 'none';
                    $scope.cancelar();
                    $scope.listarUsuarios();
                    SweetAlert.swal("Sucesso!", "Sucesso na operação!", "success");
                    // alert('Cadastrado com Sucesso');
                } else {
                    $rootScope.loading = 'none';
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.edit = function (obj) {
        $scope.novo = true;
        $scope.obj = {
            id: obj.id,
            idlider: obj.idlider,
            usuario: obj.usuario,
            senha: null
        }
        if (obj.perfil === 'ADM') $scope.obj.administrativo = true;
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
                    var dados = { 'session': true, 'metodo': 'deletar', 'data': obj, 'class': 'usuario' };

                    $rootScope.loading = 'block';

                    genericAPI.generic(dados)
                        .then(function successCallback(response) {
                            if (response.data.success) {
                                $scope.listarUsuarios();
                                $timeout(function () {
                                    $rootScope.loading = 'none';
                                    SweetAlert.swal("Removido!", "Essa informação foi removida.", "success");
                                }, 100);
                            } else {
                                $timeout(function () {
                                    $rootScope.loading = 'none';
                                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
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
    $scope.buscarUsuarios = function (obj) {
        if (obj.busca === undefined) {
            SweetAlert.swal({ html: true, title: "Atenção", text: 'Preencha o campo de busca corretamente.', type: "error" });
            return false;
        }

        var dados = { 'session': true, 'metodo': 'buscarUsuarios', 'data': obj.busca, 'class': 'usuario' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.usuarios = response.data.data;
                    // $scope.showDesistentes();
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.limparBusca = function () {
        $scope.listarUsuarios();
        $scope.busca.busca = '';
    }
});
