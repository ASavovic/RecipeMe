<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
$pacijenti=$baza->vratiSvePacijente();  
echo json_encode($pacijenti);
?>