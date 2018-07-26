angular.module(module).controller('lideresCtrl', function ($rootScope, $scope, $location, genericAPI) {
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
        localidade: null,
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
            localidade: null,
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
                    alert(response.data.msg);
                    // SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.listarTipos();

    $scope.listarLideres = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'lider' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.lideres = response.data.data;
                } else {
                    alert(response.data.msg);
                    // SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
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
                    alert(response.data.msg);
                    // SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
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

    $scope.cadastrar = function (obj) {
        if (obj.id > 0) {
            var dados = { 'session': true, 'metodo': 'atualizar', 'data': obj, 'class': 'lider' };
        } else {
            var dados = { 'session': true, 'metodo': 'cadastrar', 'data': obj, 'class': 'lider' };
        }

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cancelar();
                    // SweetAlert.swal("Sucesso!", "Sucesso na operação!", "success");
                    alert('Cadastrado com Sucesso');
                } else {
                    alert(response.data.msg);
                    // SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
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
});