<?php


class Pacijent {
   public $id;
   public $jmbg;
   public $ime;
   public $prezime;
   public $telefon;
   public $email;
   public $sifra;
   public $korisnickoIme;
   public $hronicniBolesnik;
   public $dijagnoza;
   public $medikamenti;
   public $doktor;
   public $doza;
   public $kontrola;
   public $datum;
   public $brojPreuzetih;
   
   
   function  __construct($id,$ime,$prezime,$jmbg,$telefon,$email,$korisnickoIme,$sifra,$hronicni,$dijagnoza,$medikamenti,$doktor,$doza,$kontrola,$datum,$brPreuzetih)
   {
       $this->id=$id;
       $this->jmbg=$jmbg;
       $this->ime=$ime;
       $this->prezime=$prezime;
       $this->telefon=$telefon;
       $this->email=$email;
       $this->sifra=$sifra;
       $this->korisnickoIme=$korisnickoIme;
       $this->hronicniBolesnik=$hronicni;
       $this->dijagnoza=$dijagnoza;
       $this->medikamenti=$medikamenti;
       $this->doktor=$doktor;
       $this->doza=$doza;
       $this->kontrola=$kontrola;
       $this->datum=$datum;
       $this->brojPreuzetih=$brPreuzetih;
   }
   
}
