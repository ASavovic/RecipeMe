<?php

class ReceptHronicni {
   public $id;
   public $pacijent;
   public $doktor;
   public $dozaMesec;
   public $datumOd;
   public $datumDo;
   public $kontrola;
  
   
   function  __construct($id,$pacijent,$doktor,$dozaMesec,$datumOd,$datumDo,$kontrola)
   {
       $this->id=$id;
       $this->pacijent=$pacijent;
       $this->doktor=$doktor;
       $this->dozaMesec=$dozaMesec;
       $this->datumOd=$datumOd;
       $this->datumDo=$datumDo;
       $this->kontrola=$kontrola;
      
       
   }

}


