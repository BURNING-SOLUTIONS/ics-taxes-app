<?php
include('conexion.php');
include('reportes/serviciosLocales.php');
#include('security/security.php');
include('utils/cryptojs-aes.php');
include('utils/email.php');

# conexion sql a base de datos primer paso....
$today = new DateTime(); # today date
$sqlConection = new sqlServerConecction("hddevp.no-ip.org", "dl" . $today->format('Y'), "SA", "HDM*2018");

switch ($_POST['route']) {
    case "get-client-rates":
        clientGetRatesController($sqlConection);
        break;
    case "process-clients-range":
        processClientsRangeController($sqlConection);
        break;
}

function processClientsRangeController($sqlConection){
    $jsondata = array(
        "status" => array('ok' => true, 'message' => 'mensajes enviados Satisfactoriamente !!!'),
        "results" => array()
    );
    $emailsClienSend = array();
    $pruebacorreo = new email();
    $PROYECT_CONFIG = parse_ini_file('config/config.ini');
    $bussines = $_POST['id_empresa'];
    $from = $_POST['range']['from'];
    $to = $_POST['range']['to'];
    $clientRangeInformation = $sqlConection->getClientRange($bussines, $from, $to, isset($_POST['filters']) ? $_POST['filters'] : array());
    while ($cliente = sqlsrv_fetch_array($clientRangeInformation, SQLSRV_FETCH_ASSOC)) {
        $path = cryptoJsAesEncrypt("ics_taxes_myapp", array('bussiness' => $bussines, 'cliente' => $cliente));
        $url = "$PROYECT_CONFIG[server_host]$PROYECT_CONFIG[project_raise]$PROYECT_CONFIG[anonymous_user_path]" . "?external_source=" . base64_encode($path);
        if ($cliente['EMail_Cli']) {
            $filters = isset($_POST['filters']) ? $_POST['filters'] : array();
            $filterActives = in_array('inactivos', $filters) ? 1 : 0;
            $filterBloq = in_array('bloqueados', $filters) ? 1 : 0;
            if($cliente['Baja_Cli'] == 0 && $cliente['BloqueoNac_Cli'] == 0 && $cliente['Bloqueo_Cli'] == 0){
                $emailsClienSend[] = $cliente;
                //echo print_r($cliente);# send emaiil
                /*# $pruebacorreo->sendMail($cliente['EMail_Cli'], $url);*/
                //$pruebacorreo->sendMail("gemamontes@ics.es", $url);
            }
            if($filterActives){
                if($cliente['Baja_Cli'] == 1){
                    $emailsClienSend[] = $cliente;
                    //echo print_r($cliente);# send emaiil
                    /*# $pruebacorreo->sendMail($cliente['EMail_Cli'], $url);*/
                    //$pruebacorreo->sendMail("gemamontes@ics.es", $url);
                }
            }if($filterBloq){
                if($cliente['BloqueoNac_Cli'] == 1  || $cliente['Bloqueo_Cli'] == 1){
                    $emailsClienSend[] = $cliente;
                    //echo print_r($cliente);# send emaiil
                    /*# $pruebacorreo->sendMail($cliente['EMail_Cli'], $url);*/
                    //$pruebacorreo->sendMail("gemamontes@ics.es", $url);
                }
            }
        }
    }
    if (count($emailsClienSend) > 0) {
        //echo (print_r($emailsClienSend));
        $jsondata['results'] = $emailsClienSend;
        echo json_encode(array('status' => array('ok' => true, 'message' => 'Resultados esperados.'), 'results' => array()), JSON_FORCE_OBJECT);
    }
    exit();
    
}


function clientGetRatesController($sqlConection)
{
    $jsondata = array('status' => array('ok' => true, 'message' => 'Resultados esperados.'), 'results' => array());
    $isBase64 = isset($_POST['base64']);
    if (isset($_POST['id_cliente']) || $isBase64) {
        $jsondata['success'] = true;
        $decrypt = $isBase64 ? cryptoJsAesDecrypt("ics_taxes_myapp", base64_decode($_POST['base64'])) : null;
        $request_client = $isBase64 ? $decrypt['cliente']['Cod_Cli'] : $_POST['id_cliente'];
        $request_empresa = $isBase64 ? $decrypt['bussiness'] : $_POST['id_empresa'];
        # consulta numero 1..
        $clientExist = $sqlConection->isValidCLient($request_empresa, $request_client);

        if (count(sqlsrv_fetch_array($clientExist, SQLSRV_FETCH_ASSOC)) < 2) {
            $jsondata['status'] = array('ok' => false, 'message' => 'EL cliente introducido no existe , por favor Verifique!!!.');
            echo json_encode($jsondata);
            exit();
        } else {
            # consulta numero 2 obteniendo las tarifas bases..
            $getTaifasBases = $sqlConection->getTaifasBases($request_empresa, $request_client);
            # consulta numero 3 obteniendo las tarifas especiales..
            $getPreciosEspeciales = $sqlConection->getTarifasEspeciales($request_empresa, $request_client);

            # PRIMERAMENTE PARTIMOS DE LA PREMISA QUE LA RESPUESTA SON TODA LAS TARIFAS ESPECIALES..
            $elementos_id_aux = array();

            while ($especial = sqlsrv_fetch_array($getPreciosEspeciales, SQLSRV_FETCH_ASSOC)) {
                $especial_data = array(
                    'nombre' => $especial['Nom_Cli'],
                    'elemento' => $especial['Ele_Pre'],
                    'email' => $especial['EMail_Cli'],
                    'baja' => $especial['Baja_Cli'],
                    'BloqueoTrafico' => $especial['Bloqueo_Cli'],
                    'BloqueoNacional' => $especial['BloqueoNac_Cli'],
                    'tarifa' => $especial['TarNac_Cli'],
                    'precio' => $especial['Precli_Pre'],
                    'desde' => $especial['Desde_Pre'],
                    'hasta' => $especial['Hasta_Pre']);

                array_push($jsondata['results'], $especial_data);

                if (!in_array($especial['Ele_Pre'], $elementos_id_aux)) {
                    array_push($elementos_id_aux, $especial['Ele_Pre']);//TODO LOS ELEMENTOS QUE AL MENOS TIENEN UN PRECIO ESPECIAL
                }
            }
            $bases = array();
            //ENTONCES RECORREMOS LA TARIFA BASE SI NO SE ENCUENTRA UN ELEMENTO EN LAS ESPECIALES ENTONCES LAS COGEMOS
            while ($tarifaBase = sqlsrv_fetch_array($getTaifasBases, SQLSRV_FETCH_ASSOC)) {
                $precioBase_data = array(
                    'nombre' => $tarifaBase['Nom_Cli'],
                    'elemento' => $tarifaBase['Ele_Tar'],
                    'email' => $tarifaBase['EMail_Cli'],
                    'baja' => $tarifaBase['Baja_Cli'],
                    'BloqueoTrafico' => $tarifaBase['Bloqueo_Cli'],
                    'BloqueoNacional' => $tarifaBase['BloqueoNac_Cli'],
                    'tarifa' => $tarifaBase['TarNac_Cli'],
                    'precio' => $tarifaBase['Precli_Tar'],
                    'desde' => $tarifaBase['Desde_Tar'],
                    'hasta' => $tarifaBase['Hasta_Tar']);

                /*if($tarifaBase['Ele_Tar'] == "1800" ){
                    echo print_r($tarifaBase);exit;
                }*/

                if (!in_array($tarifaBase['Ele_Tar'], $elementos_id_aux)) {
                    array_push($jsondata['results'], $precioBase_data);
                    $bases[] = $precioBase_data;
                }
            }
            //echo(print_r($bases));exit();
            if (count($jsondata['results']) == 0) {
                $jsondata['status'] = array('ok' => false, 'message' => 'El cliente insertado no tiene  precios definidos en sus tarifas, Verifiquelo !!!.');
            }
        }
    } else {
        $jsondata['status'] = array('ok' => false, 'message' => 'No se ha recibido ningun numero de cliente');
    }
    //echo (count($jsondata['results']));exit;
    echo json_encode($jsondata, JSON_FORCE_OBJECT);
    exit();
}


?>