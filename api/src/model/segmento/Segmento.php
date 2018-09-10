<?php
// model : segmento

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 19/07/2018.
	Data Atual: 22/07/2018.
*/

Class Segmento implements JsonSerializable {
	//atributos
	private $id;
	private $descricao;
	private $datacastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		$descricao = NULL,
		$datacastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->descricao	= $descricao;
		$this->datacastro	= $datacastro;
		$this->dataedicao	= $dataedicao;
	}

	//Getters e Setters
	public function getId() {
		return $this->id;
	}
	public function setId($id) {
		$this->id = $id;
		return $this;
	}
	public function getDescricao() {
		return $this->descricao;
	}
	public function setDescricao($descricao) {
		$this->descricao = $descricao;
		return $this;
	}
	public function getDatacastro() {
		return $this->datacastro;
	}
	public function setDatacastro($datacastro) {
		$this->datacastro = $datacastro;
		return $this;
	}
	public function getDataedicao() {
		return $this->dataedicao;
	}
	public function setDataedicao($dataedicao) {
		$this->dataedicao = $dataedicao;
		return $this;
	}

	//Json Serializable
	public function JsonSerialize () {
		return [
			"id"	=> $this->id,
			"descricao"	=> $this->descricao,
			"datacastro"	=> $this->datacastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>