
<?php

include_once 'lib.php';
$baza=new PacijentService();
if($_GET["name"])
    $pacijent=$baza->proveraZakazaniTermin($_GET["name"]);
echo json_encode($pacijent);
?>
