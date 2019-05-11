<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
$lekari=$baza->vratiSveLekare();  
echo json_encode($lekari);
?>

