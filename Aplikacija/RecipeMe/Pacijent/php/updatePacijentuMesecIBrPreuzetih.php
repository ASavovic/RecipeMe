
<?php

include_once 'lib.php';
$baza=new PacijentService();
if($_POST["username"])
    $pacijent=$baza->vratiKorisnikaupdatePacijentuMesecIBrPreuzetih($_POST["username"],$_POST["mesec"],0);

?>

