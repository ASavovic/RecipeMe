
<?php

include_once '../../Pacijent/php/lib.php';
$baza=new PacijentService();
if($_POST["pacijent"] && $_POST["doktor"])
{
   
   $baza->azurirajPacijentuDijagnozuMedikamente($_POST["pacijent"],$_POST["dijagnoza"], $_POST["medikamenti"], $_POST["doktor"],$_POST["doza"],$_POST["kontrola"],$_POST["datum"],$_POST["brojPreuzetih"]); 
}
//
/*
 * 
 * 
 * 
 * 
 * 
 * Ovde mora da se salje email pacijentu u kome je html stranica pretvorena u pdf
 * email pacijenta je u promenljivoj $_POST["emailPacijenta"]
 * ime i prezime pacijenta sa razmakom izmedju u promenljivoj $_POST["Ime_PrezimePac"]\
 * poziva se iz prepisiRecept.js u Lekar/js
 * 
 * 
 * Mora da se odradi i provera da li je pacijent ispunio svoju kvotu sa brojem
 * primljenih recepata (101 linija koda u prepisiRecept.js)
 * u promenljivoj $_POST["brojPreuzetih"] je broj recepata koje je pacijent preuzeo 
 * taj broj se u lib.php inkrementira u okviru update upita 
 * bilo bi dobro da se u prepisiRecept.js u event-u na klik dugmeta Send(dugmePosalji u js)
 * pojavi neko upozorenje ako je pacijent premasio kvotu i da se smisli sta onda...
 * 
 * 
 * 
*/
?>
