<?php
// rest : campanhagrupo

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
	case 'listar':
		listar();
		break;
	case 'listarPorCampanha':
		listarPorCampanha();
		break;
	case 'listarGruposForaDaCampanha':
		listarGruposForaDaCampanha();
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
	$obj = new Campanhagrupo(
		NULL,
		new Campanha($data['idcampanha']),
		new Lidergrupo($data['idlidergrupo'])
	);
	$control = new CampanhagrupoControl($obj);
	$response = $control->cadastrar();
	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new CampanhagrupoControl(new Campanhagrupo($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function listar () {
	$control = new CampanhagrupoControl(new Campanhagrupo);
	$response = $control->listar();
	echo json_encode($response);
}
function listarGruposForaDaCampanha () {
	$data = $_POST['data'];
	$control = new CampanhagrupoControl();
	$response = $control->listarGruposForaDaCampanha($data);
	echo json_encode($response);
}
function listarPorCampanha () {
	$data = $_POST['data'];
	$control = new CampanhagrupoControl();
	$response = $control->listarPorCampanha($data);
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Campanhagrupo(
		$data['id'],
		new Campanha($data['idcampanha']),
		new Lidergrupo($data['idlidergrupo'])
	);
	$control = new CampanhagrupoControl($obj);
	$response = $control->atualizar();
	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Campanhagrupo();
	$banco->setId($data['id']);
	$control = new CampanhagrupoControl($banco);
	echo json_encode($control->deletar());
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>