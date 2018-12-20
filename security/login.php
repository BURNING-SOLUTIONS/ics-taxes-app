<?php	
	ob_start(); 	
 	include('../conexion.php');
	try{
		$sqlConection = new sqlServerConecction("hddevp.no-ip.org", "dl2018", "SA", "HDM*2018");
		# establenciendo la conexion realmente..
		$conn =  $sqlConection->conectToSqlServerDatabase();
	} catch (Exception $e) {
		echo $e->getMessage();
		exit(); 
	}
    # consulta numero 1..
	$getusuarios = $sqlConection->createQuery($conn, "SELECT Nom_Usu,Password_Usu FROM dbo.usuarios 
		where Nom_Usu='{$_POST['user']}' and Password_Usu={$_POST['pass']} ");	

	if(count(sqlsrv_fetch_array( $getusuarios, SQLSRV_FETCH_ASSOC ))>= 2){    
     	# redirigirlos para la pagina de los reportes 
     	session_start();  
		$_SESSION["autenticado"] = strtolower($_POST['gema']); # se guarda en autenticado el usuario conectado
		
		header("location: ../inicio.html");
		exit;	
	}
	else {
		header("location: ../index.html");
		exit;
	}
	
?>













