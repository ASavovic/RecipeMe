<?php

include_once 'lib.php';
$baza=new PacijentService();
if(isset($_POST["lekar"]))
{
   $baza->unesiOcenu($_POST["pacijent"],$_POST["lekar"], $_POST["ocena"]); 
}
?>