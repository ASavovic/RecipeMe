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
}
