<?php
// model : lidergrupo

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 2018-07-19T13:15:29.263Z.
	Data Atual: 22/08/2018.
*/

Class Lidergrupo implements JsonSerializable {
	//atributos
	private $id;
	private $objlider;
	private $objappkey;
	private $nome;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Lider $objlider = NULL,
		Wpp $objappkey = NULL,
		$nome = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objlider	= $objlider;
		$this->objappkey = $objappkey;
		$this->nome	= $nome;
		$this->datacadastro	= $datacadastro;
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
	public function getObjlider() {
		return $this->objlider;
	}
	public function setObjlider($objlider) {
		$this->objlider = $objlider;
		return $this;
	}
	public function getObjAppkey() {
		return $this->objappkey;
	}
	public function setObjAppkey($objappkey) {
		$this->objappkey = $objappkey;
		return $this;
	}
	public function getNome() {
		return $this->nome;
	}
	public function setNome($nome) {
		$this->nome = $nome;
		return $this;
	}
	public function getDatacadastro() {
		return $this->datacadastro;
	}
	public function setDatacadastro($datacadastro) {
		$this->datacadastro = $datacadastro;
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
			"objlider"	=> $this->objlider,

			"objappkey" => $this->objappkey,
			"nome"	=> $this->nome,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>