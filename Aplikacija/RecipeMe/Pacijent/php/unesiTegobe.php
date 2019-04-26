
<?php

include_once 'lib.php';
include_once 'Tegobe.php';
$baza=new PacijentService();

if($_POST["pacijent"])
{
    $tegobe=new Tegobe(0,$_POST["temperatura"],$_POST["grlo"],$_POST["kasalj"],$_POST["kijanje"],
            $_POST["curenje"],$_POST["komentar"],$_POST["doktor"],$_POST["date"],$_POST["time"]);
    $baza->unesiTegobe($_POST["pacijent"],$tegobe);
}

?>


