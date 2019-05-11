
<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_POST["ime"] && $_POST["prezime"]&& $_POST["jmbg"]&& $_POST["smena"]&& $_POST["email"]&& $_POST["korisnickoIme"]
        && $_POST["sifra"]&& $_POST["zvanje"])
{
   
   $baza->izmeniLekara($_POST["ime"],$_POST["prezime"],$_POST["jmbg"], $_POST["smena"], $_POST["email"], $_POST["korisnickoIme"], $_POST["sifra"],$_POST["zvanje"]); 
}

?>
