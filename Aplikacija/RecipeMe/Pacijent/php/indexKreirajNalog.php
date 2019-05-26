<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once '../../PHPMailer/PHPMailer.php';
require_once '../../PHPMailer/SMTP.php';
require_once '../../PHPMailer/Exception.php';
include_once 'lib.php';
$baza=new PacijentService();
if(isset($_POST["jmbg"]))
{
    // staro kreiranje objekata koje je ostalo
    //$pacijent= new Pacijent(0,$_POST["ime"],$_POST["prezime"],$_POST["jmbg"],
    //        $_POST["telefon"],$_POST["email"],$_POST["korisnickoIme"],$_POST["sifra"],0,"");
    
    // novo kreiranje objekata, dodati i novi atributi iz klase
    $pacijent= new Pacijent(0,$_POST["ime"],$_POST["prezime"],$_POST["jmbg"],
            $_POST["telefon"],$_POST["email"],$_POST["korisnickoIme"],$_POST["sifra"],0,"null","null","null",0,0,"null",0,"null");
    
    $baza->dodajPacijenta($pacijent);
    
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
 $mail->Subject="Uspesna Registracija";
 $mail->Body="Postovani,<br><br>"
         . "Uspesno ste kreirali nalog na RecipeMe sajtu.<br>"
         . "Vas Username je ".$_POST["korisnickoIme"].".<br>"
         . "Hvala na poverenju!<br><br>"
         . "Pozdrav,<br>"
         . "3SGroup.";
 
 if($mail->send())
     echo "Email sent!";
 else
     echo "Wrong!".$mail->ErrorInfo;
 
}
else if(isset($_GET["name"]))
{
    $pacijent=$baza->vratiPacijentaId($_GET["name"]);
    echo json_encode($pacijent);
}

?>
