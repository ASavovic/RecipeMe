<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_POST["username"])
    $termini=$baza->vratiZauzeteTermineLekara($_POST["username"]);
echo json_encode($termini);
?>