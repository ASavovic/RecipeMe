<?php

include_once '../../Administrator/php/obavestenje.php';
class ListaObavestenja {
  public $obavestenja;
  
  function __construct() {
      $this->obavestenja=array();
  }
  public function dodajObavestenje(Obavestenje $o){
      $this->obavestenja[]=$o;
  }
}