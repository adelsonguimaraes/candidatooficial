<?php
// rest : segmento

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
	case 'buscarSegmento':
		buscarSegmento();
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
	$obj = new Segmento(
		NULL,
		$data['descricao']
	);
	$control = new SegmentoControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Segmento(
		$data['id'],
		$data['descricao']
	);
	$control = new SegmentoControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new SegmentoControl(new Segmento($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function buscarSegmento () {
	$data = $_POST['data'];
	$control = new SegmentoControl();
	$response = $control->buscarSegmento($data);
	echo json_encode($response);
}
function listar () {
	$control = new SegmentoControl();
	$response = $control->listar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Segmento();
	$banco->setId($data['id']);
	$control = new SegmentoControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>