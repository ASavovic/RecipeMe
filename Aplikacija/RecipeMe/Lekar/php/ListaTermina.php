<?php
include_once 'Termin.php';
class ListaTermina {
  public $termini;
  
  function __construct() {
      $this->termini=array();
  }
  public function dodajTermin(Termin $t){
      $this->termini[]=$t;
  }
}
