const pacijent=null;
document.body.onload = myFunction();

function myFunction(){
        
    var url_string =window.location.href;
    var url = new URL(url_string);
    var name = url.searchParams.get("name");
    console.log(name);
            fetch("../php/indexPacijent.php?name="+name)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then(pacijent =>prikaziPacijenta(pacijent))
    .catch(error => console.log(error)); 
    
    
}

function prikaziPacijenta(pacijent){
    const ime=document.getElementById("ime");
    const prezime=document.getElementById("prezime");
    const jmbg=document.getElementById("jmbg");
    const hronicni=document.getElementById("hronicni");
    const email=document.querySelector("input[name='email']");
    const telefon=document.querySelector("input[name='telefon']");
    ime.value=pacijent.ime;
    ime.readOnly=true;
    prezime.value=pacijent.prezime;
    prezime.readOnly=true;
    jmbg.value=pacijent.jmbg;
    jmbg.readOnly=true;
    email.value=pacijent.email;
    email.readOnly=true;
    telefon.value=pacijent.telefon;
    telefon.readOnly=true;
    let bolesnik="";
    if(pacijent.hronicniBolesnik==0)
        bolesnik="No";
    else
        bolesnik="Yes";
    hronicni.value=bolesnik;
    hronicni.readOnly=true;
   
}

const ime=document.getElementById("ime");
const prezime=document.getElementById("prezime");
const jmbg=document.getElementById("jmbg");
const hronicni=document.getElementById("hronicni");
const dugmePregled=document.getElementById("pregled");
const dugmeIzlaz=document.getElementById("izlaz");


dugmePregled.onclick =(ev) => otvoriNovuStranicu();
dugmeIzlaz.onclick =(ev) => odjaviSe();
function otvoriNovuStranicu()
{
    window.open("zakazivanjePregleda.html");
}
function odjaviSe(){

}
function popuniFormu(){
     const ime=document.getElementById("ime");
    const prezime=document.getElementById("prezime");
    const jmbg=document.getElementById("jmbg");
    const hronicni=document.getElementById("hronicni");
    ime.innerHTML="Name: "+pacijent.ime;
    prezime.innerHTML="Surname: "+pacijent.prezime;
    jmbg.innerHTML="SSN: "+pacijent.jmbg;
    hronicni.innerHTML="Chronic patient: "+pacijent.hronicniBolesnik;
}



