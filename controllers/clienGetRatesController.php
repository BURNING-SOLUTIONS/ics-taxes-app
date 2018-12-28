<?php

/**
 * Created by INg. Juan Ramon.
 * User: user
 * Date: 12/27/2018
 * Time: 10:44 a.m.
 */

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

        if (count(sqlsrv_fetch_array($clientExist, SQLSRV_FETCH_ASSOC)) < 1) {
            $jsondata['status'] = array('ok' => false, 'message' => 'EL cliente introducido no existe , por favor Verifique!!!.');
        }
        else {
            # consulta 1 para obtener los datos de de cliente..
            $clientData = $sqlConection->getClientData($request_empresa, $request_client);

            while ($especial = sqlsrv_fetch_array($clientData, SQLSRV_FETCH_ASSOC)) {
                $especial_data = array(
                    'nombre' => utf8_encode($especial['Nom_Cli']),
                    'elemento' => $especial['Ele_Tar'],
                    'email' => $especial['EMail_Cli'],
                    'baja' => $especial['Baja_Cli'],
                    'BloqueoTrafico' => $especial['Bloqueo_Cli'],
                    'BloqueoNacional' => $especial['BloqueoNac_Cli'],
                    'tarifa' => $especial['TarNac_Cli'],
                    'precio' => $especial['Precli_Tar'],
                    'desde' => $especial['Desde_Tar'],
                    'hasta' => $especial['Hasta_Tar']);

                array_push($jsondata['results'], $especial_data);
            }
            if (count($jsondata['results']) == 0) {
                $jsondata['status'] = array('ok' => false, 'message' => 'El cliente insertado no tiene  precios definidos en sus tarifas, Verifiquelo !!!.');
            }
        }
    } else {
        $jsondata['status'] = array('ok' => false, 'message' => 'No se ha recibido ningun numero de cliente');
    }
    //echo (print_r($jsondata['results']));exit;
    echo json_encode($jsondata, JSON_FORCE_OBJECT);
    exit();
}
