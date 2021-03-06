angular.module(module).controller('segmentoCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert, $uibModal, $timeout) {
    if (!$rootScope.usuario) $location.path('/login');

    $scope.segmentos = [];
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
    };

    $scope.listarSegmentos = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'segmento' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.segmentos = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.listarSegmentos();

    $scope.cadastrar = function (obj) {
        if (obj.id > 0) {
            var dados = { 'session': true, 'metodo': 'atualizar', 'data': obj, 'class': 'segmento' };
        } else {
            var dados = { 'session': true, 'metodo': 'cadastrar', 'data': obj, 'class': 'segmento' };
        }

        $rootScope.loading = 'block';

        // tratando celular
        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cancelar();
                    $scope.listarSegmentos();
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
                    var dados = { 'session': true, 'metodo': 'deletar', 'data': obj, 'class': 'segmento' };

                    $rootScope.loading = 'block';

                    genericAPI.generic(dados)
                        .then(function successCallback(response) {
                            if (response.data.success) {
                                $scope.listarSegmentos();
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
    $scope.buscarSegmento = function (obj) {
        if (obj.busca === undefined) {
            SweetAlert.swal({ html: true, title: "Atenção", text: 'Preencha o campo de busca corretamente.', type: "error" });
            return false;
        }

        var dados = { 'session': true, 'metodo': 'buscarSegmento', 'data': obj.busca, 'class': 'segmento' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.segmentos = response.data.data;
                    $rootScope.loading = 'none';
                    if (response.data.data.length<=0) SweetAlert.swal({ html: true, title: "Atenção", text: 'Nenhum Resultado foi encontrado.', type: "error" });
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.limparBusca = function () {
        $scope.listarSegmentos();
        $scope.busca.busca = '';
    }
});
