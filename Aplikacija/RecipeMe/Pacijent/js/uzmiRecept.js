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
//dugme
const dugme=document.getElementById("take");
dugme.onclick =(ev)=> preuzmiRecept();
var korisnik;

popuniRecept();
function preuzmiRecept()
{

   
    var date=new Date();
    let nizVrednosti=korisnik.datum.split("-");
    if(parseInt(nizVrednosti[2],10)>date.getFullYear() && ((parseInt(nizVrednosti[1],10)+parseInt(korisnik.kontrola,10))%12)>date.getMonth()) 
    {
           document.getElementById("card").innerHTML="We are sorry, but you need to visit the doctor.";
           document.getElementById("take").style.display = 'none';
           return;
    }
    else if(korisnik.brojPreuzetih>=korisnik.doza)
    {
         document.getElementById("card").innerHTML="We are sorry, but you need to wait for new Month.";
         document.getElementById("take").style.display = 'none';
         return;
    }
    
    let content=$('#sendDiv').html();
    const formData=new FormData();
    formData.append("naziv",korisnik.korisnickoIme+Math.random());
    formData.append("email",korisnik.email);
    formData.append("data",content);
    const fetchData={
        method: "POST",
        body: formData
      
    };
    obavestiPacijenta();//kako ne bi bezrazlozno cekao
    fetch('../php/sendEmail.php',fetchData)
            .then(response =>{
                if(!response.ok)
                throw new Error(response.statusText);
    }).then(()=>{})
            .catch(error => console.log(error));
   
   korisnik.brojPreuzetih++;
   azurirajPacijenta(korisnik);
     
     



}
function azurirajPacijenta(korisnik)
{
    const formData=new FormData();
    formData.append("name",username);
    formData.append("broj",korisnik.brojPreuzetih);
    const fetchData={
        method: "POST",
        body: formData
    };
    
    fetch("../php/izmeniBrojPreuzetih.php",fetchData)
            .then(response =>{
                if(!response.ok)
                throw new Error(response.statusText);
    }).then(()=>{})
            .catch(error => console.log(error));
} 
function obavestiPacijenta()
{
document.getElementById("notificationDiv").innerHTML=" <h1 class='h3 mb-2 text-gray-800'>Prescription</h1><div class='alert alert-success' role='alert'>\n\
<h4 class='alert-heading'>Well done!</h4>\n\
<p>You will soon receive a precsription on the email.</p><hr>\n\
<p class='mb-0'>\n\
Due to overloading the network, it may take a while.\n\
</p></div>";
}
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
   korisnik=pacijent;
    if(pacijent.hronicniBolesnik==1)
        { 
             ime.innerHTML="Name: "+pacijent.ime;
             prezime.innerHTML="Surname: "+pacijent.prezime;
             jmbg.innerHTML="SSN: "+pacijent.jmbg;
             telefon.innerHTML="Contact: "+pacijent.telefon;
             email.innerHTML="Email: "+pacijent.email;
             dijagnoza.innerHTML="Diagnosis: "+pacijent.dijagnoza;
             medikamenti.innerHTML="Medicines: "+pacijent.medikamenti;
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

