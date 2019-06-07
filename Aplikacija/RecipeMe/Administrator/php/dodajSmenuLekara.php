<?php
include_once '../../Pacijent/php/lib.php';

$baza=new PacijentService();
if (isset($_POST["korisnickoIme"])) {
        $baza->dodajSmenuLekara($_POST["korisnickoIme"],$_POST["smena"]);
}
?>
