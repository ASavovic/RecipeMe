<?php

include_once 'lib.php';
$baza=new PacijentService();
$pacijenti=$baza->vratiSvePacijente();  
echo json_encode($pacijenti);
?>

