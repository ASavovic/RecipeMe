<?php
class Dijagnoza {
   public $id;
   public $pacijent;
   public $dijagnoza;
   public $medikamenti;
   public $doktor;
   public $Ime_PrezimePac;
   public $datum;
   public $vreme;
   
   function  __construct($id,$pacijent,$Ime_PrezimePac,$dijagnoza,$medikamenti,$doktor,$datum,$vreme)
   {
       
       $this->id=$id;
       $this->pacijent=$pacijent;
       $this->Ime_PrezimePac=$Ime_PrezimePac;
       $this->dijagnoza=$dijagnoza;
       $this->medikamenti=$medikamenti;
       $this->doktor=$doktor;
       $this->datum=$datum;
       $this->vreme=$vreme;
       
       
   }
   
}
