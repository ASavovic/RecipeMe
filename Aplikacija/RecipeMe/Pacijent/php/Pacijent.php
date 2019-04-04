<?php


class Pacijent {
   public $jmbg;
   public $ime;
   public $prezime;
   public $telefon;
   public $email;
   public $sifra;
   public $korisnickoIme;
   public $hronicniBolesnik;
   public $bolest;
   
   function  __construct($ime,$prezime,$jmbg,$telefon,$email,$korisnickoIme,$sifra,$hronicni,$bolest)
   {
       $this->jmbg=$jmbg;
       $this->ime=$ime;
       $this->prezime=$prezime;
       $this->telefon=$telefon;
       $this->email=$email;
       $this->sifra=$sifra;
       $this->korisnickoIme=$korisnickoIme;
       $this->hronicniBolesnik=$hronicni;
       $this->bolest=$bolest;
       
   }
   
}
