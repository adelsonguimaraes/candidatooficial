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
	case 'buscarFiliados':
		buscarFiliados();
		break;
	case 'listar':
		listar();
		break;
	case 'listarPorLider':
		listarPorLider();
		break;
	case 'atualizar':
		atualizar();
		break;
	case 'deletar':
		deletar();
		break;
	case 'scannearTxt':
		scannearTxt();
		break;
	case 'efetivarDesistentes':
		efetivarDesistentes();
		break;
}

function cadastrar () {
	$data = $_POST['data'];
	$obj = new Filiado();
	$obj->setObjlider(new Lider($data['idlider']))
		->setObjbairro(new Bairro($data['idbairro']))
		->setNome($data['nome'])
		->setDatanascimento($data['datanascimento'])
		->setEndereco($data['endereco'])
		->setNumero($data['numero'])
		->setComplemento($data['complemento'])
		->setCidade($data['cidade'])
		->setUf($data['uf'])
		->setCep($data['cep'])
		->setCelular($data['celular'])
		->setEmail($data['email']);

	$control = new FiliadoControl($obj);
	$response = $control->cadastrar();
	if ($response['success'] === false) die (json_encode($response));
	$idfiliado = $response['data'];

	if (!empty($data['idlidergrupo'])) {
		$control = new FiliadoControl();
		$response = $control->setIdLiderGrupo($idfiliado, $data['idlidergrupo']);
	}

	echo json_encode($response);
}
function buscarPorId () {
	$data = $_POST['data'];
	$control = new FiliadoControl(new Filiado($data['id']));
	$response = $control->buscarPorId();
	echo json_encode($response);
}
function buscarFiliados () {
	$data = $_POST['data'];
	$control = new FiliadoControl();
	$response = $control->buscarFiliados($data);
	echo json_encode($response);
}
function listar () {
	$control = new FiliadoControl(new Filiado);
	$response = $control->listar();
	echo json_encode($response);
}
function listarPorLider () {
	$data = $_POST['data'];
	$control = new FiliadoControl();
	$response = $control->listarPorLider($data);
	echo json_encode($response);
}
function atualizar () {
	$data = $_POST['data'];
	$obj = new Filiado();
	$obj->setId($data['id'])
		->setObjlider(new Lider($data['idlider']))
		->setObjbairro(new Bairro($data['idbairro']))
		->setNome($data['nome'])
		->setDatanascimento($data['datanascimento'])
		->setEndereco($data['endereco'])
		->setNumero($data['numero'])
		->setComplemento($data['complemento'])
		->setCidade($data['cidade'])
		->setUf($data['uf'])
		->setCep($data['cep'])
		->setCelular($data['celular'])
		->setEmail($data['email']);

	$control = new FiliadoControl($obj);
	$response = $control->atualizar();

	if ($response['success'] === false) die (json_encode($response));
	$idfiliado = $data['id'];

	if (!empty($data['idlidergrupo'])) {
		$control = new FiliadoControl();
		$response = $control->setIdLiderGrupo($idfiliado, $data['idlidergrupo']);
	}

	echo json_encode($response);
}
function deletar () {
	$data = $_POST['data'];
	$banco = new Filiado();
	$banco->setId($data['id']);
	$control = new FiliadoControl($banco);
	echo json_encode($control->deletar());
}
function ScannearTxt() {
	$data = $_POST['data'];

	$response = array('success'=>false, 'data'=>'', 'msg'=>'');
	$txt = str_replace(' ','+',$data['txt']);
	$txt = base64_decode($txt);
	$regex = '/\d{2}\/\d{2}\/\d{2}\s\d{1,2}:\d{2}\s?\w{0,2}\s-\s\S*\+?[\w\s]+\S*[^:]\ssaiu/';
	preg_match_all($regex, $txt, $result);
	if (count($result[0])<=0) {
		$response['msg'] = 'Nenhuma movimentação foi encontrada';
		die (json_encode($response));
	}

	$contatos = [];
	// laço para tratamento
	foreach ($result[0] as $key) {
		// quebrando a string
		preg_match('/\d{2}\/\d{2}\/\d{2}\s\d{1,2}:\d{2}/', $key, $datahora);
		$split = explode(' ', $datahora[0]);
		$data = str_replace('/', '-', $split[0]);
		$hora = $split[1];
		$split = explode('-', $data);
		$data = '20'.$split[2]. '-' .$split[1]. '-' .$split[0];

		$data = new DateTime($data.' '.$hora);
		$datahora = $data->format('Y-m-d H:i:s');

		// pegando usuário ou número
		preg_match('/\S*\+?[\w\s]+\S*[^:]\ssaiu/', $key, $contato);
		$contato = trim(utf16_2_utf8($contato[0]));
		$contato = preg_replace('/\s*saiu/', '',$contato); // remove saiu
		$contato = preg_replace('/55/', '',$contato); // remove 55
		// $contato = preg_replace('/\s*/', '',$contato); // remove espaços

		// se for numero celular
		if (preg_replace('/[\d\s]/', '', $contato) === '') {
			$contato = preg_replace('/\s/', '', $contato);
			$contato = substr($contato, 0, 2) . '9' . substr($contato, 2);
		}
		
		$control = new FiliadoControl();
		$resp = $control->buscarPorNomeNumero($contato);
		if ($resp['success'] === false) die($resp); // se ocorrer um erro
		
		// se for encontrado o contato
		if ($resp['data'] !== null) array_push($contatos, $resp['data']);
	}

	$response['success'] = true;
	$response['data'] = $contatos;
	
	echo json_encode($response);
}

function efetivarDesistentes () {
	$data = $_POST['data'];
	foreach ($data as $key) {
		$control = new FiliadoControl();
		$resp = $control->atualizarStatus($key['id'], 'DESISTENTE');
		if ($resp['success'] === false) die (json_encode($resp));
	}
	echo json_encode($resp);
}

function utf16_2_utf8 ($str) {
	$str = preg_replace('/[áàãâä]/ui', 'a', $str);
    $str = preg_replace('/[éèêë]/ui', 'e', $str);
    $str = preg_replace('/[íìîï]/ui', 'i', $str);
    $str = preg_replace('/[óòõôö]/ui', 'o', $str);
    $str = preg_replace('/[úùûü]/ui', 'u', $str);
    $str = preg_replace('/[ç]/ui', 'c', $str);
    // $str = preg_replace('/[,(),;:|!"#$%&/=?~^><ªº-]/', '_', $str);
    $str = preg_replace('/[^a-z0-9]/i', ' ', $str);
    // $str = preg_replace('/_+/', '', $str); // ideia do Bacco :)
    return $str;
} 


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>
