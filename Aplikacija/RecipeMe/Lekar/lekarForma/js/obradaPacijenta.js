prikaziPacijenta();
prikaziTegobe();
prikaziLekara();
var pacijentGlobal;
var tegobeGlobal;
var lekarGlobal;
function prikaziTegobe(){
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
   
    
   fetch("../php/tegoba.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(tegoba=>prikaziPodatke(tegoba))
           .catch(error => console.log(error));
    
}

const imePrezimePacjentaLabela=document.getElementById("imePrezime");
const temp = document.getElementById("temperatura");
const grlo = document.getElementById("grlo");
const doktor = document.getElementById("doktor");
const kasalj = document.querySelectorAll("input[name='Coughing']");
const kijanje = document.querySelectorAll("input[name='kijanje']");
const curenje = document.querySelectorAll("input[name='curenje']");
const komentar = document.getElementById("komentar");

function prikaziPodatke(tegoba)
{
   //temperatura.value=tegoba.groznica;
   temp.innerHTML="<option value ='"+tegoba.groznica+"'>"+tegoba.groznica+"</option>";
   temp.disabled=true;
   grlo.innerHTML="<option value ='"+tegoba.bolGrlo+"'>"+tegoba.bolGrlo+"</option>";
   grlo.disabled=true;
   if(tegoba.kasalj=="no")
        kasalj[0].checked=true;
   else
       kasalj[2].checked=true;
    kasalj.forEach(d => d.disabled=true);
   if(tegoba.kijanje=="yes")
       kijanje[0].checked=true;
   else
       kijanje[1].checked=true;
   kijanje.forEach(d => d.disabled=true);
   if(tegoba.curenjeNos=="yes")
       curenje[0].checked=true;
   else 
       curenje[1].checked=true;
   curenje.forEach(d => d.disabled=true);
  komentar.innerText=tegoba.komentar;
  komentar.disabled=true;
   tegobeGlobal=tegoba;
   //console.log(tegoba);
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
   }).then(pacijent=>imeIPrezimePacijenta(pacijent))
           .catch(error => console.log(error));
    
}
function imeIPrezimePacijenta(pacijent)
{
    imePrezimePacjentaLabela.innerHTML=pacijent.ime+" "+pacijent.prezime+"<br>SSN: "+pacijent.jmbg;
    pacijentGlobal=pacijent;
    
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
     doktor.innerHTML="<option value ='"+lekar.ime+" "+lekar.prezime+"'>"+lekar.ime+" "+lekar.prezime+"</option>";
     lekarGlobal=lekar;
     doktor.disabled=true;
}



const recept=document.getElementById("recept");
recept.onclick = (ev) => otvoriRecept();


function otvoriRecept()
{
    let myu=podesiVrednost("docName");
    var url_safe_username = encodeURIComponent(myu);
    myu=podesiVrednost("patName");
    var url_safe_username2= encodeURIComponent(myu);
    //window.open("prepisiRecept.html","_self");
    window.open("prepisiRecept.html?docName="+ url_safe_username+ "&patName="+ url_safe_username2,"_self");
    
}

function podesiVrednost(string)
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get(string);
    return username;
}


const AcceptDugme=document.getElementById("pregled").onclick=(ev)=>OdobriTermin();
const DenyModal=document.getElementById("denyConfirm").onclick=(ev)=>OtkaziTermin();
const DenyDugme=document.getElementById("odbij").onclick=(ev)=>{  $('#denyModalConfirm').modal('show');};

function OdobriTermin()
{
    let poruka="Vas zahtev za pregled je odobren. Molimo vas da dodjete u ordinaciju u vasem zakazanom terminu";
  ObavestiPacijenta(poruka);
}

function OtkaziTermin()
{
  $('#denyModalConfirm').modal('hide');
  let poruka="Vas zahtev za pregled nije odobren. Doktor "+lekarGlobal.ime+" "+lekarGlobal.prezime+" nije <br> u mogucnosti da vas pregleda u tom terminu, molimo vas da pokusate u nekom drugom terminu.";
  ObavestiPacijenta(poruka); 
  obrisiZahtev(tegobeGlobal.id);
  $('#denyModal').modal('show');
}

function ObavestiPacijenta(poruka)
{
       const formData = new FormData();
    formData.append("ime", pacijentGlobal.ime);
    formData.append("prezime", pacijentGlobal.prezime);
    formData.append("email", pacijentGlobal.email);
    formData.append("txtPoruke",poruka)
    const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../php/notifyPatient.php", fetchData)
    .then(response => {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    }).catch(error => console.log(error)); 
}


function obrisiZahtev(id)
{
    const formData = new FormData();
    formData.append("id", id);
    const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../php/obrisiTegobePacijenta.php", fetchData)
    .then(response => {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    }).catch(error => console.log(error)); 
}

const historyDugme=document.getElementById("history").onclick=(ev)=>prikaziIstoriju();
function prikaziIstoriju()
{
    
     fetch("../php/vratiDijagnoze.php?username="+pacijentGlobal.korisnickoIme).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(listaDijagnoza=>prikaziDijagnoze(listaDijagnoza))
           .catch(error => console.log(error));
    
}


var flag=0;
function prikaziDijagnoze(listaDijagnoza)
{
    var kontenjerDiv=document.getElementById("dijagnozePacijenta");
    kontenjerDiv.align='center';
    var naslov=document.getElementById("exampleModalLongTitle").innerHTML="History of Patient "+pacijentGlobal.ime+" "+pacijentGlobal.prezime;
    if(listaDijagnoza.dijagnoze.length==0)
    {
         kontenjerDiv.innerHTML="Patient dont have any history...";
    }
    else
    {
       
        var SortitaneDijagnoze=listaDijagnoza.dijagnoze;//sortirajDijagnoze(listaDijagnoza.dijagnoze);
        
        if(flag==0)
        {
             kontenjerDiv.innerHTML="";
        
        SortitaneDijagnoze.forEach((d)=>
        {
            flag=1;
            let kontenjer=document.createElement("div");
            kontenjer.align='left';
            kontenjer.className="toast fade show";
            let zaglavlje=document.createElement("div");
            zaglavlje.className="toast-header bg-primary text-white"
            zaglavlje.innerHTML="Doctor: "+d.doktor+"<br> Date: "+d.datum+" Time: "+d.vreme;
            let telo=document.createElement("div");
            telo.className="toast-body";
            telo.innerHTML="Diagnosis: "+d.dijagnoza+"<br>Medicines: "+d.medikamenti;
            kontenjer.appendChild(zaglavlje);
            kontenjer.appendChild(telo);
            kontenjerDiv.appendChild(kontenjer);
        });
    }
    }
}
function sortirajDijagnoze(niz)
{
    let i;
    let j;
    let a;
    let b;
    let pom;
    for(i=0;i<((niz.length)-2);i++)
        for(j=i+1;j<((niz.length)-1);j++)
        {
            a=(niz[i].id);
            b=(niz[j].id);
        
            if(b > a)
            {
                pom=niz[i];
                niz[i]=niz[j];
                niz[j]=pom;
                
            }
        }
    return niz;
}