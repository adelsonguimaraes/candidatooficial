angular.module(module).controller('funcaoCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert, $uibModal, $timeout) {
    if (!$rootScope.usuario) $location.path('/login');

    $scope.funcoes = [];
    $scope.obj = {
        id: null,
        descricao: null
    }
    $scope.novo = false;

    $scope.clickNovo = function () {
        $scope.novo = true;
        $scope.obj = {
            id: null,
            descricao: null
        }
    }
    $scope.cancelar = function () {
        $scope.novo = false;
    }

    $scope.listarFuncoes = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'funcao' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.tipos = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.listarFuncoes();

    $scope.cadastrar = function (obj) {
        if (obj.id > 0) {
            var dados = { 'session': true, 'metodo': 'atualizar', 'data': obj, 'class': 'funcao' };
        } else {
            var dados = { 'session': true, 'metodo': 'cadastrar', 'data': obj, 'class': 'funcao' };
        }

        $rootScope.loading = 'block';

        // tratando celular
        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $rootScope.loading = 'none';
                    $scope.cancelar();
                    $scope.listarFuncoes();
                    SweetAlert.swal("Sucesso!", "Sucesso na operação!", "success");
                    // alert('Cadastrado com Sucesso');
                } else {
                    // alert(response.data.msg);
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
            descricao: obj.descricao
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

                    $rootScope.loading = 'block';

                    var dados = { 'session': true, 'metodo': 'deletar', 'data': obj, 'class': 'funcao' };
                    genericAPI.generic(dados)
                        .then(function successCallback(response) {
                            if (response.data.success) {
                                $scope.listarFuncoes();
                                $timeout(function () {
                                    SweetAlert.swal("Removido!", "Essa informação foi removida.", "success");
                                    $rootScope.loading = 'none';
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
                        $rootScope.loading = 'none';
                    }, 200);
                }
            });
    }
    $scope.busca = {
        busca: ''
    };
    $scope.buscarFuncao = function (obj) {
        if (obj.busca === undefined) {
            SweetAlert.swal({ html: true, title: "Atenção", text: 'Preencha o campo de busca corretamente.', type: "error" });
            return false;
        }

        $rootScope.loading = 'block';

        var dados = { 'session': true, 'metodo': 'buscarFuncao', 'data': obj.busca, 'class': 'funcao' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.tipos = response.data.data;
                    $rootScope.loading = 'none';
                    if (response.data.data.length<=0) SweetAlert.swal({ html: true, title: "Atenção", text: 'Nenhum Resultado foi encontrado.', type: "error" });
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.limparBusca = function () {
        $scope.listarFuncoes();
        $scope.busca.busca = '';
    }
});
