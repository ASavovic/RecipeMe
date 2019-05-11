
<?php

include_once 'lib.php';
$baza=new PacijentService();
if($_POST["username"])
    $pacijent=$baza->vratiKorisnika($_POST["username"]);
echo json_encode($pacijent);
?>
