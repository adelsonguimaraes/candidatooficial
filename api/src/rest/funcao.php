<?php
// rest : funcao

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
	case 'buscarFuncao':
		buscarFuncao();
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
	$obj = new Funcao(
		NULL,
		$data['descricao']
	);
	$control = new FuncaoControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new FuncaoControl(new Funcao($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function buscarFuncao () {
	$data = $_POST['data'];
	$control = new FuncaoControl();
	$response = $control->buscarFuncao($data);
	echo json_encode($response);
}
function listar () {
	$control = new FuncaoControl(new Funcao);
	$response = $control->listar();
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Funcao(
		$data['id'],
		$data['descricao']
	);
	$control = new FuncaoControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Funcao();
	$banco->setId($data['id']);
	$control = new FuncaoControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>