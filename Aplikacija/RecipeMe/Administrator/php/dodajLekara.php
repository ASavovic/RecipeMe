<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if(isset($_POST["jmbg"]))
{
    $lekar= new Lekar(0,$_POST["ime"],$_POST["prezime"],$_POST["jmbg"],
            $_POST["zvanje"],$_POST["email"],$_POST["korisnickoIme"],$_POST["sifra"],$_POST["smena"]);
    
    $baza->dodajLekara($lekar);
    $lekari=$baza->vratiSveLekare();  

}
echo json_encode($lekari);