angular.module(module).controller('lideresCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert) {
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
            idtipolider: $scope.tiposlider[0].id,
            idfuncao: $scope.funcoes[0].id,
            idbairro: $scope.bairros[0],
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
        obj.celular = obj.celular.replace(/[W]/g, '');

        $rootScope.loading = 'block';
        
        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $rootScope.loading = 'none';
                    $scope.cancelar();
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