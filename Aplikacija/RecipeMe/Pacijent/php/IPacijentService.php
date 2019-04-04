<?php


interface IPacijentService {
    //put your code here
    function dodajPacijenta(Pacijent $p);
    function vratiPacijenta($username, $password);
    function vratiPacijentaId($id);
    function vratiPacijentaUsername($username);
    function vratiSvePacijente();
}
