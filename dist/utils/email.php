<?php
//incluimos la clase PHPMailer
include("PHPMailer-master/src/PHPMailer.php");
include("PHPMailer-master/src/SMTP.php");
include("PHPMailer-master/src/Exception.php");

class email
{

    function __construct()
    {

    }

    public function sendMail($address, $subject, $body, $attachment = false)
    {
        $PROYECT_CONFIG = parse_ini_file('config/config.ini');


        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->IsHTML(true);
        $mail->AddEmbeddedImage("utils/instapackLogo.png", "instapackLogo");
        //cargar archivo css para cuerpo de mensaje
        $rcss = "utils/style_email_template.css";//ruta de archivo css
        $fcss = fopen ($rcss, "r");//abrir archivo css
        $scss = fread ($fcss, filesize ($rcss));//leer contenido de css
        fclose ($fcss);//cerrar archivo css

        $cuerpo = file_get_contents('email_template.html', FILE_USE_INCLUDE_PATH);
        $cuerpo = str_replace('%url_link%', $body, $cuerpo);
        //reemplazar sección de plantilla html con el css cargado y mensaje creado
        $cuerpo  = str_replace('<style id="style_email_template"></style>',"<style>$scss</style>",$cuerpo);
        $mail->IsSMTP(); // enable SMTP
        $mail->SMTPDebug = false;
        $mail->do_debug = 0;
        //$mail->SMTPDebug = 2; // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = true; // authentication enabled
        $mail->SMTPSecure = "ssl"; // secure transfer enabled REQUIRED for Gmail
        $mail->Username = "$PROYECT_CONFIG[email_username]";
        $mail->Password = "$PROYECT_CONFIG[email_password]";
        $mail->Host = "$PROYECT_CONFIG[email_host]";
        $mail->Port = "$PROYECT_CONFIG[email_port]"; // or 587

        $mail->setFrom("$PROYECT_CONFIG[email_sender]");
        $mail->AddAddress($address);
        $mail->Subject = $subject;//este es el asunto

        $mail->MsgHTML($cuerpo);
        //$mail->Body = ($cuerpo/*$cuerpourl*/);
        $mail->IsHTML(true);
        $mail->CharSet = "utf-8";

        if ($attachment) {
            $mail->addAttachment($attachment);
        }
        try {
            $mail->Send();
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    //This function is used for send personal emails to client.. basically not use email_template like up function
    public function sendPersonalEamil($address, $subject, $body, $attachment = false)
    {

        $PROYECT_CONFIG = parse_ini_file('config/config.ini');


        $mail = new PHPMailer\PHPMailer\PHPMailer();

        $mail->IsSMTP(); // enable SMTP
        $mail->SMTPDebug = false;
        $mail->do_debug = 0;
        //$mail->SMTPDebug = 2; // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = true; // authentication enabled
        $mail->SMTPSecure = "ssl"; // secure transfer enabled REQUIRED for Gmail
        $mail->Username = "$PROYECT_CONFIG[email_username]";
        $mail->Password = "$PROYECT_CONFIG[email_password]";
        $mail->Host = "$PROYECT_CONFIG[email_host]";
        $mail->Port = "$PROYECT_CONFIG[email_port]"; // or 587

        $mail->setFrom("$PROYECT_CONFIG[email_sender]");
        $mail->AddAddress($address);
        $mail->Subject = $subject;//este es el asunto
        $mail->Body = ($body/*$cuerpourl*/);
        //$mail->IsHTML(true);
        //$mail->CharSet="utf-8";
        if ($attachment) {
            $mail->addAttachment($attachment);
        }
        try {
            $mail->Send();
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

    }

}

?>