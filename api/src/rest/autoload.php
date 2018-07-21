<?php
/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 19/07/2018.
	Data Atual: 22/07/2018.
*/

//Trata requisição
if(!$_POST){
	if($_GET) {$_POST = $_GET;}
	else{$_POST =  file_get_contents ( 'php://input' );}}

// conexao
require_once("../util/Conexao.php");

// carrega class
function carregaClasses($class){
	//Verifica se existe Control no nome da classe
	if(strrpos($class, "Control")) {
		require_once("../control/".$class.".php");
	//Verifica se existe DAO no nome da classe
	}else if(strrpos($class, "DAO")) {
		$bean = strtolower(substr($class, 0, strrpos($class, "DAO")));
		require_once "../model/".$bean."/".$class.".php";
 	//se nao for control ou dao é model
 	}else{
		$bean = strtolower($class);
		require_once "../model/".$bean."/".$class.".php";
	}
}

//chama autoload
spl_autoload_register("carregaClasses");

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>