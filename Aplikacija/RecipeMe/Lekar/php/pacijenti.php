<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_POST["username"])
 $pacijenti=$baza->vratiSvePacijente($_POST["username"]);  
echo json_encode($pacijenti);
?>