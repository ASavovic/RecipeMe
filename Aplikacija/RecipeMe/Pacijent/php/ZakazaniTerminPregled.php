<?php

class ZakazaniTerminPregled
{
    public $ime;
    public $prezime;
    public $jmbg;
    public $telefon;
    public $email;
    public $dan;
    public $termin;
    public $id;
    
    function __construct($dan,$termin) {
        $this->dan=$dan;
        $this->termin=$termin;
    }
    function setujOstaleVrednosti($ime,$prezime,$jmbg,$telefon,$email)
    {
        $this->ime=$ime;
        $this->prezime=$prezime;
        $this->jmbg=$jmbg;
        $this->telefon=$telefon;
        $this->email=$email;
    }
   
}

