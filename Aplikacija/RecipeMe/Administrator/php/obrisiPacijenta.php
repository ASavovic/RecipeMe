<?php
include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if (isset($_GET["id"])) {
        $baza->obrisiPacijenta($_GET["id"]);
        $pacijenti=$baza->vratiSvePacijente();  
    }
 
echo json_encode($pacijenti);
?>