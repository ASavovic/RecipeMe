<?php


class Termin {
   public $id;
   public $doktorUsername;
   public $pacijentUsername;
   public $dan;
   public $termin;
   public $flagZauzeto;
   
   
   function  __construct($id,$doktor,$pacijent,$dan,$termin,$flag)
   {
       $this->id=$id;
       $this->doktorUsername=$doktor;
       $this->pacijentUsername=$pacijent;
       $this->dan=$dan;
       $this->termin=$termin;
       $this->flagZauzeto=$flag;
   }
   
}
