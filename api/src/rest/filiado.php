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
	case 'buscarFiliadosViaLider':
		buscarFiliadosViaLider();
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
		$response = $control->setIdLidergrupo($idfiliado, $data['idlidergrupo']);
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
	$response = $control->buscarFiliados($data['busca']);
	echo json_encode($response);
}
function buscarFiliadosViaLider () {
	$data = $_POST['data'];
	$control = new FiliadoControl();
	$response = $control->buscarFiliadosViaLider($data['busca'], $data['idlider']);
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
		$response = $control->setIdLidergrupo($idfiliado, $data['idlidergrupo']);
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
	
	$resp = getNomeGrupo($data['nome']);
	if ($resp['success']===false) die(json_encode($resp));
	$grupo = $resp['data'];

	$resp = getFiliadosAdicionados($txt, $grupo);
	if ($resp['success']===false) die(json_encode($resp));
	$totalAdicionados = $resp['data'];

	$resp = getFilaidosDesistentes($txt);
	if ($resp['success']===false) die(json_encode($resp));
	$totalDesistentes = $resp['data'];

	$resp = getFiliadosRemovidos ($txt, $grupo);
	if ($resp['success']===false) die(json_encode($resp));
	$totalRemovidos = $resp['data'];

	$response['success'] = true;
	$response['data'] = array("adicionados"=>$totalAdicionados, "desistentes"=>$totalDesistentes, "removidos"=>$totalRemovidos);

	echo json_encode($response);
}

function getNomeGrupo ($nome) {
	$response = array('success'=>false, 'data'=>'', 'msg'=>'');

	$regex = '/#[\w\W]*?[\s|.]/';
	preg_match_all($regex, $nome, $resultGrupo);
	if (count($resultGrupo[0])<=0) {
		$response['msg'] = 'Erro no nome do Grupo';
		die (json_encode($response));
	}

	$grupo = substr(trim($resultGrupo[0][0]), 0, -1);

	$controlLG = new LidergrupoControl();
	$resp = $controlLG->buscarGrupo($grupo);
	if ($resp['success']===false) die(json_encode($resp));
	if (count($resp['data'])<=0) {
		$resp['success'] = false;
		$resp['msg'] = "Grupo " . $grupo . " não foi encontrado no sistema.";
		die(json_encode($resp));
	}
	
	return $resp;
}

function getFiliadosAdicionados ($txt, $grupo) {
	$response = array('success'=>false, 'data'=>'', 'msg'=>'');

	$regex = '/\d{2}\/\d{2}\/\d{2}\s\d{1,2}:\d{2}\s?\w{0,2}\s-\s\S*\+?[\w\s]+\S*[^:]\sadicionou\s[\w\W]*?\n/';
	preg_match_all($regex, $txt, $matchs);
	// if (count($matchs[0])<=0) {
		// $response['msg'] = 'Nenhuma movimentação foi encontrada';
		// die (json_encode($response));
	// }
	// $contatos = [];
	// laço para tratamento
	$count = 0;
	foreach ($matchs[0] as $key) {
		// pegando usuário ou número
		preg_match('/\d{2}\/\d{2}\/\d{2}\s\d{1,2}:\d{2}\s?\w{0,2}/', $key, $data);
		$data = trim($data[0]);
		$split = explode(' ', $data);
		$horario = $split[1] . ':00';
		$split = explode('/', $split[0]);
		$data = '20' . $split[2] . '-' . $split[1] . '-' . $split[0];
		$datahora = $data . 'T' .$horario;

		// removendo o usuário que adicionou os contatos
		$key = preg_replace('/\d{2}\/\d{2}\/\d{2}\s\d{1,2}:\d{2}\s?\w{0,2}\s-\s\S*\+?[\w\s]+\S*[^:]\sadicionou/', '', $key);

		// regex para pegar números
		$regex = '/\d{2}\s\d{4}-\d{4}/';
		preg_match_all($regex, $key, $numeros);
		// if (count($numeros[0])<=0) {
		// 	$response['msg'] = 'Nenhum numero foi encontrada';
		// 	die (json_encode($response));
		// }

		foreach ($numeros[0] as $numero) {
			$split = explode(' ', $numero);
			$numero = $split[0] . '9' . $split[1];
			$split = explode('-', $numero);
			$numero = $split[0].$split[1];
			
			$obj = new Filiado();
			$obj->setObjlider(new Lider($grupo[0]->idlider))
				->setObjlidergrupo(new Lidergrupo($grupo[0]->id))
				->setObjbairro(new Bairro($grupo[0]->lider_idbairro))
				->setNome($numero)
				->setCelular($numero)
				->setDatacadastro($datahora);
			
			$control = new FiliadoControl($obj);
			$response = $control->cadastrarViaExport();
			
			if ($response['success'] === false) {
				die (json_encode($response));
			}
			if ($response['data']>0) $count++;
		}
	}
		
	$response['success'] = true;
	$response['data'] = $count;
	return $response;
}

function getFilaidosDesistentes ($txt) {
	$response = array('success'=>false, 'data'=>'', 'msg'=>'');

	$regex = '/\d{2}\/\d{2}\/\d{2}\s\d{1,2}:\d{2}\s?\w{0,2}\s-\s\S*\+?[\w\s]+\S*[^:]\ssaiu/';
	preg_match_all($regex, $txt, $result);
	// if (count($result[0])<=0) {
	// 	$response['msg'] = 'Nenhuma movimentação foi encontrada';
	// 	die (json_encode($response));
	// }

	// $contatos = [];
	$count = 0;
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
		if ($resp['success'] === false) {
			die($resp); // se ocorrer um erro
		}
		$filiado = $resp['data'];
		
		// se for encontrado o contato
		// if ($resp['data'] !== null) array_push($contatos, $resp['data']);

		if ($filiado !== null && $filiado['status'] !== 'DESISTENTE') {
			$response = $control->atualizarStatus($filiado['id'], 'DESISTENTE');
			if ($response['success'] === false) {
				die (json_encode($response));
			}
			$count++;
		}
	}
	$response['success'] = true;
	$response['data'] = $count;
	return $response;
}

function getFiliadosRemovidos ($txt, $grupo) {
	$response = array('success'=>false, 'data'=>'', 'msg'=>'');

	$regex = '/\d{2}\/\d{2}\/\d{2}\s\d{1,2}:\d{2}\s?\w{0,2}\s-\s\S*\+?[\w\s]+\S*[^:]\sremoveu\s[\w\W]*?\n/';
	preg_match_all($regex, $txt, $matchs);
	
	// laço para tratamento
	$count = 0;
	foreach ($matchs[0] as $key) {
		// pegando usuário ou número
		preg_match('/\d{2}\/\d{2}\/\d{2}\s\d{1,2}:\d{2}\s?\w{0,2}/', $key, $data);
		$data = trim($data[0]);
		$split = explode(' ', $data);
		$horario = $split[1] . ':00';
		$split = explode('/', $split[0]);
		$data = '20' . $split[2] . '-' . $split[1] . '-' . $split[0];
		$datahora = $data . 'T' .$horario;

		// removendo o usuário que adicionou os contatos
		$key = preg_replace('/\d{2}\/\d{2}\/\d{2}\s\d{1,2}:\d{2}\s?\w{0,2}\s-\s\S*\+?[\w\s]+\S*[^:]\sadicionou/', '', $key);

		// regex para pegar números
		$regex = '/\d{2}\s\d{4}-\d{4}/';
		preg_match_all($regex, $key, $numeros);
		

		foreach ($numeros[0] as $numero) {
			$split = explode(' ', $numero);
			$numero = $split[0] . '9' . $split[1];
			$split = explode('-', $numero);
			$numero = $split[0].$split[1];
			
			$control = new FiliadoControl();
			$response = $control->buscarPorNomeNumero($numero);
			if ($response['success'] === false) {
				die (json_encode($response));
			}
			$filiado = $response['data'];
		
			if ($filiado !== null) {
				$control = new FiliadoControl(new Filiado($filiado['id']));
				$response = $control->deletar();
				if ($response['success'] === false) {
					die (json_encode($response));
				}
				$count++;
			}
		}
	}
	$response['success'] = true;
	$response['data'] = $count;
	return $response;
}

function efetivarDesistentes () {
	$data = $_POST['data'];
	foreach ($data as $key) {
		$control = new FiliadoControl();
		$resp = $control->atualizarStatus($key['id'], 'DESISTENTE');
		if ($resp['success'] === false) {
			die (json_encode($resp));
		}
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
