<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once 'IBolnicaService.php';
include_once 'Pacijent.php';
include_once 'ListaPacijenata.php';
include_once '../../Lekar/php/ListaLekara.php';
include_once '../../Lekar/php/Lekar.php';
include_once '../../Administrator/php/radnoVreme.php';
include_once '../../Administrator/php/administrator.php';
include_once '../../Administrator/php/obavestenje.php';

class PacijentService implements IBolnicaService
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
        
        /*$res=$con->query("INSERT INTO pacijent (jmbg, ime, prezime, broj_telefona, korisnicko_ime, sifra, email, hronicniBolesnik, bolest)"
                . " VALUES "
                . "('$p->jmbg', '$p->ime', '$p->prezime', '$p->telefon', '$p->korisnickoIme', "
                . "'$p->sifra', '$p->email', $p->hronicniBolesnik, '$p->bolest')");*/
        $res=$con->query("INSERT INTO pacijent (jmbg, ime, prezime, broj_telefona, korisnicko_ime, sifra, email)"
                . " VALUES "
                . "('$p->jmbg', '$p->ime', '$p->prezime', '$p->telefon', '$p->korisnickoIme', "
                . "'$p->sifra', '$p->email')");
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
				
				$pacijent=new Pacijent($row['id'],$row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

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
        $res = $con->query("select * from pacijent where korisnicko_ime='$id'");
        if ($res) {
            $pacijent = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$pacijent=new Pacijent($row['id'],$row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

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
				
				$pacijent=new Pacijent($row['id'],$row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['bolest'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

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

    public function vratiSvePacijente($username) {
   $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from pacijent where korisnicko_ime in ( select pacijent from tegobe where doktorId='$username')");
        if ($res) {
            $niz = new ListaPacijenata();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$pacijent=new Pacijent($row['id'],$row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		$niz->dodajPacijenta($pacijent);

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
 public function vratiSveLekare() {
   $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from doktor");
        if ($res) {
            $niz = new ListaLekara();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$lekar=new Lekar($row['id'],$row['ime'],$row['prezime'], $row['jmbg'],$row['zvanje'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['smena']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		$niz->dodajLekara($lekar);

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
public function promeniSmenuLekara($id,$smena)
{
       $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("update doktor set smena=$smena where id = $id");
           
          
        if ($res) {
         
        }
        else
        {
            print ("Query failed");
        }
        }
    }
    
    public function obrisiLekara($id)
    {
        
         $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("delete from doktor where id = $id");
          if($res) 
          {
              
          }
        
        else
        {
            print ("Query failed");
        }
        }
    }
    function obrisiPacijenta($id)
    {
            $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("delete from pacijent where id = $id");
          if($res) 
          {
              
          }
        
        else
        {
            print ("Query failed");
        }
        }  
    }
        
public function dodajLekara($lekar)
{
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("INSERT INTO doktor (jmbg, ime, prezime, zvanje, korisnicko_ime, sifra, email, smena)"
                . " VALUES "
                . "('$lekar->jmbg', '$lekar->ime', '$lekar->prezime', '$lekar->zvanje', '$lekar->korisnickoIme', "
                . "'$lekar->sifra', '$lekar->email', $lekar->smena)");
        if ($res) {
            
       
            
        }
        else
        {
            print ("Query failed");
        }
    }
}

    public function vratiRadnoVreme() {
        
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from radno_vreme where id=1;");
        if ($res) {
            $radnoVreme = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$radnoVreme=new RadnoVreme($row['radni_dan'],$row['subota'], $row['nedelja']);
            }
            // zatvaranje objekta koji cuva rezultat
            
            return $radnoVreme;
        }
        else
        {
            print ("Query failed");
        }
    }
    }

    public function azurirajRadnoVreme($radni_dan,$subota,$nedelja) {
       
     $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("update radno_vreme set radni_dan='$radni_dan', subota='$subota', nedelja='$nedelja' where id = 1");
           
          
        if ($res) {
         
        }
        else
        {
            print ("Query failed");
        }
        }
    
    }

    public function vratiAdmina($username,$password) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from administrator where korisnicko_ime='$username' and sifra='$password';;");
        if ($res) {
            $admin = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$admin=new Administrator($row['ime'],$row['prezime'], $row['korisnicko_ime'],
                                        $row['sifra'],$row['email']);
            }
            // zatvaranje objekta koji cuva rezultat
            
            return $admin;
        }
        else
        {
            print ("Query failed");
        }
    }
    }

    public function vratiLekara($username, $password) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from doktor where korisnicko_ime='$username' and sifra='$password';");
        if ($res) {
            $lekar = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$lekar=new Lekar($row['id'],$row['ime'], $row['prezime'],$row['jmbg'],$row['zvanje'],
                                        $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['smena']);
            }
            // zatvaranje objekta koji cuva rezultat
            
            return $lekar;
        }
        else
        {
            print ("Query failed");
        }
    }
    }

    public function vratiDoktora($username) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from doktor where korisnicko_ime='$username';");
        if ($res) {
            $lekar = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$lekar=new Lekar($row['id'],$row['ime'], $row['prezime'],$row['jmbg'],$row['zvanje'],
                                        $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['smena']);
            }
            // zatvaranje objekta koji cuva rezultat
            
            return $lekar;
        }
        else
        {
            print ("Query failed");
        }
    }
        
    }

    public function izmeniLekara($ime, $prezime, $jmbg, $smena, $email, $korisnickoIme,$sifra, $zvanje) {
        
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("update doktor set ime='$ime', prezime='$prezime', jmbg='$jmbg',smena='$smena', email='$email', sifra='$sifra', zvanje='$zvanje'
                where korisnicko_ime='$korisnickoIme';");
           
          
        if ($res) {
         
        }
        else
        {
            print ("Query failed");
        }
        }
    }
public function ubaciObavestenje($obavestenje){
       $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("INSERT INTO obavestenje (id_lekara, text_poruke, flag_vidjena,datum,vreme)"
                . " VALUES "
                . "('$obavestenje->id_lekara', '$obavestenje->text_poruke',0,CURRENT_DATE,CURRENT_TIME)");
                
        if ($res) {
            
       
            
        }
        else
        {
            print ("Query failed");
        }
    }
}

public function promeniHronicneBolesnike($id,$hronicni)
{
       $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("update pacijent set hronicniBolesnik=$hronicni where id = $id");
          
        if ($res) {
         
        }
        else
        {
            print ("Query failed");
        }
        }
    }

    public function izmeniPacijenta($ime, $prezime, $email, $jmbg, $telefon, $username, $password) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("update pacijent set ime='$ime', prezime='$prezime', jmbg='$jmbg', email='$email', sifra='$password', broj_telefona='$telefon'
                where korisnicko_ime='$username';");
           
          
        if ($res) {
         
        }
        else
        {
            print ("Query failed");
        }
        }
    }

    public function vratiKorisnika($username) {
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
				
				$pacijent=new Pacijent($row['id'],$row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

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

    public function vratiDoktore($smena) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from doktor where smena='$smena'");
        if ($res) {
            $niz = array();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$lekar=new Lekar($row['id'],$row['ime'],$row['prezime'], $row['jmbg'],$row['zvanje'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['smena']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		$niz[]=$lekar;

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

    public function unesiTegobe( $tegobe) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("INSERT INTO tegobe (pacijent, groznica, bolGrlo, kasalj, kijanje, curenje, komentar, doktorId, datum, vreme)"
                . " VALUES "
                . "('$tegobe->pacijent', '$tegobe->groznica', '$tegobe->bolGrlo', '$tegobe->kasalj', '$tegobe->kijanje', '$tegobe->curenjeNos',"
                . "'$tegobe->komentar', '$tegobe->doktorId', '$tegobe->datum', '$tegobe->vreme')");
        if ($res) {
            
       
            
        }
        else
        {
            print ("Query failed");
        }
    }
    }

    public function vratiPacijente() {
        
         $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from pacijent");
        if ($res) {
            $niz = array();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$pacijent=new Pacijent($row['id'],$row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],
                        $row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		$niz[]=$pacijent;

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

    public function izmeniHronicnogPacijenta($pacijent, $hronicni, $dijagnoza, $medikamenti, $doktor,$doza,$kontrola,$datum) {
        
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("update pacijent set hronicniBolesnik='$hronicni', dijagnoza='$dijagnoza', medikamenti='$medikamenti', doktor='$doktor', doza='$doza', kontrola='$kontrola', datum='$datum' where id='$pacijent';");
           
          
        if ($res) {
         
        }
        else
        {
            print ("Query failed");
        }
        }
    }
    
    public function vratiSvePacijentee() {
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
				
		$pacijent=new Pacijent($row['id'],$row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		$niz->dodajPacijenta($pacijent);

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

    public function izmeniBrojPreuzetih($name, $broj) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("update pacijent set brojPreuzetih='$broj'
                where korisnicko_ime='$name';");
           
          
        if ($res) {
         
        }
        else
        {
            print ("Query failed");
        }
        }
    }

}

