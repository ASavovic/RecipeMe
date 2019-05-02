<?php
include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_GET["username"])
{
    $baza->obrisiObavestenje($_GET["id"]);
    $dijagnoze=$baza->vratiObavestenja($_GET["username"]);  
}
echo json_encode($dijagnoze);
?>
