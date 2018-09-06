angular.module(module).controller('filiadosCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert, $uibModal, $timeout) {
    if (!$rootScope.usuario) $location.path('/login');

    $scope.filiados = [];
    $scope.filiadosDesistentes = [];
    $scope.obj = {
        id: null,
        idlider: null,
        idbairro: null,
        idlidergrupo: null,
        semgrupo: true,
        nome: null,
        datanascimento: null,
        endereco: null,
        numero: null,
        complemento: null,
        cidade: null,
        uf: null,
        cep: null,
        localidade: null,
        celular: null,
        email: null
    }
    $scope.novo = false;

    $scope.clickNovo = function () {
        $scope.novo = true;
        $scope.obj = {
            id: null,
            idlider: ($scope.lideres.length>0) ? $scope.lideres[0].id : null,
            idbairro: ($scope.bairros.length>0) ? $scope.bairros[0].id : null,
            idlidergrupo: ($scope.lidergrupos.length>0) ? $scope.lidergrupos[0].id : null,
            semgrupo: true,
            nome: null,
            datanascimento: null,
            endereco: null,
            numero: null,
            complemento: null,
            cidade: null,
            uf: null,
            cep: null,
            localidade: null,
            celular: null,
            email: null
        }
    }
    $scope.cancelar = function () {
        $scope.novo = false;
    }

    var listar = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'filiado' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.filiados = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    var listarPorLider = function () {
        var dados = { 'session': true, 'metodo': 'listarPorLider', 'data': $rootScope.usuario.idlider, 'class': 'filiado' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.filiados = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    if ($rootScope.usuario.idlider>0) {
        $rootScope.listarFiliados = listarPorLider; // se logado como LIDER
    }else{
        $rootScope.listarFiliados = listar; // se logado como ADM
    }
    $rootScope.listarFiliados();

    var listarBairros = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'bairro' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.bairros = response.data.data;
                    $scope.obj.idbairro = (response.data.data.length > 0) ? response.data.data[0].id : null;
                } else {
                    response.data.msg
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    listarBairros();

    var listarLideres = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'lider' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.lideres = response.data.data;
                    $scope.obj.idlider = (response.data.data.length > 0) ? response.data.data[0].id : null;
                } else {
                    response.data.msg
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    listarLideres();

    var listarLiderGrupos = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'lidergrupo' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.lidergrupos = response.data.data;
                    $scope.obj.idlidergrupo = (response.data.data.length > 0) ? response.data.data[0].id : null;
                } else {
                    response.data.msg
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    listarLiderGrupos();

    $scope.filiadosAtivos = function () {
        var count = 0;
        for (var i in $scope.filiados) {
            var filiado = $scope.filiados[i];
            if (filiado.status === 'ATIVO') {
                count++;
            }
        }
        return count;
    }

    $scope.filiadosEmGrupo = function () {
        var count = 0;
        for (var i in $scope.filiados) {
            var filiado = $scope.filiados[i];
            if (filiado.grupo !== null) {
                count++;
            }
        }
        return count;
    }

    $scope.cadastrar = function (obj) {
        if (obj.id > 0) {
            var dados = { 'session': true, 'metodo': 'atualizar', 'data': obj, 'class': 'filiado' };
        } else {
            var dados = { 'session': true, 'metodo': 'cadastrar', 'data': obj, 'class': 'filiado' };
        }

        // tratando celular
        obj.celular = obj.celular.replace(/[\W]/g, '');

        if (obj.semgrupo) obj.idlidergrupo = null;
        
        // se logado como lider, geta o id lider
        if ($rootScope.usuario.idlider>0) obj.idlider = $rootScope.usuario.idlider;

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cancelar();
                    $rootScope.loading = 'none';
                    SweetAlert.swal("Sucesso!", "Sucesso na operação!", "success");
                    $rootScope.listarFiliados();
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
            idlider: obj.idlider,
            idbairro: obj.idbairro,
            nome: obj.nome,
            datanascimento: new Date(obj.datanascimento),
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
    $scope.upFile = function () {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';
        input.click(); // simulando o click no botão
        // evento quando o usuário escolher o arquivo
        input.addEventListener('change', function (e) {
            var reader = new FileReader();
            reader.onload = function (file) {
                var base64 = file.target.result;

                var data = {
                    txt: base64
                };

                $rootScope.loading = 'block';

                var dados = { 'session': true, 'metodo': 'scannearTxt', 'data': data, 'class': 'filiado' };

                genericAPI.generic(dados)
                    .then(function successCallback(response) {
                        if (response.data.success) {
                            $rootScope.loading = 'none';
                            $rootScope.filiadosDesistentes = response.data.data;
                            $scope.showDesistentes();
                        } else {
                            $rootScope.loading = 'none';
                            SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                        }
                    }, function errorCallback(response) {
                    });
            }
            reader.readAsDataURL(e.path[0].files[0]);
        });
    }
    $scope.showDesistentes = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/views/modal/filiadosdesistentes.html',
            controller: 'filiadosdesistentesCtrl',
            size: 'lg',
            backdrop: 'static'
        });
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
                    var dados = { 'session': true, 'metodo': 'deletar', 'data': obj, 'class': 'filiado' };

                    $rootScope.loading = 'block';

                    genericAPI.generic(dados)
                        .then(function successCallback(response) {
                            if (response.data.success) {
                                $timeout(function () {
                                    $rootScope.listarFiliados();
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
    $scope.buscarFiliados = function (obj) {
        if (obj.busca === undefined) {
            SweetAlert.swal({ html: true, title: "Atenção", text: 'Preencha o campo de busca corretamente.', type: "error" });
            return false;
        }

        var data = {
            busca: obj.busca,
            idlider: ''
        }

        if ($rootScope.usuario.idlider>0) {
            data.idlider = $rootScope.usuario.idlider;
            var dados = { 'session': true, 'metodo': 'buscarFiliadosViaLider', 'data': data, 'class': 'filiado' };
        }else{
            var dados = { 'session': true, 'metodo': 'buscarFiliados', 'data': data, 'class': 'filiado' };
        }
        
        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    if (response.data.data.length<=0) SweetAlert.swal({ html: true, title: "Atenção", text: 'Nenhum Resultado foi encontrado.', type: "error" });
                    $scope.filiados = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    $rootScope.loading = 'none';
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.limparBusca = function () {
        $rootScope.listarFiliados();
        $scope.busca.busca = '';
    }
});
