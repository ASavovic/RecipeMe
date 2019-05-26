<?php

class Komentar
{
    public $pacijent;
    public $komentar;
    public $datum;
    public $vreme;
    public $id;
    
    function __construct($id,$pacijent,$komentar,$datum,$vreme)
    {
        $this->id=$id;
        $this->pacijent=$pacijent;
        $this->komentar=$komentar;
        $this->datum=$datum;
       $this->vreme=$vreme;
        
    }
}
