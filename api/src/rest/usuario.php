<?php
// rest : usuario

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 19/07/2018.
	Data Atual: 22/07/2018.
*/

//inclui autoload
require_once 'autoload.php';

//verifica requisição
switch ($_POST['metodo']) {
	case 'cadastrar':
		cadastrar();
		break;
	case 'buscarPorId':
		buscarPorId();
		break;
	case 'buscarUsuarios':
		buscarUsuarios();
		break;
	case 'listar':
		listar();
		break;
	case 'atualizar':
		atualizar();
		break;
	case 'deletar':
		deletar();
		break;
}

function cadastrar () {
	$data = $_POST['data'];

	$obj = new Usuario();
	$obj->setUsuario($data['usuario'])
		->setSenha($data['senha'])
		->setPerfil($data['perfil']);
	
	$control = new UsuarioControl($obj);
	$response = $control->cadastrar();
	if ($response['success']===false) die (json_encode($response));
	$idusuario = $response['data'];

	if (!empty($data['idlider'])) {
		$control = new UsuarioControl();
		$response = $control->setarLider($idusuario, $data['idlider']);
	}

	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new UsuarioControl(new Usuario($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function buscarUsuarios () {
	$data = $_POST['data'];
	$control = new UsuarioControl();
	$response = $control->buscarUsuarios($data);
	echo json_encode($response);
}
function listar () {
	$control = new UsuarioControl(new Usuario);
	$response = $control->listar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Usuario();
	$obj->setId($data['id'])
		->setUsuario($data['usuario'])
		->setSenha($data['senha'])
		->setPerfil($data['perfil']);

	$control = new UsuarioControl($obj);
	$response = $control->atualizar();
	if ($response['success']===false) die (json_encode($response));
	$idusuario = $data['id'];

	if (!empty($data['idlider'])) {
		$control = new UsuarioControl();
		$response = $control->setarLider($idusuario, $data['idlider']);
	}

	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Usuario();
	$banco->setId($data['id']);
	$control = new UsuarioControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>