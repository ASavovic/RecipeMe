<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include_once 'IBolnicaService.php';
include_once 'Pacijent.php';
include_once 'Ocena.php';
include_once 'ListaPacijenata.php';
include_once 'ZakazaniTerminPregled.php';
include_once '../../Lekar/php/ListaLekara.php';
include_once '../../Lekar/php/Lekar.php';
include_once '../../Administrator/php/radnoVreme.php';
include_once '../../Administrator/php/administrator.php';
include_once '../../Administrator/php/obavestenje.php';
include_once 'Tegobe.php';
include_once '../../Lekar/php/Dijagnoza.php';
include_once '../../Lekar/php/ListaDijagnoza.php';
include_once '../../Lekar/php/Listaobavestenja.php';
include_once '../../Lekar/php/ListaTermina.php';
include_once '../../Lekar/php/Termin.php';
include_once '../../Lekar/php/ListaZakazanihTermina.php';
include_once '../../Lekar/php/ZakazanTermin.php';
include_once 'Slika.php';
include_once 'Komentar.php';


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
        $res=$con->query("INSERT INTO pacijent (jmbg, ime, prezime, broj_telefona, korisnicko_ime, sifra, email, brojPreuzetih, mesec)"
                . " VALUES "
                . "('$p->jmbg', '$p->ime', '$p->prezime', '$p->telefon', '$p->korisnickoIme', "
                . "'$p->sifra', '$p->email',0,".date("m").")");
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
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"],$row["mesec"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

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
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"],$row["mesec"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

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
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['bolest'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"],$row["mesec"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

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
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"],$row["mesec"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
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
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"],$row["mesec"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

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
                        $row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"],$row["mesec"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
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
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"],$row["mesec"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
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
public function vratiTegobuKorisnika($username)
{
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from tegobe where pacijent='$username' ");
        if ($res) {
            $tegoba = null;
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
				$tegoba=new Tegobe($row['pacijent'],$row['id'],$row['groznica'], $row['bolGrlo'],$row['kasalj'],
                                       $row['kijanje'],$row['curenje'],$row['komentar'],$row['doktorId'],$row['datum'],$row['vreme']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!

            }
            // zatvaranje objekta koji cuva rezultat
            
            return $tegoba;
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
          print ("Connection error (" . $con->connect_errno );
     }
     else{
     
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
public function azurirajPacijentuDijagnozuMedikamente($pacijent,$dijagnoza,$medikamenti,$doktor,$doza,$kontrola,$datum,$brojPreuzetih)
{
        $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);

    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno  );
    }
   else {

            $res = $con->query("update pacijent set dijagnoza='$dijagnoza', medikamenti='$medikamenti', doktor='$doktor', doza='$doza', kontrola='$kontrola', datum='$datum',brojPreuzetih=".($brojPreuzetih+1)." where id='$pacijent';");
           

           
          
        if ($res) {
         
        }
        else
        {
            print ("Query failed");
        }
        }
    
}
public function obrisiTegobePacijenta($id)
{
             $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("delete from tegobe where id = $id");
          if($res) 
          {
              
          }
        
        else
        {
            print ("Query failed");
        }
        }   
}
public function ubaciPacijentuDijagnozuMedikamente($pacijent,$dijagnoza,$medikamenti,$doktor,$Ime_PrezimePac,$datum,$vreme)
{
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("INSERT INTO dijagnoza (pacijent_username , dijagnoza, medikamenti, lekar, pacijent, datum, vreme) "
                . "VALUES('$pacijent', '$dijagnoza', '$medikamenti', '$doktor', '$Ime_PrezimePac', '$datum','$vreme')");
        if ($res) {
            
       
            
        }
        else
        {
            print ("Query failed");
        }
    }
}
public function vratiDijagnoze($username)
{
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from dijagnoza where pacijent_username='$username'");
        if ($res) {
            $niz = new ListaDijagnoza();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$dijagnoza=new Dijagnoza($row['id'],$row['pacijent_username'],$row['pacijent'], $row['dijagnoza'],$row['medikamenti'],
                                       $row['lekar'],$row['datum'],$row['vreme']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		$niz->dodajDijagnozu($dijagnoza);

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

    public function vratiDijagnozu($pacijent, $doktor, $datum) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from dijagnoza where pacijent_username='$pacijent' and lekar='$doktor' and datum='$datum'");
        if ($res) {
            $niz = new ListaDijagnoza();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            if ($row = $res->fetch_assoc()) {
				
		$dijagnoza=new Dijagnoza($row['id'],$row['pacijent_username'],$row['pacijent'], $row['dijagnoza'],$row['medikamenti'],
                                       $row['lekar'],$row['datum'],$row['vreme']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		

            }
            // zatvaranje objekta koji cuva rezultat
            //$res->close();
            return $dijagnoza;
        }
        else
        {
            print ("Query failed");
        }
    } 
    }
public function vratiObavestenja($username) {
     $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from obavestenje where id_lekara =(select id from doktor where korisnicko_ime='$username')");
        if ($res) {
       
            $niz = new ListaObavestenja();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$obavestenje=new Obavestenje($row['id'],$row['id_lekara'],$row['text_poruke'], $row['flag_vidjena'],$row['datum'],
                                       $row['vreme']);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
		$niz->dodajObavestenje($obavestenje);

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
public function obrisiObavestenje($id)
{
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("delete from obavestenje where id = $id");
          if($res) 
          {
              
          }
        
        else
        {
            print ("Query failed");
        }
        }  
}

public function vratiSveTermine() {
   $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from termini_pregleda");
        if ($res) {
            $niz = new ListaTermina();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$termin=new Termin($row['id'],$row['doktor_username'],$row['pacijent_username'], $row['dan'],$row['termin'],$row['flag_zauzeto']);
		$niz->dodajTermin($termin);
                
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

public function vratiTermineLekara($username) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from termini_pregleda where doktor_username='$username'");
        if ($res) {
            $niz = new ListaTermina();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$termin=new Termin($row['id'],$row['doktor_username'],$row['pacijent_username'], $row['dan'],$row['termin'],$row['flag_zauzeto']);
		$niz->dodajTermin($termin);
                
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
    
public function obrisiTermineLekara($username)
    {
        
         $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("delete from termini_pregleda where doktor_username = '$username'");
          if($res) 
          {
              
          }
        
        else
        {
            print ("Query failed");
        }
        }
    }

public function dodajTermineLekaraPrvaSmena($username) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) { print ("Connection error (" . $con->connect_errno . "): $con->connect_error"); }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("INSERT INTO termini_pregleda (doktor_username, pacijent_username, dan, termin, flag_zauzeto)"
                . " VALUES "
                . "('$username','null','Monday','08:00h - 08:30h',0),('$username','null','Monday','08:30h - 09:00h',0),('$username','null','Monday','09:00h - 09:30h',0),('$username','null','Monday','09:30h - 10:00h',0),('$username','null','Monday','10:00h - 10:30h',0),"
                . "('$username','null','Monday','10:30h - 11:00h',0),('$username','null','Monday','11:00h - 11:30h',0),('$username','null','Monday','11:30h - 12:00h',0),('$username','null','Tuesday','08:00h - 08:30h',0),('$username','null','Tuesday','08:30h - 09:00h',0),"
                . "('$username','null','Tuesday','09:00h - 09:30h',0),('$username','null','Tuesday','09:30h - 10:00h',0),('$username','null','Tuesday','10:00h - 10:30h',0),('$username','null','Tuesday','10:30h - 11:00h',0),('$username','null','Tuesday','11:00h - 11:30h',0),"
                . "('$username','null','Tuesday','11:30h - 12:00h',0),('$username','null','Wednesday','08:00h - 08:30h',0),('$username','null','Wednesday','08:30h - 09:00h',0),('$username','null','Wednesday','09:00h - 09:30h',0),('$username','null','Wednesday','09:30h - 10:00h',0),"
                . "('$username','null','Wednesday','10:00h - 10:30h',0),('$username','null','Wednesday','10:30h - 11:00h',0),('$username','null','Wednesday','11:00h - 11:30h',0),('$username','null','Wednesday','11:30h - 12:00h',0),('$username','null','Thursday','08:00h - 08:30h',0),"
                . "('$username','null','Thursday','08:30h - 09:00h',0),('$username','null','Thursday','09:00h - 09:30h',0),('$username','null','Thursday','09:30h - 10:00h',0),('$username','null','Thursday','10:00h - 10:30h',0),('$username','null','Thursday','10:30h - 11:00h',0),"
                . "('$username','null','Thursday','11:00h - 11:30h',0),('$username','null','Thursday','11:30h - 12:00h',0),('$username','null','Friday','08:00h - 08:30h',0),('$username','null','Friday','08:30h - 09:00h',0),('$username','null','Friday','09:00h - 09:30h',0),"
                . "('$username','null','Friday','09:30h - 10:00h',0),('$username','null','Friday','10:00h - 10:30h',0),('$username','null','Friday','10:30h - 11:00h',0),('$username','null','Friday','11:00h - 11:30h',0),('$username','null','Friday','11:30h - 12:00h',0),"
                . "('$username','null','Saturday','09:00h - 09:30h',0),('$username','null','Saturday','09:30h - 10:00h',0),('$username','null','Saturday','10:00h - 10:30h',0),('$username','null','Saturday','10:30h - 11:00h',0),('$username','null','Saturday','11:00h - 11:30h',0),"
                . "('$username','null','Saturday','11:30h - 12:00h',0),('$username','null','Sunday','10:00h - 10:30h',0),('$username','null','Sunday','10:30h - 11:00h',0),('$username','null','Sunday','11:00h - 11:30h',0),('$username','null','Sunday','11:30h - 12:00h',0);");
        if ($res) { }
        else { print ("Query failed"); }
    }
    }
    
public function dodajTermineLekaraDrugaSmena($username) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) { print ("Connection error (" . $con->connect_errno . "): $con->connect_error"); }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("INSERT INTO termini_pregleda (doktor_username, pacijent_username, dan, termin, flag_zauzeto)"
                . " VALUES "
                . "('$username','null','Monday','12:00h - 12:30h',0),('$username','null','Monday','12:30h - 13:00h',0),('$username','null','Monday','13:00h - 13:30h',0),('$username','null','Monday','13:30h - 14:00h',0),('$username','null','Monday','14:00h - 14:30h',0),"
                . "('$username','null','Monday','14:30h - 15:00h',0),('$username','null','Monday','15:30h - 16:00h',0),('$username','null','Tuesday','12:00h - 12:30h',0),('$username','null','Tuesday','12:30h - 13:00h',0),('$username','null','Tuesday','13:00h - 13:30h',0),"
                . "('$username','null','Tuesday','13:30h - 14:00h',0),('$username','null','Tuesday','14:00h - 14:30h',0),('$username','null','Tuesday','14:30h - 15:00h',0),('$username','null','Tuesday','15:00h - 15:30h',0),('$username','null','Tuesday','15:30h - 16:00h',0),"
                . "('$username','null','Wednesday','12:00h - 12:30h',0),('$username','null','Wednesday','12:30h - 13:00h',0),('$username','null','Wednesday','13:00h - 13:30h',0),('$username','null','Wednesday','13:30h - 14:00h',0),('$username','null','Wednesday','14:00h - 14:30h',0),"
                . "('$username','null','Wednesday','14:30h - 15:00h',0),('$username','null','Wednesday','15:00h - 15:30h',0),('$username','null','Wednesday','15:30h - 16:00h',0),('$username','null','Thursday','12:00h - 12:30h',0),('$username','null','Thursday','12:30h - 13:00h',0),"
                . "('$username','null','Thursday','13:00h - 13:30h',0),('$username','null','Thursday','13:30h - 14:00h',0),('$username','null','Thursday','14:00h - 14:30h',0),('$username','null','Thursday','14:30h - 15:00h',0),('$username','null','Thursday','15:00h - 15:30h',0),"
                . "('$username','null','Thursday','15:30h - 16:00h',0),('$username','null','Friday','12:00h - 12:30h',0),('$username','null','Friday','12:30h - 13:00h',0),('$username','null','Friday','13:00h - 13:30h',0),('$username','null','Friday','13:30h - 14:00h',0),"
                . "('$username','null','Friday','14:00h - 14:30h',0),('$username','null','Friday','14:30h - 15:00h',0),('$username','null','Friday','15:00h - 15:30h',0),('$username','null','Friday','15:30h - 16:00h',0),('$username','null','Saturday','12:00h - 12:30h',0),"
                . "('$username','null','Saturday','12:30h - 13:00h',0),('$username','null','Saturday','13:00h - 13:30h',0),('$username','null','Saturday','13:30h - 14:00h',0),('$username','null','Saturday','14:00h - 14:30h',0),('$username','null','Saturday','14:30h - 15:00h',0),"
                . "('$username','null','Sunday','12:00h - 12:30h',0),('$username','null','Sunday','12:30h - 13:00h',0),('$username','null','Sunday','13:00h - 13:30h',0),('$username','null','Sunday','13:30h - 14:00h',0);");
        if ($res) { }
        else { print ("Query failed"); }
    }
    }
    
public function vratiSveSlobodneTermine() {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from termini_pregleda where flag_zauzeto=0");
        if ($res) {
            $niz = new ListaTermina();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$termin=new Termin($row['id'],$row['doktor_username'],$row['pacijent_username'], $row['dan'],$row['termin'],$row['flag_zauzeto']);
		$niz->dodajTermin($termin);
                
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
    
public function vratiSveSlobodneTermineLekara($username) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from termini_pregleda where flag_zauzeto=0 and doktor_username='$username'");
        if ($res) {
            $niz = new ListaTermina();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$termin=new Termin($row['id'],$row['doktor_username'],$row['pacijent_username'], $row['dan'],$row['termin'],$row['flag_zauzeto']);
		$niz->dodajTermin($termin);
                
            }
            // zatvaranje objekta koji cuva rezultat
            
            return $niz;
        }
        else
        {
            print ("Query failed");
        }
    }
    }
    
public function vratiSveZakazaneTermine() {
   $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from zakazani_pregledi");
        if ($res) {
            $niz = new ListaZakazanihTermina();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$ztermin=new ZakazanTermin($row['id'],$row['doktor_username'],$row['pacijent_username']);
		$niz->dodajZakazanTermin($ztermin);
                
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

public function vratiZakazaneTermineLekara($username) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from termini_pregleda where flag_zauzeto=1 and doktor_username='$username'");
        if ($res) {
            $niz = new ListaTermina();
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$termin=new Termin($row['id'],$row['doktor_username'],$row['pacijent_username'], $row['dan'],$row['termin'],$row['flag_zauzeto']);
		$niz->dodajTermin($termin);
                
            }
            // zatvaranje objekta koji cuva rezultat
            
            return $niz;
        }
        else
        {
            print ("Query failed");
        }
    }
    }
    
public function obrisiZakazaneTermineLekara($username)
    {
        
         $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("delete from zakazani_pregledi where doktor_username = '$username'");
          if($res) 
          {
              
          }
        
        else
        {
            print ("Query failed");
        }
        }
    }
    
public function obrisiZakazanTerminLekaraIPacijenta($lekar,$pacijent)
    {
        
         $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("delete from zakazani_pregledi where doktor_username = '$lekar' and pacijent_username='$pacijent'");
          if($res) 
          {
              
          }
        
        else
        {
            print ("Query failed");
        }
        }
    }
    
public function zakaziTerminLekaraIPacijenta($lekar,$pacijent) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("INSERT INTO zakazani_pregledi (doktor_username, pacijent_username)"
                . " VALUES "
                . "('$lekar','$pacijent');");
        if ($res) {
            
        }
        else
        {
            print ("Query failed");
        }
    }
    }

    public function proveraZakazaniTermin($pacijent) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("select * from pacijent where korisnicko_ime=(select pacijent_username from zakazani_pregledi where pacijent_username='$pacijent')");
 
        if ($res) {
            $pacijent=null;
            if($row = $res->fetch_assoc())
            {
            $pacijent=new Pacijent($row['id'],$row['ime'],$row['prezime'], $row['jmbg'],$row['broj_telefona'],
                                       $row['email'],$row['korisnicko_ime'],$row['sifra'],$row['hronicniBolesnik'],$row['dijagnoza'],$row['medikamenti'],$row['doktor'],$row["doza"],$row["kontrola"],$row["datum"],$row["brojPreuzetih"],$row["mesec"]);// TODO: DODATI KOD ZA SMESTANJE PODATAKA U ASOCIJATIVNI NIZ!!!!
            }
            return $pacijent;
        }
        else
        {
            print ("Query failed");
        }
    }  
    }

    public function vratiDoktorId($pacijent) {
      $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("select * from zakazani_pregledi where  pacijent_username='$pacijent';");
 
        if ($res) {
            $doktor=null;
            if($row = $res->fetch_assoc())
            {
                $doktor=$row["doktor_username"];
           
            }
            return $doktor;
        }
        else
        {
            print ("Query failed");
        }
    }    
    }

    public function zakaziTermin($pacijent, $doktor, $dan, $termin) {
        
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
        $res = $con->query("update termini_pregleda set pacijent_username='$pacijent', flag_zauzeto='1'"
                    . "where doktor_username='$doktor' and dan='$dan' and termin='$termin';");
           
          
        if ($res) {
          $res = $con->query("delete from zakazani_pregledi where pacijent_username='$pacijent';");
          
        }
        else
        {
            print ("Query failed");
        }
        }
    }

    public function unesiOcenu($pacijent,$lekar, $ocena) {
         $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res=$con->query("select * from ocene_lekara where pacijent='$pacijent' and lekar='$lekar';");
        
        if($res->num_rows==0)
        {
            $res=$con->query("INSERT INTO ocene_lekara (pacijent, lekar, ocena)"
                . " VALUES "
                . "('$pacijent','$lekar','$ocena');");
        }
        else
        {
             $res=$con->query("update  ocene_lekara set ocena='$ocena' where lekar='$lekar' and pacijent='$pacijent'");
        }
        if ($res) {
            
        }
        else
        {
            print ("Query failed");
        }
    }
        
    }

    public function vratiOcene() {
  
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from ocene_lekara");
        if ($res) {
            $niz = [];
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		
                $ocena=new Ocena($row["id"],$row["pacijent"],$row["lekar"],$row["ocena"]);
                $niz[]=$ocena;
                
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

    public function vratiZauzeteTermineLekara($username) {
           $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from termini_pregleda where doktor_username='$username' and flag_zauzeto='1';");
        if ($res) {
            $niz =[];
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		$termin=new ZakazaniTerminPregled($row["dan"],$row["termin"]);
                $korisnik=$row["pacijent_username"];
                $res1 = $con->query("select * from pacijent where korisnicko_ime='$korisnik';");
                if($res1)
                {
                    if($row = $res1->fetch_assoc())
                    $termin->setujOstaleVrednosti($row["ime"], $row["prezime"], $row["jmbg"], $row["broj_telefona"], $row["email"]);
                }
                else
                {
                    print ("Query failed");
                }
		$niz[]=$termin;
                
            }
            // zatvaranje objekta koji cuva rezultat
            
            return $niz;
        }
        else
        {
            print ("Query failed");
        }
    }
    }

    public function ubaciSliku($slika, $opis) {
        $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("INSERT INTO slike (slika, opis)"
                . " VALUES "
                . "('". $slika. "','$opis');");
        if ($res) {
            
        }
        else
        {
            print ("Query failed");
        }
    }
        
    }

    public function vratiSveSlike() {
        
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from slike");
        if ($res) {
            $niz = [];
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		
                $slika=new Slika($row["id"], $row["slika"], $row["opis"]);
                $niz[]=$slika;
                
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
public function vratiKorisnikaupdatePacijentuMesecIBrPreuzetih($username,$mesec,$brPreuzetih)
{
    
       $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
   else {
            // $res je rezultat izvrsenja upita
            $res = $con->query("update pacijent set mesec='$mesec', brojPreuzetih=$brPreuzetih where korisnicko_ime = '$username'");
           
          
        if ($res) {
         
        }
        else
        {
            print ("Query failed");
        }
        }
}
    public function ubaciKomentar($pacijent, $komentar, $datum, $vreme) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        
        $res=$con->query("INSERT INTO komentari (pacijent, komentar, datum, vreme)"
                . " VALUES "
                . "('$pacijent','$komentar','$datum','$vreme');");
        if ($res) {
            
        }
        else
        {
            print ("Query failed");
        }
    }
    }

    public function vratiSveKomenatare($pacijent) {
    $con = new mysqli(self::db_host, self::db_username, self::db_password, self::db_name);
    if ($con->connect_errno) {
        // u slucaju greske odstampati odgovarajucu poruku
        print ("Connection error (" . $con->connect_errno . "): $con->connect_error");
    }
    else {
        // $res je rezultat izvrsenja upita
        $res = $con->query("select * from komentari where not pacijent='$pacijent'");
        if ($res) {
            $niz = [];
            // fetch_assoc() pribavlja jedan po jedan red iz rezulata 
			// u redosledu u kom ga je vratio db server
            while ($row = $res->fetch_assoc()) {
				
		
            $komentar=new Komentar($row["id"], $row["pacijent"], $row["komentar"], $row["datum"],$row["vreme"]);
            $niz[]=$komentar;
                
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





