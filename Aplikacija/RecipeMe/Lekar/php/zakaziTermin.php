<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if (isset($_POST["usernDoc"])) {
        $baza->zakaziTerminLekaraIPacijenta($_POST["usernDoc"],$_POST["usernPat"]);
        $ztermini=$baza->vratiSveZakazaneTermine();
    }
    
echo json_encode($ztermini);

