<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once '../../PHPMailer/PHPMailer.php';
require_once '../../PHPMailer/SMTP.php';
require_once '../../PHPMailer/Exception.php';
include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_POST["radni_dan"] && $_POST["subota"] && $_POST["nedelja"] && $_POST["ime"] && $_POST["prezime"] && $_POST["email"])
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
        ."Our new working time from now is:"."<br><br>"
        ."Working days: " .$_POST["radni_dan"]."<br><br>"
        ."On Saturdays: " .$_POST["subota"]."<br><br>"
        ."On Sundays: " .$_POST["nedelja"]."<br><br>"
        . "Best regards,<br>"
        . "3SGroup.";
    
    if($mail->send())
        echo "Email sent!";
    else
        echo "Wrong!".$mail->ErrorInfo;
 
}