<?php

include_once 'lib.php';
$baza=new PacijentService();
$pacijent=null;
if(isset($_POST["username"]))
{
   $pacijent=$baza->vratiPacijenta($_POST["username"],$_POST["password"]);  
 
}
echo json_encode($pacijent);
?>