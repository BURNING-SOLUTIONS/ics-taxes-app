<?php
/**
 * Created by INg. Juan Ramon.
 * User: user
 * Date: 12/27/2018
 * Time: 10:44 a.m.
 */

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
                $pruebacorreo->sendMail(
                    $_POST['address']/*"jrborges@humandatamanager.com"*/, 
                    $_POST['subject'], 
                    $_POST['message_body'], 
                    $name);
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