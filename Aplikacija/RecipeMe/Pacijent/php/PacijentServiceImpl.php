<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once 'IPacijentService.php';
include_once 'Pacijent.php';

class PacijentService implements IPacijentService
{
    const db_host="localhost";
    const db_username="root";
    const db_password="";
    const db_name="recipeme";
    
    
    public function dodajPacijenta(Pacijent $p) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("INSERT INTO pacijent (jmbg, ime, prezime, broj_telefona, korisnicko_ime, sifra, email, hronicniBolesnik, bolest)"
                . " VALUES "
                . "('$p->jmbg', '$p->ime', '$p->prezime', '$p->telefon', '$p->korisnickoIme', "
                . "'$p->sifra', '$p->email', $p->hronicniBolesnik, '$p->bolest')");
        if ($res) {
            
        print("Dobro je proslo");
            
        }
        else
        {
            print ("Query failed");
        }
    }
    }

    public function vratiPacijenta($username, $password) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from pacijent where korisnicko_ime='$username' and sifra='$password'");
        if ($res) {
            $pacijent = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$pacijent=new Pacijent($row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['bolest']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

            }
            // zatvaranje objekta koji cuva rezultat
            
            return $pacijent;
        }
        else
        {
            print ("Query failed");
        }
    }
    }

    public function vratiPacijentaId($id) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from pacijent where jmbg='$id'");
        if ($res) {
            $pacijent = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$pacijent=new Pacijent($row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['sifra'],$row['hronicniBolesnik'],$row['bolest']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

            }
            // zatvaranje objekta koji cuva rezultat
            
            return $pacijent;
        }
        else
        {
            print ("Query failed");
        }
    }
        
    }

    public function vratiPacijentaUsername($username) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from pacijent where korisnicko_ime='$username'");
        if ($res) {
            $pacijent = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$pacijent=new Pacijent($row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['bolest']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

            }
            // zatvaranje objekta koji cuva rezultat
            
            return $pacijent;
        }
        else
        {
            print ("Query failed");
        }
    }
    
    }

    public function vratiSvePacijente() {
   $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from pacijent");
        if ($res) {
            $niz = new ListaPacijenata();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$pacijent=new Pacijent($row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['bolest']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		$niz.dodajPacijenta($pacijent);

            }
            // zatvaranje objekta koji cuva rezultat
            //$res->close();
            return $niz;
        }
        else
        {
            print ("Query failed");
        }
    }

}
}

