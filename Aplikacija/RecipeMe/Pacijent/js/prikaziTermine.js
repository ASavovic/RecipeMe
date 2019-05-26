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
    if(parseInt(pacijent.mesec, 10)!=month)
    {
        const formData=new FormData();
    formData.append("username",username);
    formData.append("mesec",month);
    const fetchData ={
        method: "POST",
        body: formData
    }
     fetch('../php/updatePacijentuMesecIBrPreuzetih.php',fetchData)
   .then(response => ProveriBrPreuzetih(pacijent))
    .catch(error => console.log(error));
    }
}
function ProveriBrPreuzetih(pacijent)
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
      
           

    }).then((pacijent) => daLiMozePreuzimaRecepte(pacijent))
    .catch(error => console.log(error));
}
function daLiMozePreuzimaRecepte(pacijent)
{
    if(pacijent.brojPreuzetih>=6)//5 je max broj recepata koje pacijent moze da preuzme
    {
        div.innerHTML="You have taken a monthly limited number of prescriptions. If you need more prescriptions please visit a doctor. \n\
By clicking the button below, a request for review is automatically sent. \n\
You will receive a notification soon for selecting time for an appointment "
    }
}