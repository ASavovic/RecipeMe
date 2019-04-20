
<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
$radnoVreme=$baza->vratiRadnoVreme();  
echo json_encode($radnoVreme);
?>

