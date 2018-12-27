<?php
/**
 * Created by INg. Juan Ramon.
 * User: user
 * Date: 12/27/2018
 * Time: 10:44 a.m.
 */

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
                $pruebacorreo->sendMail("jrborges@humandatamanager.com", $url);
            }
            if($filterActives){
                if($cliente['Baja_Cli'] == 1){
                    $emailsClienSend[] = $cliente;
                    //echo print_r($cliente);# send emaiil
                    /*# $pruebacorreo->sendMail($cliente['EMail_Cli'], $url);*/
                    $pruebacorreo->sendMail("jrborges@humandatamanager.com", $url);
                }
            }if($filterBloq){
                if($cliente['BloqueoNac_Cli'] == 1  || $cliente['Bloqueo_Cli'] == 1){
                    $emailsClienSend[] = $cliente;
                    //echo print_r($cliente);# send emaiil
                    /*# $pruebacorreo->sendMail($cliente['EMail_Cli'], $url);*/
                    $pruebacorreo->sendMail("jrborges@humandatamanager.com", $url);
                }
            }
        }
    }
    if (count($emailsClienSend) > 0) {
        $jsondata['results'] = $emailsClienSend;
        echo json_encode(array('status' => array('ok' => true, 'message' => 'Resultados esperados.'), 'results' => array()), JSON_FORCE_OBJECT);
    }
    exit();

}