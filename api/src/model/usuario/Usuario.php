<?php
// model : usuario

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 19/07/2018.
	Data Atual: 22/07/2018.
*/

Class Usuario implements JsonSerializable {
	//atributos
	private $id;
	private $objlider;
	private $usuario;
	private $senha;
	private $perfil;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Lider $objlider = NULL,
		$usuario = NULL,
		$senha = NULL,
		$perfil = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objlider	= $objlider;
		$this->usuario	= $usuario;
		$this->senha	= $senha;
		$this->perfil	= $perfil;
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
	public function getUsuario() {
		return $this->usuario;
	}
	public function setUsuario($usuario) {
		$this->usuario = $usuario;
		return $this;
	}
	public function getSenha() {
		return $this->senha;
	}
	public function setSenha($senha) {
		$this->senha = $senha;
		return $this;
	}
	public function getPerfil() {
		return $this->perfil;
	}
	public function setPerfil($perfil) {
		$this->perfil = $perfil;
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
			"usuario"	=> $this->usuario,
			"senha"	=> $this->senha,
			"perfil"	=> $this->perfil,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>