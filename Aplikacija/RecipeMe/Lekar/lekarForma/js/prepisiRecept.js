prikaziPacijenta();
prikaziLekara();
var PacijentGlobal;
var DoktorGlobal;
function prikaziPacijenta(){
   const formData=new FormData();
   var url_string = window.location.href;
   var url = new URL(url_string);
   var docName = url.searchParams.get("docName");
   var patName= url.searchParams.get("patName");
   
   formData.append("username",patName);
   
   
    const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    
   fetch("../../Pacijent/php/vratiPacijenta.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(pacijent=>PodaciPacijenta(pacijent))
           .catch(error => console.log(error));
    
}

const imePacijenta=document.getElementById("ime");
const prezimePacijenta=document.getElementById("prezime");
const jmbgPacijenta=document.getElementById("jmbg");
const telefonPacijenta=document.getElementById("telefon");
const emailPacijenta=document.getElementById("email");
function PodaciPacijenta(pacijent)
{
    imePacijenta.innerHTML="Name: "+pacijent.ime;
    prezimePacijenta.innerHTML="Surname: "+pacijent.prezime;
    jmbgPacijenta.innerHTML="SSN: "+pacijent.jmbg;
    telefonPacijenta.innerHTML="Contact: "+pacijent.telefon;
    emailPacijenta.innerHTML="Email: "+pacijent.email;
    PacijentGlobal=pacijent;
}

function prikaziLekara()
{
       const formData=new FormData();
   var url_string = window.location.href;
   var url = new URL(url_string);
   var docName = url.searchParams.get("docName");
   var patName= url.searchParams.get("patName");
   
   formData.append("username",docName);
   
   
    const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    
   fetch("../../Pacijent/php/vratiLekara.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(lekar=>Lekar(lekar))
           .catch(error => console.log(error));
    
}

const imeDoktora=document.getElementById("imeDoktora");
const prezimeDoktora=document.getElementById("prezimeDoktora");
const telefonDoktora=document.getElementById("telefonDoktora");
const emailDoktora=document.getElementById("emailDoktora");

function Lekar(lekar)
{
    imeDoktora.innerHTML="Name: "+lekar.ime;
    prezimeDoktora.innerHTML="Surname: "+lekar.prezime;
    telefonDoktora.innerHTML="Expertise: "+lekar.zvanje;
    emailDoktora.innerHTML="Email: "+lekar.email;
    DoktorGlobal=lekar;
}


const posaljiDugme = document.getElementById("send");
const dijagnoza = document.getElementById("dijagnoza");
const medikamenti = document.getElementById("medikamenti"); 

posaljiDugme.onclick = (ev)=> posaljiRecept(ev.target);

function posaljiRecept(dugme)
{
    if(PacijentGlobal.brojPreuzetih > 10)
    {
        // ako se predje limit sa brojem poslatih recepata 
        // da iskoci neko upozorenje Lekaru i da se pacijentu posalje neki mail mora da se smisli sta i kako 
    }
    else
    {
    let dijagnozaText=dijagnoza.value;
    let medikamentiText=medikamenti.value;
    const formData=new FormData();
        let date=new Date();
        let datum=date.getFullYear()+"-"+"0"+date.getMonth()+"-"+date.getDate();
        formData.append("emailPacijenta",PacijentGlobal.email);
        formData.append("Ime_PrezimePac",PacijentGlobal.ime+" "+PacijentGlobal.prezime);
        formData.append("pacijent",PacijentGlobal.id);
        formData.append("brojPreuzetih",PacijentGlobal.brojPreuzetih);
        formData.append("dijagnoza",dijagnozaText);
        formData.append("medikamenti",medikamentiText);
        formData.append("doktor",DoktorGlobal.korisnickoIme);
        formData.append("doza",PacijentGlobal.doza);
        formData.append("kontrola",PacijentGlobal.kontrola);
        formData.append("datum",datum);
        
        const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    fetch("../php/azurirajPacijentuDijagnozuMedikamente.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       
   }).catch(error => console.log(error));   
    
    }
}