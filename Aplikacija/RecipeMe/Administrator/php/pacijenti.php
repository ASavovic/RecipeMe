<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
$pacijenti=$baza->vratiPacijente();  
echo json_encode($pacijenti);
?>