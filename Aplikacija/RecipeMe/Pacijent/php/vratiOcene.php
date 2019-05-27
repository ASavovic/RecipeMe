<?php

include_once 'lib.php';
$baza=new PacijentService();
$ocene=null;
$ocene=$baza->vratiOcene();
echo json_encode($ocene);
?>


