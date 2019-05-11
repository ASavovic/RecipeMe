<?php

include_once 'Dijagnoza.php';
class ListaDijagnoza {
  public $dijagnoze;
  
  function __construct() {
      $this->dijagnoze=array();
  }
  public function dodajDijagnozu(Dijagnoza $d){
      $this->dijagnoze[]=$d;
  }
}
