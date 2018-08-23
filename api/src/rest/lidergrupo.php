<?php
// rest : lidergrupo

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 2018-07-19T13:15:29.263Z.
	Data Atual: 22/08/2018.
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
	case 'buscarGrupo':
		buscarGrupo();
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
	$obj = new Lidergrupo(
		NULL,
		new Lider($data['idlider']),
		new Wpp($data['idappkey']),
		$data['nome']
	);
	$control = new LidergrupoControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new LidergrupoControl(new Lidergrupo($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function buscarGrupo () {
	$data = $_POST['data'];
	$control = new LidergrupoControl();
	$response = $control->buscarGrupo($data);
	echo json_encode($response);
}
function listar () {
	$control = new LidergrupoControl(new Lidergrupo);
	$response = $control->listar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Lidergrupo(
		$data['id'],
		new Lider($data['idlider']),
		new Wpp($data['idappkey']),
		$data['nome']
	);
	$control = new LidergrupoControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Lidergrupo();
	$banco->setId($data['id']);
	$control = new LidergrupoControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>