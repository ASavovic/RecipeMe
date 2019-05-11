
<?php

include_once 'lib.php';
$baza=new PacijentService();
if($_POST["ime"] && $_POST["prezime"]&& $_POST["jmbg"]&& $_POST["email"]&& $_POST["telefon"]&& $_POST["username"]
        && $_POST["password"])
{
   
   $baza->izmeniPacijenta($_POST["ime"],$_POST["prezime"],$_POST["email"],$_POST["jmbg"], $_POST["telefon"], $_POST["username"], $_POST["password"]);
}

?>

