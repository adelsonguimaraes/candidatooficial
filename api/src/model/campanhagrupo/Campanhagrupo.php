<?php
// model : campanhagrupo

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 2018-07-19T13:15:29.263Z.
	Data Atual: 22/08/2018.
*/

Class Campanhagrupo implements JsonSerializable {
	//atributos
	private $id;
	private $objcampanha;
	private $objlidergrupo;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Campanha $objcampanha = NULL,
		Lidergrupo $objlidergrupo = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objcampanha	= $objcampanha;
		$this->objlidergrupo	= $objlidergrupo;
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
	public function getObjcampanha() {
		return $this->objcampanha;
	}
	public function setObjcampanha($objcampanha) {
		$this->objcampanha = $objcampanha;
		return $this;
	}
	public function getObjlidergrupo() {
		return $this->objlidergrupo;
	}
	public function setObjlidergrupo($objlidergrupo) {
		$this->objlidergrupo = $objlidergrupo;
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
			"objcampanha"	=> $this->objcampanha,
			"objlidergrupo"	=> $this->objlidergrupo,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>