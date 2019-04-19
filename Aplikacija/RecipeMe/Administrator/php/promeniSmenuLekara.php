<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if (isset($_GET["id"])) {
        $baza->promeniSmenuLekara($_GET["id"],$_GET["smena"]);
        $lekari=$baza->vratiSveLekare();  
    }
 
echo json_encode($lekari);
?>
