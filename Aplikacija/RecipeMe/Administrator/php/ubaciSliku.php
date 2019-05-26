<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if(isset($_POST["slika"]))
{
    
    $baza->ubaciSliku($_POST["doktor"],$_POST["slika"], $_POST["opis"]); 

}
