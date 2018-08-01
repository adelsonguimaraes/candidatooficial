angular.module(module).controller('filiadosCtrl', function ($rootScope, $scope, $location, genericAPI, SweetAlert) {
    if (!$rootScope.usuario) $location.path('/login');

    $scope.filiados = [];
    $scope.obj = {
        id: null,
        idlider: null,
        idbairro: null,
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
            idlider: null,
            idbairro: $scope.bairros[0],
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

    $scope.listarFiliados = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'filiado' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.filiados = response.data.data;
                } else {
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    $scope.listarFiliados();


    var listarBairros = function () {
        var dados = { 'session': true, 'metodo': 'listar', 'data': '', 'class': 'bairro' };

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.bairros = response.data.data;
                    $scope.obj.idbairro = (response.data.data.length > 0) ? response.data.data[0].id : null;
                } else {response.data.msg
                    SweetAlert.swal({ html: true, title: "Atenção", text: response.data.msg, type: "error" });
                }
            }, function errorCallback(response) {
            });
    }
    listarBairros();

    $scope.cadastrar = function (obj) {
        if (obj.id > 0) {
            var dados = { 'session': true, 'metodo': 'atualizar', 'data': obj, 'class': 'filiado' };
        } else {
            var dados = { 'session': true, 'metodo': 'cadastrar', 'data': obj, 'class': 'filiado' };
        }

        obj.idlider = $rootScope.usuario.idlider;

        genericAPI.generic(dados)
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cancelar();
                    SweetAlert.swal("Sucesso!", "Sucesso na operação!", "success");
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
        input.click();
        input.addEventListener('change', function (e) {
            console.log(e);
        });
    }
});