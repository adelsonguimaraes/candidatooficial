<?php
// rest : filiado

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
	$obj = new Filiado(
		NULL,
		new Bairro($data['idbairro']),
		$data['nome'],
		$data['datanascimento'],
		$data['endereco'],
		$data['numero'],
		$data['complemento'],
		$data['cidade'],
		$data['uf'],
		$data['cep'],
		$data['celular'],
		$data['email']
	);
	$control = new FiliadoControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new FiliadoControl(new Filiado($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$control = new FiliadoControl(new Filiado);
	$response = $control->listar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Filiado(
		$data['id'],
		new Bairro($data['idbairro']),
		$data['nome'],
		$data['datanascimento'],
		$data['endereco'],
		$data['numero'],
		$data['complemento'],
		$data['cidade'],
		$data['uf'],
		$data['cep'],
		$data['celular'],
		$data['email']
	);
	$control = new FiliadoControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Filiado();
	$banco->setId($data['id']);
	$control = new FiliadoControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>