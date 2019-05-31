<?php


class Slika {
   public $slika;
   public $opis;
   public $doktor;
   public $id;
   
   function __construct($id,$slika,$opis,$doktor) {
       $this->id=$id;
       $this->slika=$slika;
       $this->opis=$opis;
       $this->doktor=$doktor;
       
   }
}
