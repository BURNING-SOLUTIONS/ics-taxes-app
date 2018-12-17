
<?php
include('conexion.php');
include('reportes/serviciosLocales.php');
include('security/security.php');

//$ics_security = new IcsSecurity();
//echo(var_dump(IcsSecurity::getIcsPermisos())); exit();

/*function formattedTarifasSqlResponseBeatuyArray($sqlresponse){
	$arrayBeauty = array();
	while($row = sqlsrv_fetch_array( $sqlresponse, SQLSRV_FETCH_ASSOC ) ){		
		array_push($arrayBeauty, array( 'nombre'=>$row['Nom_Cli'],
										'elemento'=>$row['Ele_Tar'], 
							  			'precio'=>$row['Precli_Tar'], 
							  			'desde'=> $row['Desde_Tar'], 
							  			'hasta'=> $row['Hasta_Tar'],
							  			'tarifa'=>$row['TarNac_Cli']
									));	
	};
	return $arrayBeauty;
}*/
/*function formattedEspecialesSqlResponseBeatuyArray($sqlresponse){
	$arrayBeauty = array();
	while($row = sqlsrv_fetch_array( $sqlresponse, SQLSRV_FETCH_ASSOC ) ){		
		array_push($arrayBeauty, array('elemento'=>$row['Ele_Pre'], 'precio'=>$row['Precli_Pre'], 'desde'=> $row['Desde_Pre'], 'hasta'=> $row['Hasta_Pre']));	
	}
	return $arrayBeauty;
}*/
//$beautyTarifasBase = array();
$actual_link = (isset($_SERVER['HTTPS']) 
	&& $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";


//echo($actual_link);exit;

$today = new DateTime();
$jsondata = array('status'=>array('ok'=> true, 'message'=> 'Resultados esperados.'), 'results'=>array());

if($_POST['id_cliente']) {
	$jsondata['success'] = true;   
	try {
		//establenciendo nueva instancia de la clase coneccion to sql server..
		$sqlConection = new sqlServerConecction("hddevp.no-ip.org", "dl".$today->format('Y'), "SA", "HDM*2018");
		// establenciendo la conexion realmente..
		$conn =  $sqlConection->conectToSqlServerDatabase();

	} catch (Exception $e) {
		$jsondata['status'] = array('ok'=>false, 'message'=>$e->getMessage());
		echo json_encode($jsondata);
		exit(); 
	}
   
    //consulta numero 1..
	$getPreciosPorTarifas = $sqlConection->createQuery($conn, "SELECT Nom_Cli,Cod_Cli,TarNac_Cli,Ele_Tar,Precli_Tar, Desde_Tar,Hasta_Tar from dbo.clientes inner join dbo.tarifas on  Emp_Cli=Emp_Tar and TarLoc_Cli=Cod_Tar where Cod_Cli={$_POST['id_cliente']} and Precli_Tar>' 0'  and Dep_Cli='' and Emp_Tar={$_POST['id_empresa']}
		union Select Nom_Cli, Cod_Cli,TarNac_Cli,Ele_Tar,Precli_Tar ,  Desde_Tar, Hasta_Tar from dbo.clientes inner join dbo.tarifas on   Emp_Cli=Emp_Tar and TarNac_Cli=Cod_Tar where Cod_Cli={$_POST['id_cliente']} and Precli_Tar>' 0'  and Dep_Cli='' and Emp_Tar={$_POST['id_empresa']} 		
		union Select Nom_Cli,Cod_Cli, TarNac_Cli,Ele_Tar,Precli_Tar, Desde_Tar, Hasta_Tar from dbo.clientes inner join dbo.tarifas on   Emp_Cli=Emp_Tar and TarPrv_Cli=Cod_Tar where Cod_Cli={$_POST['id_cliente']} and Precli_Tar>' 0'  and Dep_Cli='' and Emp_Tar={$_POST['id_empresa']} order by Ele_Tar asc");
	//consulta numero 2..
	$getPreciosEspeciales = sqlsrv_query($conn,"SELECT Nom_Cli,Cod_Cli,Ele_Pre,TarNac_Cli,Precli_Pre,Desde_Pre, Hasta_Pre FROM dbo.precios inner join dbo.clientes on Cod_Pre=Cod_Cli 
		where  Emp_Pre={$_POST['id_empresa']} and Cod_Pre={$_POST['id_cliente']} and Dep_Pre=' '  and Dep_Cli=' ' and Precli_Pre>0 and Emp_Cli={$_POST['id_empresa']} order by Ele_Pre asc");
	
	//PRIMERAMENTE PARTIMOS DE LA PREMISA QUE LA RESPUESTA SON TODA LAS TARIFAS ESPECIALES..	
	$elementos_id_aux = array();
	
	while($especial = sqlsrv_fetch_array($getPreciosEspeciales, SQLSRV_FETCH_ASSOC ) ){
		$especial_data = array(
							'nombre'=>$especial['Nom_Cli'], 
							'elemento'=>$especial['Ele_Pre'],
							'tarifa'=>$especial['TarNac_Cli'], 
							'precio'=>$especial['Precli_Pre'], 
							'desde'=> $especial['Desde_Pre'], 
							'hasta'=> $especial['Hasta_Pre']);

		array_push($jsondata['results'], $especial_data);

		if(!in_array($especial['Ele_Pre'], $elementos_id_aux)){
			array_push($elementos_id_aux, $especial['Ele_Pre']);//TODO LOS ELEMENTOS QUE AL MENOS TIENEN UN PRECIO ESPECIAL
		}
	}
	//ENTONCES RECORREMOS LA TARIFA BASE SI NO SE ENCUENTRA UN ELEMENTO EN LAS ESPECIALES ENTONCES LAS COGEMOS
	while($tarifaBase = sqlsrv_fetch_array($getPreciosPorTarifas, SQLSRV_FETCH_ASSOC ) ){
		$precioBase_data = array(
							'nombre'=>$tarifaBase['Nom_Cli'], 
							'elemento'=>$tarifaBase['Ele_Tar'],
							'tarifa'=>$tarifaBase['TarNac_Cli'], 
							'precio'=>$tarifaBase['Precli_Tar'], 
							'desde'=> $tarifaBase['Desde_Tar'], 
							'hasta'=> $tarifaBase['Hasta_Tar']);

		if(!in_array($tarifaBase['Ele_Tar'], $elementos_id_aux)){			
			array_push($jsondata['results'], $precioBase_data);
		}
	}//FIN DEL BUCLE MASTER
	if(count($jsondata['results']) == 0){
		$jsondata['status'] = array(
			'ok'=> false, 
			'message'=> 'Verifique que el cliente insertado es correcto o que pertenezca a la empresa indicada, No se han arrojado resultados!.');
	}
}else{
	$jsondata['status'] = array('ok'=> false, 'message'=> 'No se ha recibido ningun numero de cliente');
}
echo json_encode($jsondata, JSON_FORCE_OBJECT);
exit();

/*if(count($jsondata['results']) == 0){
	$jsondata['status'] = array('ok'=> false, 'message'=> 'Verifique que el cliente insertado es correcto o que pertenezca a la empresa indicada, No se han arrojado resultados!!!!.');
}*/


	//RECORREMOS ANIDADAMENTE LOS CICLOS DE TARIFA BASE Y TARIFAS ESPECIALES..
	/*while($especial = sqlsrv_fetch_array($getPreciosEspeciales, SQLSRV_FETCH_ASSOC ) ){	
		$find  = false;		
		for ($i=0; $i < $totalBase; $i++) { 
			//SI EXISTE UNA TARIFA BASE DONDE COINCIDE EL ELEMENTO Y EL RANGO CON UNA TAROFA ESPECILA EL RESULTADO QUE 
			//PREDOMINA ES LA TARIFA ES LA TARIFA ESPECIAL.
			if($especial['Ele_Pre'] == $beautyTarifasBase[$i]['elemento']){
				if($especial['Desde_Pre'] == $beautyTarifasBase[$i]['desde'] && ($especial['Hasta_Pre'] == $beautyTarifasBase[$i]['hasta'])
					|| (in_array($especial['Hasta_Pre'], ["999","9999","99999","999999","9999999","99999999"]))
					&& (in_array($beautyTarifasBase[$i]['hasta'], ["999","9999","99999","999999","9999999","99999999"])) ){
					
					$find = true;//variable se pone en true pk a encontrado coincidencia percio elem en fijos y especiales
					//SUSTITUIMOS LA TAIFA BASE POR LA ESPECIAL
					$beautyTarifasBase[$i] = array('nombre'=>$especial['Nom_Cli'],
						  					'elemento'=>$especial['Ele_Pre'],
						  					'tarifa'=>$beautyTarifasBase[$i]['tarifa'], 
						  					'precio'=>$especial['Precli_Pre'], 
						  					'desde'=> $especial['Desde_Pre'], 
						  					'hasta'=> $especial['Hasta_Pre']);					
				
					break;
				}
				//arreglar este metodo es la caca, se insertan tarifas bases que luego pueden aparecer en especiales.
			}

		}//FIN SEGUNDO BUCLE
		//Si nunca encontro el id del elemento de ese precio especial entonces hay que adicionarlo a la respuesta..
		//OPERACION A REALIZAR ANTES DE PASAR A LA 2DA ITERACCION DLE BUCLE MAESTRO 
		if(!$find) {		
			array_push($beautyTarifasBase, array('nombre'=>$especial['Nom_Cli'], 
										'elemento'=>$especial['Ele_Pre'],
										'tarifa'=>'', 
										'precio'=>$especial['Precli_Pre'], 
										'desde'=> $especial['Desde_Pre'], 
										'hasta'=> $especial['Hasta_Pre']));
		}
	}//FIN PRIMER BUCLE, EL MASTER*/

//echo (print_r($beautyTarifasBase));exit();
	//$jsondata['results'] = $beautyTarifasBase;
?>