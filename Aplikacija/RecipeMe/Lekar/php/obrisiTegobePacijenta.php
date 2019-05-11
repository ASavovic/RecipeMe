<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if(isset($_POST["id"]))
{
    $baza->obrisiTegobePacijenta($_POST["id"]);
}
