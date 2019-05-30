const div=document.getElementById("zakazivanjePregleda");
const dan=document.getElementById("dan");
const termin=document.getElementById("termin");
const dugmeProvere=document.getElementById("zakazi");
const dugmeZakazi=document.getElementById("zakaziTermin");

var url_string = window.location.href;
var url = new URL(url_string);
var username = url.searchParams.get("name");
var listaTermina;
var izabraniDoktor;
var korisnik;
var korisnik2;

proveriStatus();
dan.onchange=()=> ucitajSlobodneTermine();
dugmeProvere.onclick=()=> provera();
dugmeZakazi.onclick=()=> zakaziTermin();
proveriBrojPreuzetihRecepata();

function zakaziTermin()
{
    $('#confirmModal').modal('hide');
    const formData=new FormData();
    formData.append("pacijent",username);
    formData.append("doktor",izabraniDoktor);
    formData.append("dan",dan.value);
    formData.append("termin",termin.value);
    
    const fetchData = {
        method:"POST",
        body: formData
    };
    fetch("../php/zakaziTerminKodDoktora.php",fetchData)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
      
           

    }).then(() => obavestiPacijenta())
    .catch(error => console.log(error)); 
    
}
function obavestiPacijenta()
{
    $('#okModal').modal('show');
   div.innerHTML="There are no new announcements at this time.";
   posaljiMejlPacijentu();
}
function posaljiMejlPacijentu()
{
    const formData=new FormData();
    formData.append("username",username);
    const fetchData ={
        method: "POST",
        body: formData
    }
     fetch('../php/vratiPacijenta.php',fetchData)
   .then(response =>
   {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();
      
           

    }).then((pacijent) => posaljiMejl(pacijent))
    .catch(error => console.log(error)); 
    
        
}
function posaljiMejl(pacijent)
{
    korisnik=pacijent;
    const formData = new FormData();
    formData.append("email",pacijent.email);
    formData.append("ime",pacijent.ime);
    formData.append("prezime",pacijent.prezime);
    let textPoruke="Uspesno ste zakazali termin "+dan.value+" - "+termin.value+".";
    formData.append("txtPoruke",textPoruke);
    const fetchData ={
        method: "POST",
        body: formData
    }
     fetch('../../Lekar/php/notifyPatient.php',fetchData)
   .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
      
      
           

    }).then(() => {})
    .catch(error => console.log(error)); 
    
    
}
function provera()
{
    if(dan.value=="" && termin.value=="")
    {
        $('#warningModalSve').modal('show');
    }
    else if(dan.value=="")
        $('#warningModalDan').modal('show');
    else if(termin.value=="")
        $('#warningModalTermin').modal('show');
    else
        $('#confirmModal').modal();
}
function ucitajSlobodneTermine()
{
    let d=dan.value;
    ocistiSelect();
    for(let i=0;i<listaTermina.termini.length;i++)
    {   
        if(listaTermina.termini[i].dan===d)
        {
            let el=document.createElement("option");
            el.value=listaTermina.termini[i].termin;
            el.innerHTML=listaTermina.termini[i].termin;
            termin.appendChild(el);
        }
    };
    
}
function ocistiSelect()
{
    termin.innerHTML="";
}
function proveriStatus()
{
       fetch("../php/zakazano.php?name="+username)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then(pacijent =>prikaziRezultat(pacijent))
    .catch(error => console.log(error)); 
}

function prikaziRezultat(pacijent)
{
   
   if(pacijent==null)
   {
       
       div.innerHTML="There are no new announcements at this time.";
       proveriDaLiJeVremeZaKontrolu();
   }
   else
   {
       nabaviTermine();
       prikaziTabeluTermina();
   }
   
}
function nabaviTermine()
{
     fetch("../php/vratiZakazaniPregledDoktor.php?name="+username)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then((doktroId) => napuniListuTermina(doktroId))
    .catch(error => console.log(error)); 
    
}
function napuniListuTermina(doktorId)
{
    izabraniDoktor=doktorId;
     fetch("../php/vratiListuTermina.php?name="+doktorId)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then((lista) => dodeliListuTermina(lista))
    .catch(error => console.log(error)); 
}
function dodeliListuTermina(lista)
{
    listaTermina=lista;
}

function proveriBrojPreuzetihRecepata()
{
    
    const formData=new FormData();
    formData.append("username",username);
    const fetchData ={
        method: "POST",
        body: formData
    }
     fetch('../php/vratiPacijenta.php',fetchData)
   .then(response =>
   {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();
    }).then((pacijent) => ProveriMesec(pacijent))
    .catch(error => console.log(error));
    
}
function ProveriMesec(pacijent)
{
    
    var d = new Date();
    let month=d.getMonth()+1;//getMonth vraca za mesece pocev od 0 zato je +1 u php vraca od 1
    if(parseInt(pacijent.mesec, 10)!==month)
    {
        const formData=new FormData();
    formData.append("username",username);
    formData.append("mesec",month);
    const fetchData ={
        method: "POST",
        body: formData
    }
     fetch('../php/updatePacijentuMesecIBrPreuzetih.php',fetchData)
    .catch(error => console.log(error));
    }
}
function proveriDaLiJeVremeZaKontrolu()
{
     const formData = new FormData();
    formData.append("username",username);
    const fetchData={
          method:"POST",
          body: formData
        };
        fetch("../php/vratiPacijenta.php",fetchData)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then((pacijent)=>pikaziKontrolu(pacijent))
            .catch(error => console.log(error));
}
function pikaziKontrolu(pacijent)
{
    var date=new Date();
    let nizVrednosti=pacijent.datum.split("-");
    if(parseInt(nizVrednosti[2],10)<=date.getFullYear() &&((parseInt(nizVrednosti[1],10)+parseInt(pacijent.kontrola,10))%12)<=date.getMonth()) 
    {
           
         
        div.innerHTML="It is time for your regular control review. You need to visit a doctor soon as possible. \n\
By clicking the button below, a request for review will be automatically sent. \n\
You will receive a notification soon for selecting time for an appointment ";
        div2=document.createElement("div");
        div2.setAttribute("class","col-lg-4 offset-lg-8");
        div2.setAttribute("style","padding-top:10px;");
        D=document.createElement("button");
        D.innerHTML="Send";
        D.id="noviZahtev";
        D.setAttribute("class","btn btn-primary  ");
        D.setAttribute("style","width:250px; float:right;");
        div2.appendChild(D);
        div.appendChild(div2);
        document.getElementById("noviZahtev").onclick=(ev)=>zakaziPregled(pacijent,"Control Review");
       // document.getElementById("take").style.display = 'none';
        return;
    }
    
}
function zakaziPregled(korisnik,comment)
{
   
   //$('#sendIt').modal('hide');
   var url_string = window.location.href;
   var url = new URL(url_string);
   const formData = new FormData();
   var today = new Date();
   var datum=today.getDate()+"."+today.getMonth()+"."+today.getFullYear()+".";
   var vreme=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
   formData.append("pacijent",korisnik.korisnickoIme);
   formData.append("komentar",comment);
   formData.append("date",datum);
    formData.append("time",vreme);
     
        const fetchData =
            {
                method:"POST",
                body: formData
            }
       fetch("../php/updateTegobe.php",fetchData)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);

    }).catch(error => console.log(error));
    obavestiPacijentaPregled();
     //$('#okModal').modal('show');
}
function obavestiPacijentaPregled()
{
document.getElementById("zakazivanjePregleda").innerHTML=" <h1 class='h3 mb-2 text-gray-800'></h1><div class='alert alert-success' role='alert'>\n\
<h4 class='alert-heading'>Well done!</h4>\n\
<p>Request successfully sent. You will receive a notification soon for selecting time for an appointment.</p><hr>\n\
<p class='mb-0'>\n\
Due to overloading the network, it may take a while.\n\
</p></div>";
}