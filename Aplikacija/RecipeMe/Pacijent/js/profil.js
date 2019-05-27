const ime=document.querySelector("input[name='ime']");
const prezime=document.querySelector("input[name='prezime']");
const jmbg=document.querySelector("input[name='jmbg']");
const email=document.querySelector("input[name='email']");
const telefon=document.querySelector("input[name='telefon']");
const username=document.querySelector("input[name='username']");
const password=document.querySelector("input[name='password']");
const dugme=document.getElementById("Edit");
const register=document.getElementById("confirm");
ucitajKorisnika();
dugme.onclick=(ev)=> izmeniPacijenta();
register.onclick=(ev)=>promeniPodatke();
function ucitajKorisnika()
{
        const formData = new FormData();
       
        var username = sessionStorage.getItem("name");
    
        formData.append("username",username);
     
        const fetchData =
            {
                method:"POST",
                body: formData
            }
       fetch("../php/vratiPacijenta.php",fetchData)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then((pacijent)=>popuniPolja(pacijent))
            .catch(error => console.log(error));
    
}
function popuniPolja(pacijent)
{
    ime.value=pacijent.ime;
    ime.readOnly=true;
    prezime.value=pacijent.prezime;
    prezime.readOnly=true;
    password.value=pacijent.sifra;
    password.readOnly=true;
    jmbg.value=pacijent.jmbg;
    jmbg.readOnly=true;
    email.value=pacijent.email;
    email.readOnly=true;
    username.value=pacijent.korisnickoIme;
    username.readOnly=true;
    telefon.value=pacijent.telefon;
    telefon.readOnly=true;
    
}
function izmeniPacijenta()
{
    if(dugme.value==="Edit")
    { 
    ime.readOnly=false;
    prezime.readOnly=false;
    //smena.readOnly=false; videcemo da li cemo mu dozvoliti da menja smenu
    jmbg.readOnly=false;
    email.readOnly=false;
    
    telefon.readOnly=false;
    password.readOnly=false;
    dugme.value="Confirm";
    
    
    }
    else
    {
       $('#changeModal').modal('show'); 
    }

}
function promeniPodatke()
{
     $('#changeModal').modal('hide'); 
     const formData = new FormData();
    
    formData.append("ime",ime.value);
    formData.append("prezime",prezime.value);
    formData.append("jmbg",jmbg.value);
    formData.append("email",email.value);
    formData.append("password",password.value);
    formData.append("username",username.value);
    formData.append("telefon",telefon.value);
    
    const fetchData =
            {
                method:"POST",
                body: formData
            }
    
       fetch("../php/izmeniPacijenta.php",fetchData)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
       

    }).then(()=>zamrzniPolja())
            .catch(error => console.log(error));
   
    dugme.value="Edit";
}
function zamrzniPolja()
{
    ime.readOnly=true;
    prezime.readOnly=true;
    password.readOnly=true;
    jmbg.readOnly=true;
    email.readOnly=true;
    
    username.readOnly=true;
    telefon.readOnly=true;
    $('#okModal').modal('show');
}



