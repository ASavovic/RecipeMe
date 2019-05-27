<?php

include_once 'lib.php';
include_once 'Komentar.php';
$baza=new PacijentService();
if(isset($_GET["username"]))
{
    $komentari=$baza->vratiSveKomenatare($_GET["username"]);
    echo json_encode($komentari);
}

?>
