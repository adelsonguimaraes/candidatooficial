<?php
// dao : filiado

/*
	Projeto: Candidato Oficial.
	Project Owner: .
	Gerente de Projeto: Nilton Caldas Jr.
	Desenvolvedor: Adelson Guimaraes.
	Data de início: 19/07/2018.
	Data Atual: 22/07/2018.
*/

Class FiliadoDAO {
	//atributos
	private $con;
	private $sql;
	private $obj;
	private $lista = array();
	private $superdao;

	//construtor
	public function __construct($con) {
		$this->con = $con;
		$this->superdao = new SuperDAO('filiado');
	}

	//cadastrar
	function cadastrar (filiado $obj) {
		$this->sql = sprintf("INSERT INTO filiado(idlider, idbairro, nome, datanascimento, endereco, numero, complemento, cidade, uf, cep, celular, email)
		VALUES(%d, %d, upper('%s'), '%s', upper('%s'), '%s', upper('%s'), upper('%s'), upper('%s'), '%s', '%s', '%s')",
			mysqli_real_escape_string($this->con, $obj->getObjlider()->getId()),
			mysqli_real_escape_string($this->con, $obj->getObjbairro()->getId()),
			mysqli_real_escape_string($this->con, $obj->getNome()),
			mysqli_real_escape_string($this->con, $obj->getDatanascimento()),
			mysqli_real_escape_string($this->con, $obj->getEndereco()),
			mysqli_real_escape_string($this->con, $obj->getNumero()),
			mysqli_real_escape_string($this->con, $obj->getComplemento()),
			mysqli_real_escape_string($this->con, $obj->getCidade()),
			mysqli_real_escape_string($this->con, $obj->getUf()),
			mysqli_real_escape_string($this->con, $obj->getCep()),
			mysqli_real_escape_string($this->con, $obj->getCelular()),
			mysqli_real_escape_string($this->con, $obj->getEmail()));

		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Cadastrar' ) );
		}else{
			$id = mysqli_insert_id( $this->con );

			$this->superdao->setSuccess( true );
			$this->superdao->setData( $id );
		}
		return $this->superdao->getResponse();
	}

	//atualizar
	function atualizar (Filiado $obj) {
		$this->sql = sprintf("UPDATE filiado SET idlider = %d, idbairro = %d, nome = upper('%s'), datanascimento = '%s', endereco = upper('%s'), numero = '%s', complemento = upper('%s'), cidade = upper('%s'), uf = upper('%s'), cep = '%s', celular = '%s', email = '%s', dataedicao = '%s' WHERE id = %d ",
			mysqli_real_escape_string($this->con, $obj->getObjlider()->getId()),
			mysqli_real_escape_string($this->con, $obj->getObjbairro()->getId()),
			mysqli_real_escape_string($this->con, $obj->getNome()),
			mysqli_real_escape_string($this->con, $obj->getDatanascimento()),
			mysqli_real_escape_string($this->con, $obj->getEndereco()),
			mysqli_real_escape_string($this->con, $obj->getNumero()),
			mysqli_real_escape_string($this->con, $obj->getComplemento()),
			mysqli_real_escape_string($this->con, $obj->getCidade()),
			mysqli_real_escape_string($this->con, $obj->getUf()),
			mysqli_real_escape_string($this->con, $obj->getCep()),
			mysqli_real_escape_string($this->con, $obj->getCelular()),
			mysqli_real_escape_string($this->con, $obj->getEmail()),
			mysqli_real_escape_string($this->con, date('Y-m-d H:i:s')),
			mysqli_real_escape_string($this->con, $obj->getId()));
		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Atualizar' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );
		}
		return $this->superdao->getResponse();
	}

	function setIdLiderGrupo ($id, $idlidergrupo) {
		$this->sql = "UPDATE filiado set idlidergrupo = $idlidergrupo, dataedicao = now() where id = $id";
		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'setIdLiderGrupo' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );
		}
		return $this->superdao->getResponse();
	}

	function atualizarStatus ($id, $status) {
		$obj = new Filiado($id);

		$this->sql = "UPDATE filiado set status = '$status', dataedicao = now()  where id = $id";
		$this->superdao->resetResponse();

		if(!mysqli_query($this->con, $this->sql)) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'AtualizarStatus' ) );
		}else{
			$this->superdao->setSuccess( true );
			$this->superdao->setData( true );
		}
		return $this->superdao->getResponse();
	}

	//buscarPorId
	function buscarPorId (Filiado $obj) {
		$this->sql = sprintf("SELECT * FROM filiado WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'BuscarPorId' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				$this->obj = $row;
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->obj );
		}
		return $this->superdao->getResponse();
	}

	function buscarPorNomeNumero ($n) {
		$this->sql = "SELECT * from filiado where nome like '%$n%' or celular = '$n'";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'filiado', 'BuscarPorId' ) );
		}else{
			while($row = mysqli_fetch_assoc($result)) {
				$row['checked'] = true;
				$this->obj = $row;
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->obj );
		}
		return $this->superdao->getResponse();
	}

	function buscarFiliados ($busca) {
		$this->sql = "SELECT f.*, b.nome as 'bairro', l.nome as 'lider', lg.nome as 'grupo'
		FROM filiado f
		inner join bairro b on b.id = f.idbairro
		inner join lider l on l.id = f.idlider
		left join lidergrupo lg on lg.id = f.idlidergrupo
		where f.nome like '%$busca%' or f.celular = '$busca'";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Filiado' , 'buscarFiliados' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	function buscarFiliadosViaLider ($busca, $idlider) {
		$this->sql = "SELECT f.*, b.nome as 'bairro', l.nome as 'lider', lg.nome as 'grupo'
		FROM filiado f
		inner join bairro b on b.id = f.idbairro
		inner join lider l on l.id = f.idlider
		left join lidergrupo lg on lg.id = f.idlidergrupo
		where f.nome like '%$busca%' or f.celular = '$busca' and l.id = $idlider";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Filiado' , 'buscarFiliadosViaLider' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//listar
	function listar () {
		$this->sql = "SELECT f.*, b.nome as 'bairro', l.nome as 'lider', lg.nome as 'grupo'
		FROM filiado f
		inner join bairro b on b.id = f.idbairro
		inner join lider l on l.id = f.idlider
		left join lidergrupo lg on lg.id = f.idlidergrupo";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Filiado' , 'Listar' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//listar
	function listarPorLider ($idlider) {
		$this->sql = "SELECT f.*, b.nome as 'bairro', l.nome as 'lider'
		FROM filiado f
		inner join bairro b on b.id = f.idbairro
		inner join lider l on l.id = f.idlider
		where l.id = $idlider";
		$result = mysqli_query($this->con, $this->sql);

		$this->superdao->resetResponse();

		if(!$result) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Filiado' , 'Listar' ) );
		}else{
			while($row = mysqli_fetch_object($result)) {
				array_push($this->lista, $row);
			}
			$this->superdao->setSuccess( true );
			$this->superdao->setData( $this->lista );
		}
		return $this->superdao->getResponse();
	}

	//listar paginado
	function listarPaginado($start, $limit) {
		$this->sql = "SELECT * FROM filiado limit " . $start . ", " . $limit;
		$result = mysqli_query ( $this->con, $this->sql );

		$this->superdao->resetResponse();

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), 'Filiado' , 'ListarPaginado' ) );
		}else{
			while ( $row = mysqli_fetch_assoc ( $result ) ) {				array_push( $this->lista, $row);
			}

			$this->superdao->setSuccess( true );			$this->superdao->setData( $this->lista );
			$this->superdao->setTotal( $this->qtdTotal() );
		}

		return $this->superdao->getResponse();
	}
	//deletar
	function deletar (Filiado $obj) {
		$this->superdao->resetResponse();

		// buscando por dependentes
		$dependentes = $this->superdao->verificaDependentes($obj->getId());
		if ( $dependentes > 0 ) {
			$this->superdao->setMsg( resolve( '0001', $dependentes, get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$this->sql = sprintf("DELETE FROM filiado WHERE id = %d",
			mysqli_real_escape_string($this->con, $obj->getId()));
		$result = mysqli_query($this->con, $this->sql);

		if ( !$result ) {
			$this->superdao->setMsg( resolve( mysqli_errno( $this->con ), mysqli_error( $this->con ), get_class( $obj ), 'Deletar' ));
			return $this->superdao->getResponse();
		}

		$this->superdao->setSuccess( true );
		$this->superdao->setData( true );

		return $this->superdao->getResponse();
	}

	//quantidade total
	function qtdTotal() {
		$this->sql = "SELECT count(*) as quantidade FROM filiado";
		$result = mysqli_query ( $this->con, $this->sql );
		if (! $result) {
			die ( '[ERRO]: ' . mysqli_error ( $this->con ) );
		}
		$total = 0;
		while ( $row = mysqli_fetch_object ( $result ) ) {
			$total = $row->quantidade;
		}
		return $total;
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>