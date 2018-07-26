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

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.lideres = response.data.data;
                } else {
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
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    listarBairros();

    $scope.cadastrar = function (obj) {
        console.log(obj);
    }
});