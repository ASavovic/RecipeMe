<?php

include_once 'PacijentServiceImpl.php';
$baza=new PacijentService();
$pacijent=null;
if(isset($_POST["korisnickoIme"]))
{
   $pacijenti=$baza->vratiSvePacijente();  
}
echo json_encode($pacijent);
?>

