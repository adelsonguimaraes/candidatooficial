<?php
// model : filiado

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 19/07/2018.
	Data Atual: 22/07/2018.
*/

Class Filiado implements JsonSerializable {
	//atributos
	private $id;
	private $objbairro;
	private $nome;
	private $datanascimento;
	private $endereco;
	private $numero;
	private $complemento;
	private $cidade;
	private $uf;
	private $cep;
	private $celular;
	private $email;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Bairro $objbairro = NULL,
		$nome = NULL,
		$datanascimento = NULL,
		$endereco = NULL,
		$numero = NULL,
		$complemento = NULL,
		$cidade = NULL,
		$uf = NULL,
		$cep = NULL,
		$celular = NULL,
		$email = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objbairro	= $objbairro;
		$this->nome	= $nome;
		$this->datanascimento	= $datanascimento;
		$this->endereco	= $endereco;
		$this->numero	= $numero;
		$this->complemento	= $complemento;
		$this->cidade	= $cidade;
		$this->uf	= $uf;
		$this->cep	= $cep;
		$this->celular	= $celular;
		$this->email	= $email;
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
	public function getObjbairro() {
		return $this->objbairro;
	}
	public function setObjbairro($objbairro) {
		$this->objbairro = $objbairro;
		return $this;
	}
	public function getNome() {
		return $this->nome;
	}
	public function setNome($nome) {
		$this->nome = $nome;
		return $this;
	}
	public function getDatanascimento() {
		return $this->datanascimento;
	}
	public function setDatanascimento($datanascimento) {
		$this->datanascimento = $datanascimento;
		return $this;
	}
	public function getEndereco() {
		return $this->endereco;
	}
	public function setEndereco($endereco) {
		$this->endereco = $endereco;
		return $this;
	}
	public function getNumero() {
		return $this->numero;
	}
	public function setNumero($numero) {
		$this->numero = $numero;
		return $this;
	}
	public function getComplemento() {
		return $this->complemento;
	}
	public function setComplemento($complemento) {
		$this->complemento = $complemento;
		return $this;
	}
	public function getCidade() {
		return $this->cidade;
	}
	public function setCidade($cidade) {
		$this->cidade = $cidade;
		return $this;
	}
	public function getUf() {
		return $this->uf;
	}
	public function setUf($uf) {
		$this->uf = $uf;
		return $this;
	}
	public function getCep() {
		return $this->cep;
	}
	public function setCep($cep) {
		$this->cep = $cep;
		return $this;
	}
	public function getCelular() {
		return $this->celular;
	}
	public function setCelular($celular) {
		$this->celular = $celular;
		return $this;
	}
	public function getEmail() {
		return $this->email;
	}
	public function setEmail($email) {
		$this->email = $email;
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
			"objbairro"	=> $this->objbairro,
			"nome"	=> $this->nome,
			"datanascimento"	=> $this->datanascimento,
			"endereco"	=> $this->endereco,
			"numero"	=> $this->numero,
			"complemento"	=> $this->complemento,
			"cidade"	=> $this->cidade,
			"uf"	=> $this->uf,
			"cep"	=> $this->cep,
			"celular"	=> $this->celular,
			"email"	=> $this->email,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>