<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once '../../PHPMailer/PHPMailer.php';
require_once '../../PHPMailer/SMTP.php';
require_once '../../PHPMailer/Exception.php';
include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if (isset($_POST["id"])) {
        $baza->promeniSmenuLekara($_POST["id"],$_POST["smena"]);
        $lekari=$baza->vratiSveLekare();  
    }
 
echo json_encode($lekari);

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
 $mail->Subject="Nortification";
 $mail->Body="Postovani dr. ".$_POST["ime"]." ".$_POST["prezime"]."<br><br>"
          ."Od sutra radite u ".$_POST["smena"].". "."smeni.".
          "<br><br>"
         . "Pozdrav,<br>"
         . "3SGroup.";
 
 if($mail->send())
 {}
 else
     echo "Wrong!".$mail->ErrorInfo;