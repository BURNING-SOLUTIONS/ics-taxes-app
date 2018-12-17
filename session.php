<?php
	session_start();	
	//Inicio la sesión
	//COMPRUEBA QUE EL USUARIO ESTA AUTENTICADO		
	if (!$_SESSION || ($_SESSION["autenticado"] && $_SESSION["autenticado"]!="SI") ) {
	//si no existe, va a la página de autenticacion
		$jsondata = array("status"=> 401, "message"=> "Authentication error");
		echo json_encode($jsondata, JSON_FORCE_OBJECT);
		exit();
	}else{
		$jsondata = array("status"=> 200, "message"=> "Authentication ok");
		echo json_encode($jsondata, JSON_FORCE_OBJECT);
		exit();
	}
?>

