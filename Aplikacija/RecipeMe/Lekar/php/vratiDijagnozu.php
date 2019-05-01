<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
$dijagnoza=null;
if($_POST["pacijent"])
    $dijagnoza=$baza->vratiDijagnozu($_POST["pacijent"],$_POST["doktor"],$_POST["datum"]);  
echo json_encode($dijagnoza);
?>


