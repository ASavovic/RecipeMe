<?php

include_once 'lib.php';
include_once 'Komentar.php';
$baza=new PacijentService();

if($_POST["pacijent"])
{
$datum=date("Y-m-d ");
$vreme=date("h:i:sa");

$baza->ubaciKomentar($_POST["pacijent"], $_POST["komentar"], $datum,$vreme);
}

?>
