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
	case 'enviar':
		enviar();
		break;
}

function enviar () {
    $data = $_POST['data'];
    $wpp = new WppAPI();
    $response = $wpp->send('+559281440856', $data['msg']);
    echo json_encode($response);

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


// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>