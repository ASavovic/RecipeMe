<?php

class Obavestenje {
   public $id;
   public $id_lekara;
   public $text_poruke;
   public $flag_vidjena;
  

           
   function  __construct($id,$id_lekara,$text_poruke,$flag_vidjena)
   {
      
       $this->id=$id;
       $this->id_lekara=$id_lekara;
       $this->text_poruke=$text_poruke;
       $this->flag_vidjena=$flag_vidjena;
   }
}
