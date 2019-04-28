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
   // $('#sendModal').modal({show:true});
   //ovde neki popup da izleti
   /* var date=new Date();
    var datum=date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    let nizVrednosti=korisnik.datum.split("-");
    if(nizVrednosti[2]>date.getFullYear() || nizVrednosti[1]>(date.getMonth()+1)%12 || nizVrednosti[0]>date.getDate())
    {
           document.getElementById("card").innerHTML="We are sorry, but you need to visit the doctor.";
               
           document.getElementById("take").style.display = 'none';
           return;
    }
    else if(korisnik.brojPreuzetih>korisnik.doza)
    {
         document.getElementById("card").innerHTML="We are sorry, but you need to wait for new Month.";
               
          document.getElementById("take").style.display = 'none';
          return;
    }*/
    //jos da se gadja odgovarajuca php skript za slanje mejla
   let content=$('#sendDiv').html();
    const formData=new FormData();
    formData.append("naziv",korisnik.korisnickoIme+Math.random());
    formData.append("email",korisnik.email);
    formData.append("data",content);
    const fetchData={
        method: "POST",
        body: formData
      
    };
    
    fetch('../php/sendEmail.php',fetchData)
            .then(response =>{
                if(!response.ok)
                throw new Error(response.statusText);
    }).then(()=>{})
            .catch(error => console.log(error));
   
  
     
     



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

