<?php
include_once 'Lekar.php';
class ListaLekara {
  public $lekari;
  
  function __construct() {
      $this->lekari=array();
  }
  public function dodajLekara(Lekar $l){
      $this->lekari[]=$l;
  }
}
