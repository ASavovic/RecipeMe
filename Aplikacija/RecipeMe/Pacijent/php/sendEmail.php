<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once '../../PHPMailer/PHPMailer.php';
require_once '../../PHPMailer/SMTP.php';
require_once '../../PHPMailer/Exception.php';
include_once '../../Pacijent/php/lib.php';
include('pdf.php');

$file_name="Prescription_RecipeMe_".$_POST[naziv].".pdf";
$html_code = '<link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
  <link href="../css/sb-admin-2.css" rel="stylesheet">
  <link href="../css/sb-admin-2.min.css" rel="stylesheet">
  <link rel="stylesheet"  type="text/css" href="../css/admin.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">';
$div= $_POST["data"];
$html_code .= $div;
$pdf = new Pdf();
$pdf->load_html($html_code);
$pdf->render();
$file = $pdf->output();
file_put_contents($file_name, $file);




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
 $mail->AddAttachment($file_name); 
 $mail->Subject="Prescription";
 $mail->Body = "Dear,<br><br>"
         . "The prescription is attached.<br><br>"
         . "Best regards,<br>"
         . "RecipeMe.";

 if($mail->send())
 {
     echo "Email sent!";
 }
 else
     echo "Wrong!".$mail->ErrorInfo;
