<?php

include_once 'lib.php';
$baza=new PacijentService();
$pacijenti=$baza->vratiSvePacijentee();  
echo json_encode($pacijenti);
?>

