<?php


interface IBolnicaService {
    //put your code here
    function dodajPacijenta(Pacijent $p);
    function vratiPacijenta($username, $password);
    function vratiPacijentaId($id);
    function vratiPacijentaUsername($username);
    function vratiSvePacijente($username);
    function vratiPacijente();
    function vratiSveLekare();
    function promeniSmenuLekara($id,$smena);
    function obrisiLekara($id);
    function obrisiPacijenta($id);
    function dodajLekara($lekar);
    function vratiRadnoVreme();
    function azurirajRadnoVreme($radni_dan,$subota,$nedelja);
    function vratiAdmina($username,$password);
    function vratiLekara($username,$password);
    function vratiDoktora($username);
    function izmeniLekara($ime,$prezime,$jmbg, $smena, $email, $korisnickoIme, $sifra,$zvanje);
    function ubaciObavestenje($obavestenje);
    function promeniHronicneBolesnike($id,$hronicni);
    function izmeniPacijenta($ime,$prezime,$email,$jmbg,$telefon,$username,$password);
    function vratiKorisnika($username);
    function vratiDoktore($smena);
    function unesiTegobe($tegobe);
    function izmeniHronicnogPacijenta($pacijent,$hronicni,$dijagnoza,$medikamenti,$doktor,$doza,$kontrola,$datum);
    function vratiSvePacijentee();
    function vratiTegobuKorisnika($username,$doktor);
    function azurirajPacijentuDijagnozuMedikamente($pacijent,$dijagnoza,$medikamenti,$doktor,$doza,$kontrola,$datum,$brojPreuzetih);
    function obrisiTegobePacijenta($id);
    function izmeniBrojPreuzetih($name,$broj);
    function ubaciPacijentuDijagnozuMedikamente($pacijent,$dijagnoza,$medikamenti,$doktor,$Ime_PrezimePac,$datum,$vreme);
    function vratiDijagnoze($username);
    function vratiDijagnozu($pacijent,$doktor,$datum);
    function vratiObavestenja($username);
    function obrisiObavestenje($id);
    function vratiSveTermine();
    function vratiTermineLekara($username);
    function obrisiTermineLekara($username);
    function dodajTermineLekaraPrvaSmena($username);
    function dodajTermineLekaraDrugaSmena($username);
    function vratiSveSlobodneTermine();
    function vratiSveSlobodneTermineLekara($username);
    function vratiSveZakazaneTermine();
    function vratiZakazaneTermineLekara($username);
    function obrisiZakazaneTermineLekara($username);
    function obrisiZakazanTerminLekaraIPacijenta($lekar,$pacijent);
    function zakaziTerminLekaraIPacijenta($lekar,$pacijent);
    function proveraZakazaniTermin($pacijent);
    function vratiDoktorId($pacijent);
    function zakaziTermin($pacijent,$doktor,$dan,$termin);
    function unesiOcenu($pacijent,$lekar,$ocena);
    function vratiOcene();
    function vratiZauzeteTermineLekara($username);
    function ubaciSliku($doktor,$slika,$opis);
    function vratiSveSlike();
    function vratiKorisnikaupdatePacijentuMesecIBrPreuzetih($username,$mesec,$brPreuzetih);
    function ubaciKomentar($pacijent,$komentar,$datum,$vreme);
    function vratiSveKomenatare($pacijent);
    function updateTegobe($pacijent,$komentar,$date,$time);
    function dodajSmenuLekara($username,$smena);
    function obrisiTerminPacijenta($id);
    
}
