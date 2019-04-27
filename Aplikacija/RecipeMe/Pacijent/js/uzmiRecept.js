//doktor
const doktorIme=document.getElementById("imeDoktora");
const doktorPrezime=document.getElementById("prezimeDoktora");
const doktorEmail=document.getElementById("emailDoktora");
//pacijent
const ime=document.getElementById("ime");
const prezime=document.getElementById("prezime");
const jmbg=document.getElementById("jmbg");
const telefon=document.getElementById("telefon");
const email=document.getElementById("email");
//dijagnoza
const dijagnoza=document.getElementById("dijagnoza");
const medikamenti=document.getElementById("medikamenti");
//logovani korisnik
var url_string = window.location.href;
var url = new URL(url_string);
var username = url.searchParams.get("name");
var korisnik;
popuniRecept();

function popuniRecept()
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

    }).then((pacijent)=>popuniPoljaPacijent(pacijent))
            .catch(error => console.log(error));
    
    
}
function popuniPoljaPacijent(pacijent)
{
  
    if(pacijent.hronicniBolesnik==1)
        { 
             ime.innerHTML="Name: "+pacijent.ime;
             prezime.innerHTML="Surname: "+pacijent.prezime;
             jmbg.innerHTML="SSN: "+pacijent.jmbg;
             telefon.innerHTML="Contact: "+pacijent.telefon;
             email.innerHTML="Email: "+pacijent.email;
             dijagnoza.value=pacijent.dijagnoza;
             dijagnoza.readOnly=true;
             medikamenti.value=pacijent.medikamenti;
             medikamenti.readOnly=true;
             popuniLekara(pacijent.doktor);
        }
        else
            {
                document.getElementById("card").innerHTML="We are sorry but you do not have the status of a chronic patient."
               
                document.getElementById("take").style.display = 'none';
             }
}
function popuniPoljaLekar(lekar)
{
    doktorIme.innerHTML="Name: "+lekar.ime;
    doktorPrezime.innerHTML="Surname: "+lekar.prezime;
    doktorEmail.innerHTML="Email: "+lekar.email;
}
function  popuniLekara(doktor)
{
    const formDataNew = new FormData();
    formDataNew.append("username",doktor);
    const fetchDataNew={
          method:"POST",
          body: formDataNew
        };
        fetch("../php/vratiLekara.php",fetchDataNew)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then((lekar)=>popuniPoljaLekar(lekar))
            .catch(error => console.log(error));
}

