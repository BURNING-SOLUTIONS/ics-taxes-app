<?php
include('conexion.php');
include('reportes/serviciosLocales.php');
include('utils/cryptojs-aes.php');
include('utils/email.php');
include('utils/log_generator.php');
include('controllers/clienGetRatesController.php');
include('controllers/processClientsRangeController.php');
include('controllers/sendEmailController.php');

# conexion sql a base de datos primer paso....
$today = new DateTime(); # today date
$PROYECT_CONFIG = parse_ini_file('config/config.ini');
$sqlConection = new sqlServerConecction(
    "$PROYECT_CONFIG[database_host]".", "."$PROYECT_CONFIG[database_port]",
    "dl" . $today->format('Y') /* dl2018 */,
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

?>