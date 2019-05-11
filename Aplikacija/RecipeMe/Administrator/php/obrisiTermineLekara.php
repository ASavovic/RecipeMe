<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if (isset($_POST["username"])) {
        $baza->obrisiTermineLekara($_POST["username"]);
        $termini=$baza->vratiSveTermine();
    }
    
echo json_encode($termini);