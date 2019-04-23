
<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_POST["username"])
    $lekar=$baza->vratiDoktora($_POST["username"]);  
echo json_encode($lekar);
?>
