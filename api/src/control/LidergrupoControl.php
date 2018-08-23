<?php
// control : lidergrupo

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 2018-07-19T13:15:29.263Z.
	Data Atual: 22/08/2018.
*/

Class LidergrupoControl {
	//atributos
	protected $con;
	protected $obj;
	protected $objDAO;

	//construtor
	public function __construct(Lidergrupo $obj=NULL) {
		$this->con = Conexao::getInstance()->getConexao();
		$this->objDAO = new LidergrupoDAO($this->con);
		$this->obj = $obj;
	}

	//metodos
	function cadastrar () {
		return $this->objDAO->cadastrar($this->obj);
	}
	function atualizar () {
		return $this->objDAO->atualizar($this->obj);
	}
	function buscarPorId () {
		return $this->objDAO->buscarPorId($this->obj);
	}
	function buscarGrupo($busca) {
		return $this->objDAO->buscarGrupo($busca);
	}
	function listar () {
		return $this->objDAO->listar();
	}
	function deletar () {
		return $this->objDAO->deletar($this->obj);
	}
	function listarPaginado ($start, $limit) {
		return $this->objDAO->listarPaginado($start, $limit);
	}
	function listarFiliados ($id) {
		return $this->objDAO->listarFiliados($id);
	}
	function qtdTotal () {
		return $this->objDAO->qtdTotal();
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>