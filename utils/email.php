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

        $mail = new PHPMailer\PHPMailer\PHPMailer();
        $mail->IsSMTP(); // enable SMTP

        $mail->SMTPDebug = 2; // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = true; // authentication enabled
        $mail->SMTPSecure = "ssl"; // secure transfer enabled REQUIRED for Gmail
        $mail->Host = "hddeveloperteam-com.correoseguro.dinaserver.com";
        $mail->Port = 465; // or 587
        $mail->IsHTML(true);
        $mail->Username = "liliam@hddeveloperteam.com";
        $mail->Password = "5Mt5HAz3";
        $mail->SetFrom("liliam@hddeveloperteam.com");
        $mail->Subject = $subject;;
        //este es el asunto
        $mail->Body = $body;
        $mail->AddAddress($address);
        if ($attachment) {
            $mail->addAttachment($attachment);
        }
        try{
            $mail->Send();
        }catch(Exception $e){
            throw new Exception($e->getMessage());
        }
    }

}

?>