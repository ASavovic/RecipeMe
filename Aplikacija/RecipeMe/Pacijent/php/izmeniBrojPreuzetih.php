
<?php

include_once 'lib.php';
$baza=new PacijentService();
if($_POST["name"] && $_POST["broj"])
{
   
   $baza->izmeniBrojPreuzetih($_POST["name"],$_POST["broj"]);
}

?>


