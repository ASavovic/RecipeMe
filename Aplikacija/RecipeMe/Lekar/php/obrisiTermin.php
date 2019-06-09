<?php


include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if(isset($_GET["id"]))
{
    $baza->obrisiTerminPacijenta($_GET["id"]);
}


