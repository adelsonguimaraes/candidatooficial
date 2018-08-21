<?php
// rest : bairro

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
	case 'buscarBairro':
		buscarBairro();
		break;
	case 'listar':
		listar();
		break;
	case 'listarPorZona':
		listarPorZona();
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
	$obj = new Bairro(
		NULL,
		$data['nome'],
		$data['cep'],
		$data['zona']
	);
	$control = new BairroControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new BairroControl(new Bairro($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function buscarBairro () {
	$data = $_POST['data'];
	$control = new BairroControl();
	$response = $control->buscarBairro($data);
	echo json_encode($response);
}
function listar () {
	$control = new BairroControl(new Bairro);
	$response = $control->listar();
	echo json_encode($response);
}
function listarPorZona () {
	$data = $_POST['data'];
	$control = new BairroControl();
	$response = $control->listarPorZona($data);
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Bairro(
		$data['id'],
		$data['nome'],
		$data['cep'],
		$data['zona']
	);
	$control = new BairroControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Bairro();
	$banco->setId($data['id']);
	$control = new BairroControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>