<?php
//incluimos la clase PHPMailer
	include("PHPMailer-master/src/PHPMailer.php");
    include("PHPMailer-master/src/SMTP.php");
    include("PHPMailer-master/src/Exception.php");

class email{

function __construct() {
		
	}
	public function sendMail($address, $attachment){

	$mail = new PHPMailer\PHPMailer\PHPMailer();
 	$mail->IsSMTP(); // enable SMTP

  
    $mail->SMTPDebug = 2; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = "ssl"; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "hddeveloperteam-com.correoseguro.dinaserver.com";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "liliam@hddeveloperteam.com";
    $mail->Password = "n4IrzPxR";
    $mail->SetFrom("liliam@hddeveloperteam.com");
    $mail->Subject = "Tarifas por Servicios";
    //este es el asunto 
    $mail->Body = "Buenas Tardes ,  a traves de este link podran acceder a las tarifas por servicios contratadas  "  .$attachment;
    $mail->AddAddress($address);
   // $mail->addAttachment($attachment);

     if(!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
     } else {
        echo "Message has been sent";
     }

	}
 
}
?>