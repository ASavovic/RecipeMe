<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_POST["radni_dan"] && $_POST["subota"] && $_POST["nedelja"])
{
    $baza->azurirajRadnoVreme($_POST["radni_dan"],$_POST["subota"], $_POST["nedelja"]);  
}


