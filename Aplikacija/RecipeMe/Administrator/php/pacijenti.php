<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
$lekari=$baza->vratiSvePacijente();  
echo json_encode($lekari);
?>