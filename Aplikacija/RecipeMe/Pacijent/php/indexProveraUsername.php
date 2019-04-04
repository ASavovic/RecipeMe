<?php

include_once 'PacijentServiceImpl.php';
$baza=new PacijentService();
$pacijenti=$baza->vratiSvePacijente();  
echo json_encode($pacijenti);
?>

