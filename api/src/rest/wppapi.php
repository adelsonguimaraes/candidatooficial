<?php
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
require_once '../../util/WppAPI.php';

//verifica requisição
switch ($_POST['metodo']) {
    case 'cadastrar':
		cadastrar();
        break;
    case 'atualizar':
		atualizar();
        break;
    case 'listar':
		listar();
        break;
    case 'buscarAppkey':
		buscarAppkey();
        break;
    case 'deletar':
		deletar();
        break;
    case 'enviar':
		enviar();
		break;
}

function cadastrar () {
    $data = $_POST['data'];
    $control = new WppControl(new Wpp(
        NULL,
        $data['celular'],
        $data['appkey']
    ));
    $response = $control->cadastrar();
    echo json_encode($response);
}

function atualizar () {
    $data = $_POST['data'];
    $control = new WppControl(new Wpp(
        $data['id'],
        $data['celular'],
        $data['appkey']
    ));
    $response = $control->atualizar();
    echo json_encode();
}

function buscarAppkey () {
    $data = $_POST['data'];
    $control = new WppControl();
    $response = $control->buscarAppkey($data);
    echo json_encode($response);
}

function listar () {
    $control = new WppControl();
    $response = $control->listar();
    echo json_encode($response);
}

function deletar () {
    $data = $_POST['data'];
    $control = new WppControl(new Wpp($data['id']));
    $response = $control->deletar();
    echo json_encode($response);
}

function enviar () {
    $data = $_POST['data'];

    // getando informações da campanha
    $campanhaControl = new CampanhaControl(new Campanha($data['idcampanha']));
    $response = $campanhaControl->buscarPorId();
    if ($response['success']===false) die (json_encode($response));
    $campanha = $response['data'];

    $wpp = new WppAPI();

    foreach ($data['grupos'] as $key) {
        // getando grupo e chave
        $lgControl = new LiderGrupoControl();
        $response = $lgControl->listarFiliados($key['id']);
        if ($response['success'] === false) die(json_encode($response));
        $lista = $response['data'];

        // envia msgs para os filiados
        foreach ($lista as $filiado) {
            $cel = '+55' . substr($filiado['celular'], 0, 2) . substr($filiado['celular'], 3);
            $appkey = $filiado['appkey'];
            $msg = $campanha->descricao;
            $response = $wpp->send($cel, $msg, $appkey);
        }

        $control = new CampanhaGrupoControl(new CampanhaGrupo(
            NULL,
            new Campanha ($data['idcampanha']),
            new LiderGrupo ($key['id'])
        ));
        $response = $control->cadastrar();
        if ($response['success']===false) die(json_encode($response));


        // $numeros = array(
        //     '9281440856', // Nilton
        //     '9293138892', // samu
        //     '9291764093', // dayane
        //     '9291593335', // mae
        //     '9292394535' // pai
        // );
        

        // Result codes
        // Code 0: Message queued -  Mensagem enfileirada
        // Code -1: Invalid apikey -  apikey inválido
        // Code -2: Missing parameters - Parâmetros ausentes
        // Code -3: You cannot send messages to this number because it has never written to you - Você não pode enviar mensagens para este número porque ele nunca escreveu para você
        // Code -5: You cannot send more messages to this number - Você não pode enviar mais mensagens para este número
        // Code -6: Your Apikey is not ready yet - Seu Apikey ainda não está pronto
        // Code -7: Your Apikey is OFFLINE - Seu Apikey está OFFLINE
        // Code -8: You must encode text parameter as UTF-8 - Você deve codificar o parâmetro text como UTF-8
        // Code -9: You cannot send a message to yourself - Você não pode enviar uma mensagem para si mesmo
    }

    echo json_encode($response);
}


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>