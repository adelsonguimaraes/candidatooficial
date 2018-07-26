angular.module(module).controller('loginCtrl', function ($location, $rootScope, $scope, authenticationAPI) {
	// verificando se o usuário está logado
	if ($rootScope.usuario) { $location.path('/home'); return false; }
	
	$scope.login = {
		usuario: '',
		senha: ''
	}
	$scope.loginerror = {
		error: false,
		msg: ''
	}

	// logar
	$scope.logar = function (obj) {
		$scope.loginerror.error = false;

		if (obj.usuario === '' || obj.senha === '') {
			$scope.loginerror.msg = 'Preenchar os campos corretamente';
			$scope.loginerror.error = true;
			return false;
		}
		var obj = {
			usuario: obj.usuario,
			senha: MD5(obj.senha)
		}

		var data = {
			metodo: 'logar',
			data: obj,
			class: 'authentication'
		}

		$scope.error = true;

		authenticationAPI.genericAuthentication(data)
		.then(function successCallback(response) {
			if (response.data.success === true) {
				authenticationAPI.createSession(response.data.data, false);
				$location.path('/panel');
			}else{
				$scope.loginerror.error = true;
				$scope.loginerror.msg = 'Login ou Senha inválidos';
			}
		});
	}
});