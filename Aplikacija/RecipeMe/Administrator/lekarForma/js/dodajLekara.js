const logOut=document.getElementById("userDropdown");
logOut.onclick=(ev)=>odjaviSe();

function odjaviSe()
{
    $("#logoutModal").modal('show');
}
const confirmDugme=document.getElementById("register");
//confirmDugme.onclick=(ev)=>{dodajLekara(ev.target);}
confirmDugme.onclick=(ev)=>{proveriUsername();}


function proveriUsername()
{
    const formData = new FormData();
    formData.append("username",document.querySelector("input[name='korisnickoIme']").value );
     const fetchData = {
        method: "post",
        body: formData
    };
    
     fetch("../../../Lekar/php/vratiLekara.php", fetchData)
    .then(response => {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    else
        return response.json();
    
    
    }).then((lekar)=>obavestiUsername(lekar)).catch(error => console.log(error));  
  
    
}
function obavestiUsername(lekar)
{
    if(lekar!=null)
    {
       
        const korisnickoIme=document.querySelector("input[name='korisnickoIme']");
        $('#addModal').modal('hide');
        pocrveni(korisnickoIme);
        
    }
    else
        dodajLekara();
}
function dodajLekara(dugme)
{
    let prom = validacijaDodavanja();
    if(prom==0)
    {
        exit;
    }
      //console.log(lekar);
   $('#addModal').modal('hide');
    const formData = new FormData();
    formData.append("jmbg", document.querySelector("input[name='jmbg']").value);
    formData.append("ime", document.querySelector("input[name='ime']").value);
    formData.append("prezime", document.querySelector("input[name='prezime']").value);
    
    formData.append("zvanje",document.querySelector("select[name='titula']").value)
    formData.append("email",document.querySelector("input[name='email']").value)
    formData.append("sifra",document.querySelector("input[name='sifra']").value)
    formData.append("korisnickoIme",document.querySelector("input[name='korisnickoIme']").value)
    formData.append("smena",document.querySelector("select[name='smena']").value)
    
    const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../../php/dodajLekara.php", fetchData)
    .then(response => {
    if (!response.ok) {
        throw new Error(response.statusText);
   
    }
    }).then(()=> dodeliSmenuLekaru()).catch(error => console.log(error));  
   
}

let korisnik = {
    ime:"",
    prezime:"",
    jmbg:"",
    smena:"",
    email:"",
    korisnickoIme:"",
    sifra:"",
    zvanje:""
    };

function dodeliSmenuLekaru()
{
   
   
    const formData = new FormData();
    
    formData.append("korisnickoIme",document.querySelector("input[name='korisnickoIme']").value)
    formData.append("smena",document.querySelector("select[name='smena']").value)
     const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../../php/dodajSmenuLekara.php",fetchData).then(response=>
    {
        if(!response.ok)
            throw new Error(response.statusText);
       
    })
            .catch(error=>console.log(error));
      
    $('#okModal').modal('show');
    ocistiPolja();
 

}
function validacijaDodavanja()
{
    let ind=1;
    const ime=document.querySelector("input[name='ime']");
    korisnik.ime=ime.value;
    const prezime=document.querySelector("input[name='prezime']");
    korisnik.prezime=prezime.value;
    const smena=document.querySelector("select[name='smena']");
    korisnik.smena=smena.value;
    const jmbg=document.querySelector("input[name='jmbg']");
    korisnik.jmbg=jmbg.value;
    const email=document.querySelector("input[name='email']");
    korisnik.email=email.value;
    const zvanje=document.querySelector("select[name='titula']");
    korisnik.zvanje=zvanje.value;
    let sifre=document.querySelectorAll("input[name='sifra']");
    const korisnickoIme=document.querySelector("input[name='korisnickoIme']");
    korisnik.korisnickoIme=korisnickoIme.value;
    korisnik.sifra=sifre[1].value;
    
    if(ime.value=="")
    {
        pocrveni(ime);
        ind=0;
    }
    
    if(prezime.value=="")
    {
        pocrveni(prezime);
        ind=0;
    }
    
    if(smena.value=="")
    {
        pocrveni(smena);
        ind=0;
    }
    
    if(jmbg.value=="")
    {
        pocrveni(jmbg);
        ind=0;
    }
    
    if(email.value=="")
    {
        pocrveni(email);
        ind=0;
    }
    
    if(korisnickoIme.value=="")
    {
        pocrveni(korisnickoIme);
        ind=0;
    }
    
    if(sifre[0].value=="")
    {
        pocrveni(sifre[0]);
        ind=0;
    }
    
    if(sifre[1].value=="")
    {
        pocrveni(sifre[1]);
        ind=0;
    }
    
    if(zvanje.value=="")
    {
        pocrveni(zvanje);
        ind=0;
    }
    
    if(sifre[0].value != sifre[1].value)
        {
            pocrveni(sifre[0]);
            pocrveni(sifre[1]);
            
            posivi(ime);
            posivi(prezime);
            posivi(smena);
            posivi(jmbg);
            posivi(email);
            posivi(korisnickoIme);
            posivi(zvanje);
            
            ind=0;
        }
    
    return ind;
}

function pocrveni(el)
{
    el.value="";
    el.style.borderColor="red";
}

function posivi(el)
{
    el.style.borderColor="silver";
}

function ocistiPolja()
{
    const ime=document.querySelector("input[name='ime']");
    const prezime=document.querySelector("input[name='prezime']");
    const smena=document.querySelector("select[name='smena']");
    const jmbg=document.querySelector("input[name='jmbg']");
    const email=document.querySelector("input[name='email']");
    const zvanje=document.querySelector("select[name='titula']");
    let sifre=document.querySelectorAll("input[name='sifra']");
    const korisnickoIme=document.querySelector("input[name='korisnickoIme']");
    
    ime.value="";
    ime.style.borderColor="silver";
    prezime.value="";
    prezime.style.borderColor="silver";
    smena.value="";
    smena.style.borderColor="silver";
    jmbg.value="";
    jmbg.style.borderColor="silver";
    email.value="";
    email.style.borderColor="silver";
    zvanje.value="";
    zvanje.style.borderColor="silver";
    sifre[0].value="";
    sifre[0].style.borderColor="silver";
    sifre[1].value="";
    sifre[1].style.borderColor="silver";
    korisnickoIme.value="";
    korisnickoIme.style.borderColor="silver";
}