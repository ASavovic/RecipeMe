<?php
include_once '../../Pacijent/php/Pacijent.php';
include_once '../../Lekar/php/Lekar.php';
class Administrator {
   public $email;
   public $ime;
   public $prezime;
   public $sifra;
   public $korisnickoIme;
  /* public $lekari;
   public $pacijenti;*/
           
   function  __construct($ime,$prezime,$kIme,$sifra,$email)
   {
      
       $this->ime=$ime;
       $this->prezime=$prezime;
       $this->email=$email;
       $this->sifra=$sifra;
       $this->korisnickoIme=$kIme;
       /*$this->lekari=array();
       $this->pacijenti=array();*/
   }
   /*public function dodajLekara(Lekar $l) {
   $this->lekari[]=$l;
   
   }
   public function dodajPacijenta(Pacijent $l) {
   $this->lekari[]=$l;
   
   }*/
}

