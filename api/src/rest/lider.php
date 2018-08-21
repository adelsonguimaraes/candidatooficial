<?php
// rest : lider

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
	case 'buscarLideres':
		buscarLideres();
		break;
	case 'listar':
		listar();
		break;
	case 'listarSemUsuario':
		listarSemUsuario();
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
	$obj = new Lider(
		NULL,
		new Lider($data['idtipolider']),
		new Funcao($data['idfuncao']),
		new Bairro($data['idbairro']),
		$data['nome'],
		$data['endereco'],
		$data['numero'],
		$data['complemento'],
		$data['cidade'],
		$data['uf'],
		$data['cep'],
		$data['localidade'],
		$data['celular'],
		$data['email']
	);
	$control = new LiderControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new LiderControl(new Lider($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function buscarLideres () {
	$data = $_POST['data'];
	$control = new LiderControl();
	$response = $control->buscarLideres($data);
	echo json_encode($response);
}
function listar () {
	$control = new LiderControl(new Lider);
	$response = $control->listar();
	echo json_encode($response);
}
function listarSemUsuario () {
	$control = new LiderControl();
	$response = $control->listarSemUsuario();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Lider(
		$data['id'],
		new Lider($data['idtipolider']),
		new Funcao($data['idfuncao']),
		new Bairro($data['idbairro']),
		$data['nome'],
		$data['endereco'],
		$data['numero'],
		$data['complemento'],
		$data['cidade'],
		$data['uf'],
		$data['cep'],
		$data['localidade'],
		$data['celular'],
		$data['email']
	);
	$control = new LiderControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Lider();
	$banco->setId($data['id']);
	$control = new LiderControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>