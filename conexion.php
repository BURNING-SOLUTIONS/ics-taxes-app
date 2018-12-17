<?php

class sqlServerConecction{
	// Declaración de una propiedad
	private $serverName;
	private $databaseName;
	private $username;
	private $password;

	function __construct($server, $database, $user, $pass) {
		$this->serverName = $server;
		$this->databaseName = $database;
		$this->username = $user;
		$this->password = $pass;
	}

	// Declaración de un método
	public function conectToSqlServerDatabase() {
		$conn = sqlsrv_connect( $this->serverName, 
			array( 
				"Database"=>$this->databaseName, 
				"UID"=>$this->username, 
				"PWD"=>$this->password));
		if(!$conn) {
			throw new Exception("Ha ocurrido un error conectandose a la base de datos");	
		}
		return $conn;
	}

	public function createQuery($conn, $sql){
		return sqlsrv_query($conn,$sql);
	}

} 

?>