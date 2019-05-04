<?php


class ZakazanTermin {
   public $id;
   public $doktorUsername;
   public $pacijentUsername;
   
   
   function  __construct($id,$doktor,$pacijent)
   {
       $this->id=$id;
       $this->doktorUsername=$doktor;
       $this->pacijentUsername=$pacijent;
   }
   
}
