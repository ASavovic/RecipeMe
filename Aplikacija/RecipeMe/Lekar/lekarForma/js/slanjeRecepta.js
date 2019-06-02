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

var qrcode = new QRCode("qrCode", {
    text: "https://www.zdravlje.gov.rs/",
    width: 50,
    height: 50,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

prikaziPacijenta();
prikaziLekara();

var PacijentGlobal;
var DoktorGlobal;

function prikaziDijagnozu()
{
  let diagnosis=podesiVrednost("diagnosis");
  let medicines=podesiVrednost("medicines");
  dijagnoza.innerHTML="Diagnosis: "+diagnosis;
  medikamenti.innerHTML="Medicines: "+medicines;
    
}

function prikaziPacijenta(){
   const formData=new FormData();
  
   var docName=sessionStorage.getItem("name");
   var patName=sessionStorage.getItem("patName");
   
   formData.append("username",patName);
   
   
    const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    
   fetch("../../../Pacijent/php/vratiPacijenta.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(pacijent=>PodaciPacijenta(pacijent))
           .catch(error => console.log(error));
    
}


function PodaciPacijenta(pacijent)
{
    let date=new Date();
    let datum=date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+date.getDate();
    PacijentGlobal=pacijent;
    imePacijenta.innerHTML="Name: "+pacijent.ime;
    prezimePacijenta.innerHTML="Surname: "+pacijent.prezime;
    jmbgPacijenta.innerHTML="SSN: "+pacijent.jmbg;
    //telefonPacijenta.innerHTML="Contact: "+pacijent.telefon;
    //emailPacijenta.innerHTML="Email: "+pacijent.email;
    naslov.innerHTML="Name Surname: "+pacijent.ime+" "+pacijent.prezime+"<br>Date: "+datum;
    naslov.style.font="24px";
    let barkod=pacijent.jmbg+Math.random();
    JsBarcode("#barcode",barkod);

    
}

function prikaziLekara()
{
   const formData=new FormData();
 
   var docName=sessionStorage.getItem("name");
   var patName=sessionStorage.getItem("patName");
   
   formData.append("username",docName);
   
   
    const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    
   fetch("../../../Pacijent/php/vratiLekara.php",fetchData).then(response=>
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
    formData.append("naziv","RecipeMe_Prescription_"+Math.random());
    formData.append("email",PacijentGlobal.email);
    formData.append("data",content);
    const fetchData={
        method: "POST",
        body: formData
      
    };
    
    fetch('../../../Pacijent/php/sendEmail.php',fetchData)
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
 //document.getElementById("sendDiv").innerHTML="";
 setTimeout(obrisiZahtev,1500);
}
function obrisiZahtev()
{
    var id=podesiVrednost("id");
    const formData = new FormData();
    formData.append("id", id);
    const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../../php/obrisiTegobePacijenta.php", fetchData)
    .then(response => {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    }).then(()=>{ window.open("../html/index.html","_self");}).catch(error => console.log(error)); 
   
    
}
function preview()
{
    
    window.open("gotovRecept.html","_self");
}
function podesiVrednost(string)
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get(string);
    return username;
}


