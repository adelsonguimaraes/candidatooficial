<?php
// model : lider

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 19/07/2018.
	Data Atual: 22/07/2018.
*/

Class Lider implements JsonSerializable {
	//atributos
	private $id;
	private $objlider;
	private $objfuncao;
	private $objbairro;
	private $objsegmento;
	private $nome;
	private $endereco;
	private $numero;
	private $complemento;
	private $cidade;
	private $uf;
	private $cep;
	private $localidade;
	private $celular;
	private $email;
	private $datacadastro;
	private $dataedicao;

	//constutor
	public function __construct
	(
		$id = NULL,
		Lider $objlider = NULL,
		Funcao $objfuncao = NULL,
		Bairro $objbairro = NULL,
		Segmento $objsegmento = NULL,
		$nome = NULL,
		$endereco = NULL,
		$numero = NULL,
		$complemento = NULL,
		$cidade = NULL,
		$uf = NULL,
		$cep = NULL,
		$localidade = NULL,
		$celular = NULL,
		$email = NULL,
		$datacadastro = NULL,
		$dataedicao = NULL
	)
	{
		$this->id	= $id;
		$this->objlider	= $objlider;
		$this->objfuncao	= $objfuncao;
		$this->objbairro	= $objbairro;
		$this->objsegmento = $objsegmento;
		$this->nome	= $nome;
		$this->endereco	= $endereco;
		$this->numero	= $numero;
		$this->complemento	= $complemento;
		$this->cidade	= $cidade;
		$this->uf	= $uf;
		$this->cep	= $cep;
		$this->localidade	= $localidade;
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
	public function getObjlider() {
		return $this->objlider;
	}
	public function setObjlider($objlider) {
		$this->objlider = $objlider;
		return $this;
	}
	public function getObjfuncao() {
		return $this->objfuncao;
	}
	public function setObjfuncao($objfuncao) {
		$this->objfuncao = $objfuncao;
		return $this;
	}
	public function getObjbairro() {
		return $this->objbairro;
	}
	public function setObjbairro($objbairro) {
		$this->objbairro = $objbairro;
		return $this;
	}
	public function getObjsegmento() {
		return $this->objsegmento;
	}
	public function setObjsegmento($objsegmento) {
		$this->objsegmento = $objsegmento;
		return $this;
	}
	public function getNome() {
		return $this->nome;
	}
	public function setNome($nome) {
		$this->nome = $nome;
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
	public function getLocalidade() {
		return $this->localidade;
	}
	public function setLocalidade($localidade) {
		$this->localidade = $localidade;
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
			"objlider"	=> $this->objlider,
			"objfuncao"	=> $this->objfuncao,
			"objbairro"	=> $this->objbairro,
			"objsegmento" => $this->objsegmento,
			"nome"	=> $this->nome,
			"endereco"	=> $this->endereco,
			"numero"	=> $this->numero,
			"complemento"	=> $this->complemento,
			"cidade"	=> $this->cidade,
			"uf"	=> $this->uf,
			"cep"	=> $this->cep,
			"localidade"	=> $this->localidade,
			"celular"	=> $this->celular,
			"email"	=> $this->email,
			"datacadastro"	=> $this->datacadastro,
			"dataedicao"	=> $this->dataedicao
		];
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>