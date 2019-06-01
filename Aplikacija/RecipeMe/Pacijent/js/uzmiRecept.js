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
const naslov=document.getElementById("naslov");
//logovani korisnik
var username = sessionStorage.getItem("name");
//dugme
const dugme=document.getElementById("take");
dugme.onclick =(ev)=> preuzmiRecept();
var korisnik;
var qrcode = new QRCode("qrCode", {
    text: "https://www.zdravlje.gov.rs/",
    width: 50,
    height: 50,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

popuniRecept();

function preuzmiRecept()
{
if(korisnik.brojPreuzetih>=korisnik.doza)
    {
             naslov.innerHTML="Notification";
 document.getElementById("qrCode").innerHTML=" ";
         kartica=document.getElementById("card");
         document.getElementById("take").style.display = 'none';
                 kartica.innerHTML="You have taken a monthly limited number of prescriptions. If you need more prescriptions please visit a doctor. \n\
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
        kartica.appendChild(div2);
        document.getElementById("noviZahtev").onclick=(ev)=>zakaziPregled("Need more doses");
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
   
   
   azurirajPacijenta(korisnik);
     
     



}
function azurirajPacijenta(korisnik)
{
    const formData=new FormData();
    formData.append("name",username);
    formData.append("broj",++korisnik.brojPreuzetih);
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
   const formData=new FormData();
   let date=new Date();
   let datum=date.getFullYear()+"-"+"0"+date.getMonth()+"-"+date.getDate();
   naslov.innerHTML="Name Surname: "+pacijent.ime+" "+pacijent.prezime+"<br> Date: "+datum;
   
   korisnik=pacijent;
    if(pacijent.hronicniBolesnik==1)
        { 
             ime.innerHTML="Name: "+pacijent.ime;
             prezime.innerHTML="Surname: "+pacijent.prezime;
             jmbg.innerHTML="SSN: "+pacijent.jmbg;
            
             //email.innerHTML="Email: "+pacijent.email;
             dijagnoza.innerHTML="Diagnosis: "+pacijent.dijagnoza;
             medikamenti.innerHTML="Medicines: "+pacijent.medikamenti;
             medikamenti.readOnly=true;
             popuniLekara(pacijent.doktor);
             let barkod=pacijent.jmbg+Math.random();
             JsBarcode("#barcode",barkod);
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

function zakaziPregled(comment)
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

document.getElementById("notificationDiv").innerHTML=" <h1 class='h3 mb-2 text-gray-800'>Prescription</h1><div class='alert alert-success' role='alert'>\n\
<h4 class='alert-heading'>Well done!</h4>\n\
<p>Request successfully sent. You will receive a notification soon for selecting time for an appointment.</p><hr>\n\
<p class='mb-0'>\n\
Due to overloading the network, it may take a while.\n\
</p></div>";
}