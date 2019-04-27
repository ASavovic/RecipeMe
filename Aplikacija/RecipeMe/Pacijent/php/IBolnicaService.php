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
    function izmeniPacijenta($ime,$prezime,$email,$jmbg,$telefon,$username,$password);
    function vratiKorisnika($username);
    function vratiDoktore($smena);
    function unesiTegobe($tegobe);
    function izmeniHronicnogPacijenta($pacijent,$hronicni,$dijagnoza,$medikamenti,$doktor,$doza,$kontrola,$datum);
    function vratiSvePacijentee();
}
