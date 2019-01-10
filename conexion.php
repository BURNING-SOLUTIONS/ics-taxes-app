<?php

class sqlServerConecction
{
    // Declaración de una propiedad
    private $serverName;
    private $databaseName;
    private $username;
    private $password;
    public $conn;

    function __construct($server, $database, $user, $pass)
    {
        $this->serverName = $server;
        $this->databaseName = $database;
        $this->username = $user;
        $this->password = $pass;
        return $this->tryToConnect();
    }

    public function setConnection($connection)
    {
        $this->conn = $connection;
    }

    public function getConnection()
    {
        return $this->conn;
    }

    public function tryToConnect()
    {
        try {
            # Establenciendo nueva instancia de la clase coneccion to sql server..
            $this->conectToSqlServerDatabase();
        } catch (Exception $e) {
            $jsondata['status'] = array('ok' => false, 'message' => $e->getMessage());
            echo json_encode($jsondata);
            exit();
        }
        return $this->getConnection();
    }

    // Declaración de un método
    public function conectToSqlServerDatabase()
    {
        $new_conn = sqlsrv_connect($this->serverName,
            array(
                "Database" => $this->databaseName,
                "UID" => $this->username,
                "PWD" => $this->password));
        if (!$new_conn) {
            throw new Exception("Ha ocurrido un error conectandose a la base de datos");
        }
        $this->setConnection($new_conn);
    }


    public function createQuery($sql)
    {
        return sqlsrv_query($this->getConnection(), $sql);
    }

    public function getClientData($empresa, $cliente)
    {
        $sql =
            " SELECT Nom_Cli,Cod_Cli,EMail_Cli,Baja_Cli,Bloqueo_Cli, BloqueoNac_Cli,PorCarbu_Cli,TarNac_Cli,Ele_Tar,Precli_Tar, Desde_Tar,Hasta_Tar from dbo.clientes 
	    inner join dbo.tarifas on  Emp_Cli=Emp_Tar and TarLoc_Cli=Cod_Tar where Cod_Cli={$cliente} and Precli_Tar>' 0'  and Dep_Cli='' and Emp_Tar={$empresa}
	    and Ele_Tar
	    NOT IN(SELECT  Ele_Pre FROM dbo.precios  inner join dbo.clientes on Cod_Pre=Cod_Cli where  Emp_Pre={$empresa} and Cod_Pre={$cliente} and Dep_Pre=' '  and Dep_Cli=' ' and Precli_Pre>0 and Emp_Cli={$empresa})
	    union
	    Select Nom_Cli,Cod_Cli,EMail_Cli,Baja_Cli,Bloqueo_Cli, BloqueoNac_Cli,PorCarbu_Cli,TarNac_Cli,Ele_Tar,Precli_Tar, Desde_Tar,Hasta_Tar from dbo.clientes 
	    inner join dbo.tarifas on   Emp_Cli=Emp_Tar and TarNac_Cli=Cod_Tar where Cod_Cli={$cliente} and Precli_Tar>' 0'  and Dep_Cli='' and Emp_Tar={$empresa}		
	    and Ele_Tar
	    NOT IN(SELECT  Ele_Pre FROM dbo.precios  inner join dbo.clientes on Cod_Pre=Cod_Cli where  Emp_Pre={$empresa} and Cod_Pre={$cliente} and Dep_Pre=' '  and Dep_Cli=' ' and Precli_Pre>0 and Emp_Cli={$empresa})
	    union Select Nom_Cli,Cod_Cli,EMail_Cli,Baja_Cli,Bloqueo_Cli, BloqueoNac_Cli,PorCarbu_Cli,TarNac_Cli,Ele_Tar,Precli_Tar, Desde_Tar, Hasta_Tar from dbo.clientes 
	    inner join dbo.tarifas on   Emp_Cli=Emp_Tar and TarPrv_Cli=Cod_Tar where Cod_Cli={$cliente} and Precli_Tar>' 0'  and Dep_Cli='' and Emp_Tar={$empresa} 
	    and Ele_Tar
	    NOT IN(SELECT  Ele_Pre FROM dbo.precios  inner join dbo.clientes on Cod_Pre=Cod_Cli where  Emp_Pre={$empresa} and Cod_Pre={$cliente} and Dep_Pre=' '  and Dep_Cli=' ' and Precli_Pre>0 and Emp_Cli={$empresa})
	    union 
	    SELECT Nom_Cli,Cod_Cli, EMail_Cli,Baja_Cli,Bloqueo_Cli, BloqueoNac_Cli,PorCarbu_Cli,TarNac_Cli, Ele_Pre,Precli_Pre,Desde_Pre, Hasta_Pre FROM dbo.precios 
	    inner join dbo.clientes on Cod_Pre=Cod_Cli where  Emp_Pre={$empresa} and Cod_Pre={$cliente} and Dep_Pre=' '  and Dep_Cli=' ' and Precli_Pre>0 and Emp_Cli={$empresa}
	    order by Ele_Tar asc";

        return $this->createQuery($sql);
    }

    public function getTaifasBases($empresa, $cliente)
    {
        $sql =
            "SELECT Nom_Cli,Cod_Cli,EMail_Cli,Baja_Cli,Bloqueo_Cli, BloqueoNac_Cli,PorCarbu_Cli,TarNac_Cli,Ele_Tar,Precli_Tar, Desde_Tar,Hasta_Tar from dbo.clientes 
              inner join dbo.tarifas on  Emp_Cli=Emp_Tar and TarLoc_Cli=Cod_Tar where Cod_Cli={$cliente} and Precli_Tar>' 0'  and Dep_Cli='' and Emp_Tar={$empresa}
		    union Select Nom_Cli,Cod_Cli,EMail_Cli,Baja_Cli,Bloqueo_Cli, BloqueoNac_Cli,PorCarbu_Cli,TarNac_Cli,Ele_Tar,Precli_Tar, Desde_Tar,Hasta_Tar from dbo.clientes 
		      inner join dbo.tarifas on   Emp_Cli=Emp_Tar and TarNac_Cli=Cod_Tar where Cod_Cli={$cliente} and Precli_Tar>' 0'  and Dep_Cli='' and Emp_Tar={$empresa} 		
            union Select Nom_Cli,Cod_Cli,EMail_Cli,Baja_Cli,Bloqueo_Cli, BloqueoNac_Cli,PorCarbu_Cli,TarNac_Cli,Ele_Tar,Precli_Tar, Desde_Tar, Hasta_Tar from dbo.clientes 
		      inner join dbo.tarifas on   Emp_Cli=Emp_Tar and TarPrv_Cli=Cod_Tar where Cod_Cli={$cliente} and Precli_Tar>' 0'  and Dep_Cli='' and Emp_Tar={$empresa} 
		    order by Ele_Tar asc";

        return $this->createQuery($sql);
    }

    public function getTarifasEspeciales($empresa, $cliente)
    {
        $sql = "SELECT Nom_Cli,Cod_Cli,Baja_Cli,EMail_Cli,Bloqueo_Cli, BloqueoNac_Cli, PorCarbu_Cli, Ele_Pre,TarNac_Cli,Precli_Pre,Desde_Pre, Hasta_Pre FROM dbo.precios 
                  inner join dbo.clientes on Cod_Pre=Cod_Cli 
		        where  Emp_Pre={$empresa} and Cod_Pre={$cliente} and Dep_Pre=' '  and Dep_Cli=' ' and Precli_Pre>0 and Emp_Cli={$empresa} order by Ele_Pre asc";

        return $this->createQuery($sql);
    }

    public function isValidCLient($empresa, $cliente)
    {
        $sql = "SELECT Nom_Cli,Emp_Cli FROM dbo.clientes where Cod_Cli={$cliente} and Emp_Cli={$empresa}";

        return $this->createQuery($sql);
    }

    public function getClientRange($empresa, $from, $to, $filters)
    {
        /*$filterActives = in_array('inactivos', $filters) ? 1 : 0;
        $filterBloq = in_array('bloqueados', $filters) ? 1 : 0;*/
        //and EMail_Cli != ''
        $sql = "SELECT Cod_Cli, Nom_Cli, EMail_Cli, Baja_Cli, BloqueoNac_Cli, Bloqueo_Cli  from dbo.clientes where Emp_Cli = {$empresa}
                and Dep_Cli = '' and Cod_Cli >= {$from}  and Cod_Cli <= {$to}";

        return $this->createQuery($sql);
    }

}

?>