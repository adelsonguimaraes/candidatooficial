<?php
// control : segmento

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 19/07/2018.
	Data Atual: 22/07/2018.
*/

Class SegmentoControl {
	//atributos
	protected $con;
	protected $obj;
	protected $objDAO;

	//construtor
	public function __construct(Segmento $obj=NULL) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->objDAO = new SegmentoDAO($this->con);
		$this->obj = $obj;
	}

	//metodos
	function cadastrar () {
		return $this->objDAO->cadastrar($this->obj);
	}
	function buscarPorId () {
		return $this->objDAO->buscarPorId($this->obj);
	}
	function buscarSegmento ($busca) {
		return $this->objDAO->buscarSegmento($busca);
	}
	function listar () {
		return $this->objDAO->listar();
	}
	function atualizar () {
		return $this->objDAO->atualizar($this->obj);
	}
	function deletar () {
		return $this->objDAO->deletar($this->obj);
	}
	function listarPaginado ($start, $limit) {
	return $this->objDAO->listarPaginado($start, $limit);
	}
	function qtdTotal () {
		return $this->objDAO->qtdTotal();
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>