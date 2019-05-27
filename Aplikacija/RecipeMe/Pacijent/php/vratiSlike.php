
<?php

include_once 'lib.php';
$baza=new PacijentService();

$slike=$baza->vratiSveSlike();  
echo json_encode($slike);
?>
