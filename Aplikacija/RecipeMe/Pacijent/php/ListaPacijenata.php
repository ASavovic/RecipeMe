<?php
include_once 'Pacijent.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ListaPacijenata
 *
 * @author Emma
 */
class ListaPacijenata {
  public $pacijenti=array();
  public function dodajPacijenta(Pacijent $p){
      $this->pacijenti.push($p);
  }
}
