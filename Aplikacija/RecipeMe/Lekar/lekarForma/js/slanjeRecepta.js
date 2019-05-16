const imePacijenta=document.getElementById("ime");
const prezimePacijenta=document.getElementById("prezime");
const jmbgPacijenta=document.getElementById("jmbg");
const telefonPacijenta=document.getElementById("telefon");
const emailPacijenta=document.getElementById("email");
const naslov=document.getElementById("naslov");
const imeDoktora=document.getElementById("imeDoktora");
const prezimeDoktora=document.getElementById("prezimeDoktora");
const telefonDoktora=document.getElementById("telefonDoktora");
const emailDoktora=document.getElementById("emailDoktora");
const posaljiDugme = document.getElementById("send");
const dijagnoza = document.getElementById("dijagnoza");
const medikamenti = document.getElementById("medikamenti"); 
posaljiDugme.onclick=(ev)=>posaljiReceptPacijentu(ev);



prikaziPacijenta();
prikaziLekara();

var PacijentGlobal;
var DoktorGlobal;

function prikaziDijagnozu()
{
   const formData=new FormData();
   var url_string = window.location.href;
   var url = new URL(url_string);
   
   var patName= url.searchParams.get("patName");
    let date=new Date();
   let datum=date.getFullYear()+"-"+"0"+date.getMonth()+"-"+date.getDate();
   let doktor=DoktorGlobal.ime+" "+DoktorGlobal.prezime;
   formData.append("pacijent",patName);
   formData.append("doktor",doktor);
   formData.append("datum",datum);
   const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    
   fetch("../php/vratiDijagnozu.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then((dijagnoza)=>popuniDijagnozu(dijagnoza))
           .catch(error => console.log(error));
    
}
function popuniDijagnozu(d)
{
    dijagnoza.innerHTML="Diagnosis: "+d.dijagnoza;
    medikamenti.innerHTML="Medicines: "+d.medikamenti;
}
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


function PodaciPacijenta(pacijent)
{
    PacijentGlobal=pacijent;
    imePacijenta.innerHTML="Name: "+pacijent.ime;
    prezimePacijenta.innerHTML="Surname: "+pacijent.prezime;
    jmbgPacijenta.innerHTML="SSN: "+pacijent.jmbg;
    telefonPacijenta.innerHTML="Contact: "+pacijent.telefon;
    emailPacijenta.innerHTML="Email: "+pacijent.email;
    naslov.innerHTML=pacijent.ime+" "+pacijent.prezime+"<br>"+pacijent.jmbg;
    
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



function Lekar(lekar)
{
    imeDoktora.innerHTML="Name: "+lekar.ime;
    prezimeDoktora.innerHTML="Surname: "+lekar.prezime;
    telefonDoktora.innerHTML="Expertise: "+lekar.zvanje;
    emailDoktora.innerHTML="Email: "+lekar.email;
    DoktorGlobal=lekar;
    prikaziDijagnozu();
}



function prikaziModal()
{
    $('#sendEmailConfirmModal').modal('show');
}
function posaljiRecept(dugme)
{
    if(PacijentGlobal.brojPreuzetih > 100)
    {
        // ako se predje limit sa brojem poslatih recepata 
        // da iskoci neko upozorenje Lekaru i da se pacijentu posalje neki mail mora da se smisli sta i kako 
    }
    else
    {
        posaljiReceptPacijentu();
    }
    
    
}

function posaljiReceptPacijentu()
{
   
    let content=$('#sendDiv').html();
    const formData=new FormData();
    formData.append("naziv","RecipeMe_Prescription_01_"+Math.random());
    formData.append("email",PacijentGlobal.email);
    formData.append("data",content);
    const fetchData={
        method: "POST",
        body: formData
      
    };
    
    fetch('../../Pacijent/php/sendEmail.php',fetchData)
            .then(response =>{
                if(!response.ok)
                throw new Error(response.statusText);
    }).then(()=>{})
            .catch(error => console.log(error));
    obavestiLekara();
}
function obavestiLekara()
{
document.getElementById("notificationDiv").innerHTML=" <h1 class='h3 mb-2 text-gray-800'>Prescription</h1><div class='alert alert-success' role='alert'>\n\
<h4 class='alert-heading'>Well done!</h4>\n\
<p>Patient will soon receive a precsription on the email.</p><hr>\n\
<p class='mb-0'>\n\
Due to overloading the network, it may take a while.\n\
</p></div>";
 document.getElementById("sendDiv").innerHTML="";
}

function preview()
{
     let myu=podesiVrednost("docName");
    var url_safe_username = encodeURIComponent(myu);
    myu=podesiVrednost("patName");
    var url_safe_username2= encodeURIComponent(myu);
    //window.open("prepisiRecept.html","_self");
    window.open("gotovRecept.html?docName="+ url_safe_username+ "&patName="+ url_safe_username2,"_self");
}
function podesiVrednost(string)
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get(string);
    return username;
}


