<?php

include_once 'lib.php';
$baza=new PacijentService();
if($_POST["pacijent"])
    $baza->zakaziTermin ($_POST["pacijent"], $_POST["doktor"], $_POST["dan"], $_POST["termin"]);

?>


