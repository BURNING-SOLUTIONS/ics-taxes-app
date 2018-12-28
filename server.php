<?php
include('conexion.php');
include('reportes/serviciosLocales.php');
include('utils/cryptojs-aes.php');
include('utils/email.php');
include('controllers/clienGetRatesController.php');
include('controllers/processClientsRangeController.php');

# conexion sql a base de datos primer paso....
$today = new DateTime(); # today date
$PROYECT_CONFIG = parse_ini_file('config/config.ini');
$sqlConection = new sqlServerConecction(
    "$PROYECT_CONFIG[database_host]",
    "dl" . $today->format('Y'),
    "$PROYECT_CONFIG[database_user]",
    "$PROYECT_CONFIG[database_password]"
);

#simulando enrutado desde la vista se debe mandar la ruta correspondiente para redireccionar al controlador especifico
switch ($_POST['route']) {
    case "get-client-rates":
        clientGetRatesController($sqlConection);
        break;
    case "process-clients-range":
        processClientsRangeController($sqlConection);
        break;
    case "send-client-email":
        sendClientEamil($sqlConection);
        break;
}

function sendClientEamil($sqlConection)
{
    $jsondata = array(
        "status" => array('ok' => true, 'message' => 'Email Enviado Satisfactoriamente.'),
        "results" => array()
    );
    $name = "report.pdf";
    //Decode pdf content
    $pdf_decoded = base64_decode($_POST['pdf_data']);
    // you record the file in existing folder
    try {
        # enviando email al cliente...
        try {
            if (file_put_contents($name, $pdf_decoded)) {
                //echo $_POST['address'];exit();
                $pruebacorreo = new email();
                $pruebacorreo->sendMail($_POST['address']/*"jrborges@humandatamanager.com"*/, $_POST['subject'], $_POST['message_body'], $name);
            }
        } catch (Exception $e) {
            $jsondata = array(
                "status" => array('ok' => false, 'message' => 'Ha ocurrido un error durante la generación del reporte y su envío por correo.'),
                "results" => array()
            );
            echo json_encode($jsondata, JSON_FORCE_OBJECT);
            exit();
        }

        echo json_encode($jsondata, JSON_FORCE_OBJECT);
        exit();
    } catch (Exception $e) {
        $jsondata['status'] = array('ok' => false, 'message' => $e->getMessage());
        echo json_encode($jsondata);
        exit();
    }


}

?>