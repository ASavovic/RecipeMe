
<?php

include_once 'lib.php';
$baza=new PacijentService();
if($_POST["username"])
{
    $baza->vratiKorisnikaupdatePacijentuMesecIBrPreuzetih($_POST["username"],$_POST["mesec"],0);
    $pacijent=$baza->vratiPacijentaUsername($_POST["username"]);
}
echo json_encode($pacijent);
?>

