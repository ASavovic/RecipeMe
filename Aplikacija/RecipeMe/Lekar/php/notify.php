<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once '../../PHPMailer/PHPMailer.php';
require_once '../../PHPMailer/SMTP.php';
require_once '../../PHPMailer/Exception.php';
include_once '../../Pacijent/php/lib.php';
include_once 'lib.php';
include_once 'obavestenje.php';
$baza=new PacijentService();

if(isset($_POST["ime"]))
{
 $mail=new PHPMailer();
 $mail->isSMTP();
 $mail->Host="smtp.gmail.com";
 $mail->SMTPAuth=true;
 $mail->Username="info.recipeme@gmail.com";
 $mail->Password="RecipeMe@19";
 $mail->Port="465";
 $mail->SMTPSecure="ssl";
 
 $mail->isHTML(true);
 $mail->setFrom($_POST["email"],"RecipeMe");
 $mail->addAddress($_POST["email"]);
 $mail->Subject="Notification";
 $mail->Body="Dear ".$_POST["ime"]." ".$_POST["prezime"].",<br><br>"
         ."You have a new message:<br>"
         .$_POST["txtPoruke"]."<br><br>"
         . "Best regards,<br>"
         . "3SGroup.";
 //$obavestenje=new Obavestenje(0, $_POST["id"], $mail->Body, 0,0,0);
 //$baza->ubaciObavestenje($obavestenje);
 if($mail->send())
     echo "Email sent!";
 else
     echo "Wrong!".$mail->ErrorInfo;
}