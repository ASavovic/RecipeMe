
<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_POST["username"])
    $tegoba=$baza->vratiTegobuKorisnika($_POST["username"]);
echo json_encode($tegoba);
?>