<?php

include_once 'lib.php';
include_once 'Tegobe.php';
$baza=new PacijentService();

if($_POST["pacijent"])
{
  
    $baza->updateTegobe($_POST["pacijent"],$_POST["komentar"],$_POST["date"],$_POST["time"]);
}

?>
