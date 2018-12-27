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
    $name    = "report.pdf";
    //Decode pdf content
    $pdf_decoded = base64_decode ($_POST['pdf_data']);
    // you record the file in existing folder
    if(file_put_contents($name, $pdf_decoded)){
        $pruebacorreo = new email();
        $pruebacorreo->sendMail("jrborges@humandatamanager.com", "Saludos le adjuntamos su doc", $name);
    }

}

?>