<?php


interface IBolnicaService {
    //put your code here
    function dodajPacijenta(Pacijent $p);
    function vratiPacijenta($username, $password);
    function vratiPacijentaId($id);
    function vratiPacijentaUsername($username);
    function vratiSvePacijente();
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
}
