<?php

class RadnoVreme {
   public $radni_dan;
   public $subota;
   public $nedelja;
        
   function  __construct($radni_dan,$subota,$nedelja)
   {
       $this->radni_dan=$radni_dan;
       $this->subota=$subota;
       $this->nedelja=$nedelja;
      
   }

}

