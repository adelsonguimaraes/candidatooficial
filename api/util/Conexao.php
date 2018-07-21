<?php
/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 19/07/2018.
	Data Atual: 22/07/2018.
*/

Class Conexao {
	private $con;

	protected function __construct () {
		$this->con = mysqli_connect("localhost","root","", "candidatooficial");
		if (mysqli_connect_error()) {
			echo "Falha na conexão com MySQL: " . mysqli_connect_error();
		}
	}
	public static function getInstance () {
		static $instance = null;
		if (null === $instance){
			$instance = new static();
		}
		return $instance;
	}
	public function getConexao () {
		mysqli_query($this->con, "SET NAMES 'utf8'");
		mysqli_query($this->con, 'SET character_set_connection=utf8');
		mysqli_query($this->con, 'SET character_set_client=utf8');
		mysqli_query($this->con, 'SET character_set_result=utf8');
		return $this->con;
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>