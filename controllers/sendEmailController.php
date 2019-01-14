<?php
/**
 * Created by INg. Juan Ramon.
 * User: user
 * Date: 12/27/2018
 * Time: 10:44 a.m.
 */

function sendClientEamil($sqlConection)
{
    $jsondata = array("status" => array('ok' => true, 'message' => 'Email enviado satisfactoriamente.'), "results" => array());
    $name = "report.pdf";
    //Decode pdf content
    $pdf_decoded = base64_decode($_POST['pdf_data']);
    // you record the file in existing folder

    # enviando email al cliente...
    try {
        if (file_put_contents($name, $pdf_decoded)) {
            $pruebacorreo = new email();
            
            $pruebacorreo->sendPersonalEamil(
                $_POST['address'],
                #"jrborges@humandatamanager.com",
                $_POST['subject'],
                $_POST['message_body'],
                $name);
            if (file_exists($name)) {
                unlink($name);
            }
        }
    } catch (Exception $e) {
        $jsondata = array(
            "status" => array('ok' => false, 'error' => 'Ha ocurrido un error durante la generación del reporte y su envío por correo electrónico.'),
            "results" => array()
        );
        echo json_encode($jsondata, JSON_FORCE_OBJECT);
        exit();
    }

    echo json_encode($jsondata, JSON_FORCE_OBJECT);
    exit();



}