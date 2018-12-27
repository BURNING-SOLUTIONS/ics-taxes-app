<?php
include('conexion.php');
include('reportes/serviciosLocales.php');
include('utils/cryptojs-aes.php');
include('utils/email.php');
include('controllers/clienGetRatesController.php');
include('controllers/processClientsRangeController.php');

# conexion sql a base de datos primer paso....
$today = new DateTime(); # today date
$sqlConection = new sqlServerConecction("hddevp.no-ip.org", "dl" . $today->format('Y'), "SA", "HDM*2018");


#simulando enrutado desde la vista se debe mandar la ruta correspondiente para redireccionar al controlador especifico
switch ($_POST['route']) {
    case "get-client-rates":
        clientGetRatesController($sqlConection);
        break;
    case "process-clients-range":
        processClientsRangeController($sqlConection);
        break;
}

?>