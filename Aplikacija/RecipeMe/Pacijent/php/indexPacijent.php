<?php

include_once 'lib.php';
$baza=new PacijentService();
$pacijent=null;
if(isset($_GET["name"]))
{
   $pacijent=$baza->vratiPacijentaId($_GET["name"]);  
}
echo json_encode($pacijent);
?>