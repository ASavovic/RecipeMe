
<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_POST["username"] && $_POST["password"])
    $lekar=$baza->vratiLekara($_POST["username"],$_POST["password"]);  
echo json_encode($lekar);
?>
