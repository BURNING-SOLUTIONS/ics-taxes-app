<?php	
	ob_start(); 	
 	include('../conexion.php');

 	$PROYECT_CONFIG = parse_ini_file('../config/config.ini');
	$today = new DateTime(); # today date

	try{
		$sqlConection = new sqlServerConecction(
			"$PROYECT_CONFIG[database_host]".", "."$PROYECT_CONFIG[database_port]",
			"dl" . $today->format('Y') /* dl2018 */,
			"$PROYECT_CONFIG[database_user]",
			"$PROYECT_CONFIG[database_password]"
		);
	}catch(Exception $ex){
		echo $ex->getMessage();
		exit();
	}

    # consulta numero 1..
	$getusuarios = $sqlConection->createQuery("SELECT Nom_Usu,Password_Usu FROM dbo.usuarios 
		where Nom_Usu='{$_POST['user']}' and Password_Usu={$_POST['pass']}");	
	
	if(count(sqlsrv_fetch_array( $getusuarios, SQLSRV_FETCH_ASSOC ))>= 2){    
     	# redirigirlos para la pagina de los reportes 
     	session_start();  
		$_SESSION["autenticado"] = strtolower($_POST['user']); # se guarda en autenticado el usuario conectado
		header("location: ../inicio.html");
		exit;	
	}
	else {
		header("location: ../index.html");
		exit;
	}
