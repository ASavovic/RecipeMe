<?php

include_once 'lib.php';
$baza=new PacijentService();
if($_GET["name"])
    $lekar=$baza->vratiDoktorId($_GET["name"]);  
echo json_encode($lekar);
?>


