angular.module(module).controller('campanhasCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert, $timeout) {
    if (!$rootScope.usuario) $location.path('/login');

    $scope.view = 1; // 1. grid 2. cadastro 3. envio
    
    $scope.campanhaSelecionada = null;
    $scope.campanhas = [];
    $scope.obj = {
        id: null,
        nome: null,
        descricao: null
    }

    $scope.clickNovo = function () {
        $scope.view = 2; // cadastro
        $scope.obj = {
            id: null,
            nome: null,
            descricao: null
        }
    }
    $scope.cancelar = function () {
        $scope.view = 1; // grid
    }

    $scope.listarCampanhas = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'campanha' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.campanhas = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.listarCampanhas();

    $scope.listarCampanhaGrupos = function (obj) {
        var dados = { 'session': true, 'metodo': 'listarPorCampanha', 'data': obj.id, 'class': 'campanhagrupo' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.campanhagrupos = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }

    $scope.listarGruposForaDaCampanha = function (obj) {
        var dados = { 'session': true, 'metodo': 'listarGruposForaDaCampanha', 'data': obj.id, 'class': 'campanhagrupo' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.grupos = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }

    $scope.cadastrar = function (obj) {
        if (obj.id > 0) {
            var dados = { 'session': true, 'metodo': 'atualizar', 'data': obj, 'class': 'campanha' };
        } else {
            var dados = { 'session': true, 'metodo': 'cadastrar', 'data': obj, 'class': 'campanha' };
        }

        $rootScope.loading = 'block';

        // tratando celular
        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cancelar();
                    $scope.listarCampanhas();
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
            nome: obj.nome,
            cep: obj.cep,
            zona: obj.zona
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
                    var dados = { 'session': true, 'metodo': 'deletar', 'data': obj, 'class': 'campanha' };

                    $rootScope.loading = 'block';

                    genericAPI.generic(dados)
                        .then(function successCallback(response) {
                            if (response.data.success) {
                                $scope.listarCampanhas();
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
    $scope.buscarBairro = function (obj) {
        if (obj.busca === undefined) {
            SweetAlert.swal({ html: true, title: "Atenção", text: 'Preencha o campo de busca corretamente.', type: "error" });
            return false;
        }

        var dados = { 'session': true, 'metodo': 'buscarBairro', 'data': obj.busca, 'class': 'campanha' };

        $rootScope.loading = 'block';

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.bairros = response.data.data;
                    $rootScope.loading = 'none';
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.limparBusca = function () {
        $scope.listarCampanhas();
        $scope.busca.busca = '';
    }

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

    $scope.lancar = function (obj) {
        $scope.campanhaSelecionada = obj;
        $scope.view = 3; // lançar campanha
        $scope.listarGruposForaDaCampanha(obj);
    }
    $scope.cancelarLancar = function () {
        $scope.view = 1; // lançar campanha
    }

    $scope.enviarCampanha = function () {
        var grupos = [];
        for (var i in $scope.grupos) {
            if ($scope.grupos[i].lancar) grupos.push($scope.grupos[i]);
        }
        
        if (grupos.length<=0) {
            SweetAlert.swal({ html: true, title: "Atenção", text: 'Selecione os Grupos para lançar a campanha.', type: "error" });
            return false;
        }

        var dados = {
            'session': true, 
            'metodo': 'enviar', 
            'data': {
                idcampanha: $scope.campanhaSelecionada.id,
                grupos: grupos
            }, 
            'class': 'wppapi'
        };

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