<?php

class Lekar {
   public $id;
   public $jmbg;
   public $ime;
   public $prezime;
   public $zvanje;
   public $email;
   public $sifra;
   public $korisnickoIme;
   public $smena;
   public $listaSlobodnihTermina;
   
   function  __construct($id,$ime,$prezime,$jmbg,$zvanje,$email,$korisnickoIme,$sifra,$smena)
   {
       $this->id=$id;
       $this->jmbg=$jmbg;
       $this->ime=$ime;
       $this->prezime=$prezime;
       $this->zvanje=$zvanje;
       $this->email=$email;
       $this->sifra=$sifra;
       $this->korisnickoIme=$korisnickoIme;
       $this->smena=$smena;
       $this->listaSlobodnihTermina= array();
       
   }
   /*}
   public function dodajSlobodanTermin(Termin $p) {
        $this->listaSlobodnihTermina[]=$p;
    }*/
   
}
