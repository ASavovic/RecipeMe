<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if (isset($_GET["id"])) {
        $baza->obrisiLekara($_GET["id"]);
        $lekari=$baza->vratiSveLekare();  
    }
 
echo json_encode($lekari);
?>

