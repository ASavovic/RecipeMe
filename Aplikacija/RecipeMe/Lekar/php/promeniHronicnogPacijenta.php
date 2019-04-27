
<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_POST["pacijent"] && $_POST["doktor"])
{
   
   $baza->izmeniHronicnogPacijenta($_POST["pacijent"],$_POST["hronicni"],$_POST["dijagnoza"], $_POST["medikamenti"], $_POST["doktor"]); 
}

?>
