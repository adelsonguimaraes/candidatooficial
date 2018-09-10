angular.module(module).controller('lideresCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert, $timeout) {
    if (!$rootScope.usuario) $location.path('/login');

    $scope.lideres = [];
    $scope.obj = {
        id: null,
        idtipolider: null,
        idfuncao: null,
        idbairro: null,
        nome: null,
        endereco: null,
        numero: null,
        complemento: null,
        cidade: null,
        uf: null, 
        cep: null,
        localidade: 'CIDADE',
        celular: null,
        email: null
    }
    $scope.novo = false;

    $scope.clickNovo = function () {
        $scope.novo = true;
        $scope.obj = {
            id: null,
            idtipolider: ($scope.tiposlider.length > 0) ? $scope.tiposlider[0].id : null,
            idfuncao: ($scope.funcoes.length > 0) ? $scope.funcoes[0].id : null,
            idbairro: ($scope.bairros.length > 0) ? $scope.bairros[0].id : null,
            idsegmento: ($scope.segmentos.length > 0) ? $scope.segmentos[0].id : null,
            nome: null,
            endereco: null,
            numero: null,
            complemento: null,
            cidade: null,
            uf: null,
            cep: null,
            localidade: 'CIDADE',
            celular: null,
            email: null
        }
    }
    $scope.cancelar = function () {
        $scope.novo = false;
    }

    $scope.listarTipos = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'tipolider' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.tiposlider = response.data.data;
                    $scope.obj.idtipolider = (response.data.data.length > 0) ? response.data.data[0].id : null;
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.listarTipos();

    $scope.listarLideres = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'lider' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.lideres = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    $rootScope.loading = 'none';
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.listarLideres();

    var listarFuncoes = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'funcao' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.funcoes = response.data.data;
                    $scope.obj.idfuncao = (response.data.data.length > 0) ? response.data.data[0].id : null;
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    listarFuncoes();

    var listarSegmentos = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'segmento' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.segmentos = response.data.data;
                    $scope.obj.idsegmento = (response.data.data.length > 0) ? response.data.data[0].id : null;
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    listarSegmentos();

    $scope.totalFiliados = function () {
        var count = 0;
        for (var i in $scope.lideres) {
            var lider = $scope.lideres[i];
            count += +lider.filiados;
        }
        return count;
    }

    var listarBairros = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'bairro' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.bairros = response.data.data;
                    $scope.obj.idbairro = (response.data.data.length > 0) ? response.data.data[0].id : null;
                } else {response.data.msg
                    alert(response.data.msg);
                    // SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    listarBairros();

    $scope.localidades = [
        { value: 'CIDADE', descricao:'Cidade' },
        { value: 'INTERIOR', descricao: 'Interior' },
    ];
    
    $scope.cadastrar = function (obj) {
        
        if (obj.id > 0) {
            var dados = { 'session': true, 'metodo': 'atualizar', 'data': obj, 'class': 'lider' };
        } else {
            var dados = { 'session': true, 'metodo': 'cadastrar', 'data': obj, 'class': 'lider' };
        }

        // tratando celular
        obj.celular = obj.celular.replace(/[\W]/g, '');

        $rootScope.loading = 'block';
        
        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $rootScope.loading = 'none';
                    $scope.cancelar();
                    $scope.listarLideres();
                    SweetAlert.swal("Sucesso!", "Sucesso na operação!", "success");
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
            idtipolider: obj.idtipolider,
            idfuncao: obj.idfuncao,
            idbairro: obj.idbairro,
            idsegmento: obj.idsegmento,
            nome: obj.nome,
            endereco: obj.endereco,
            numero: obj.numero,
            complemento: obj.complemento,
            cidade: obj.cidade,
            uf: obj.uf,
            cep: obj.cep,
            localidade: obj.localidade,
            celular: obj.celular,
            email: obj.email
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
                    var dados = { 'session': true, 'metodo': 'deletar', 'data': obj, 'class': 'lider' };

                    $rootScope.loading = 'block';

                    genericAPI.generic(dados)
                        .then(function successCallback(response) {
                            if (response.data.success) {
                                $timeout(function () {
                                    $scope.listarLideres();
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
    $scope.buscarLideres = function (obj) {
        if (obj.busca === undefined) {
            SweetAlert.swal({ html: true, title: "Atenção", text: 'Preencha o campo de busca corretamente.', type: "error" });
            return false;
        }

        var dados = { 'session': true, 'metodo': 'buscarLideres', 'data': obj.busca, 'class': 'lider' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    if (response.data.data.length<=0) SweetAlert.swal({ html: true, title: "Atenção", text: 'Nenhum Resultado foi encontrado.', type: "error" });
                    $scope.lideres = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    $rootScope.loading = 'none';
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.limparBusca = function () {
        $scope.listarLideres();
        $scope.busca.busca = '';
    }
});