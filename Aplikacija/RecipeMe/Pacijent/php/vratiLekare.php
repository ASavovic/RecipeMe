
<?php

include_once 'lib.php';
$baza=new PacijentService();
if($_POST["smena"])
    $doktori=$baza->vratiDoktore($_POST["smena"]);
echo json_encode($doktori);
?>


