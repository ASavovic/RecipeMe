<?php


class Tegobe {
   public $id;
   public $groznica;
   public $bolGrlo;
   public $kasalj;
   public $kijanje;
   public $curenjeNos;
   public $komentar;
   public $datum;
   public $vreme;
   public $doktorId;
   
   function  __construct($id,$groznica,$bolGrlo,$kasalj,$kijanje,$curenjeNos,$komentar,$doktorId,$datum,$vreme)
   {
       $this->id=$id;
       $this->groznica=$groznica;
       $this->bolGrlo=$bolGrlo;
       $this->kasalj=$kasalj;
       $this->kijanje=$kijanje;
       $this->curenjeNos=$curenjeNos;
       $this->komentar=$komentar;
       $this->doktorId=$doktorId;
       $this->datum=$datum;
       $this->vreme=$vreme;
       
       
   }
   
}
