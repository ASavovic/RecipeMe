<?php
include_once 'ZakazanTermin.php';
class ListaZakazanihTermina {
  public $ztermini;
  
  function __construct() {
      $this->ztermini=array();
  }
  public function dodajZakazanTermin(ZakazanTermin $zt){
      $this->ztermini[]=$zt;
  }
}
