
<?php

include_once 'lib.php';
$baza=new PacijentService();
if($_GET["name"])
    $termini=$baza->vratiSveSlobodneTermineLekara($_GET["name"]);
echo json_encode($termini);
?>


