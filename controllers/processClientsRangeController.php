<?php
#include('../utils/log_generator.php');
/**
 * Created by INg. Juan Ramon.
 * User: user
 * Date: 12/27/2018
 * Time: 10:44 a.m.
 */

function processClientsRangeController($sqlConection){
    $logGenerator = new LogGenerator();
    $jsondata = array(
        "status" => array('ok' => true, 'message' => 'mensajes enviados Satisfactoriamente !!!'),
        "results" => array()
    );
    $emailsClienSend = array();
    $emailsErrorClienSend = 0;
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
            //actualmente la funcion de enviar correos de tarifas a un rango de clientes me lo envia a mi correo posteriormente debo
            //descomentarear todo este codigo y sustituir por mie mail el email del cliente
            try{
                if(($cliente['Baja_Cli'] == 0 && $cliente['BloqueoNac_Cli'] == 0 && $cliente['Bloqueo_Cli'] == 0)){
                    array_push($emailsClienSend, $cliente);
                    # $pruebacorreo->sendMail($cliente['EMail_Cli'], $url);
                    $pruebacorreo->sendMail("jrborges@humandatamanager.com", "$PROYECT_CONFIG[massive_email_subject]", "$PROYECT_CONFIG[massive_email_body] $url");
                }
                if($filterActives){
                    if($cliente['Baja_Cli'] == 1){
                        array_push($emailsClienSend, $cliente);
                        # $pruebacorreo->sendMail($cliente['EMail_Cli'], $url);
                        $pruebacorreo->sendMail("jrborges@humandatamanager.com", "$PROYECT_CONFIG[massive_email_subject]", "$PROYECT_CONFIG[massive_email_body] $url");
                        continue;
                    }
                }
                if($filterBloq){
                    if($cliente['BloqueoNac_Cli'] == 1 || $cliente['Bloqueo_Cli']){
                        array_push($emailsClienSend, $cliente);
                        # $pruebacorreo->sendMail($cliente['EMail_Cli'], $url);
                        $pruebacorreo->sendMail("jrborges@humandatamanager.com", "$PROYECT_CONFIG[massive_email_subject]", "$PROYECT_CONFIG[massive_email_body] $url");
                        continue;
                    }
                }
            }catch (Exception $e){
                //Si fall un envio de correo se cuenta un correo mas sin enviar y se genera el error en el log...
                $logGenerator->createLog(date('d-M-Y H:i:s')."-No se ha enviado email al cliente: ". $cliente['Cod_Cli'].'-'.$cliente['Nom_Cli'].$e->getMessage().'(error del servidor inténtelo mas tarde)'. "\n");
                continue;
            }
        //Si el cliente no tiene email se cuenta un correo mas sin enviar y se genera el log correspondiente...
        }else{
            $logGenerator->createLog(date('d-M-Y H:i:s')."-Imposible enviar email al cliente: ". $cliente['Cod_Cli'].'-'.$cliente['Nom_Cli'].'(no tiene correo elect. registrado)'. "\n");
        }
    }
    $jsondata['results'] = "Se han enviado correctamente ".count($emailsClienSend)." mensajes";
    $jsondata['errors'] = "Revise los arhivos de logs del sistema para verificar los clientes que han fallado";//"No ha sido posible enviar correctamente $emailsErrorClienSend mensajes";
    //echo(print_r($jsondata));exit();
    echo json_encode($jsondata, JSON_FORCE_OBJECT);
    exit();

}