<?php


class Ocena {
    public $id;
    public $pacijent;
    public $lekar;
    public $ocena;
    
    function __construct($id,$pacijent,$lekar,$ocena)
    {
        $this->id=$id;
        $this->lekar=$lekar;
        $this->ocena=$ocena;
        $this->pacijent=$pacijent;
    }
}
