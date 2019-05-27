const ime=document.querySelector("input[name='ime']");
const prezime=document.querySelector("input[name='prezime']");
const smena=document.querySelector("select[name='smena']");
const jmbg=document.querySelector("input[name='jmbg']");
const email=document.querySelector("input[name='email']");
const korisnickoIme=document.querySelector("input[name='korisnickoIme']");
const sifra=document.querySelector("input[name='sifra']");
const titula=document.querySelector("select[name='titula']");
const dugme=document.querySelector("input[name='Update']");
const register=document.getElementById("register");
ucitajKorisnika();
dugme.onclick=(ev)=> izmeniLekara();
register.onclick=(ev)=>promeniPodatke();
function ucitajKorisnika()
{
        const formData = new FormData();

        var username=sessionStorage.getItem("name");
    
        formData.append("username",username);
     
        const fetchData =
            {
                method:"POST",
                body: formData
            }
       fetch("../../php/vratiLekara.php",fetchData)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then((lekar)=>popuniPolja(lekar))
            .catch(error => console.log(error));
    
}

function popuniPolja(lekar)
{
    ime.value=lekar.ime;
    ime.readOnly=true;
    prezime.value=lekar.prezime;
    prezime.readOnly=true;
    smena.value=lekar.smena;
    smena.disabled=true;
    jmbg.value=lekar.jmbg;
    jmbg.readOnly=true;
    email.value=lekar.email;
    email.readOnly=true;
    korisnickoIme.value=lekar.korisnickoIme;
    korisnickoIme.readOnly=true;
    sifra.value=lekar.sifra;
    sifra.readOnly=true;
    titula.value=lekar.zvanje;
    titula.disabled=true;
}
function izmeniLekara()
{
    if(dugme.value=="Update")
    { 
    ime.readOnly=false;
    prezime.readOnly=false;
    //smena.readOnly=false; videcemo da li cemo mu dozvoliti da menja smenu
    jmbg.readOnly=false;
    email.readOnly=false;
    
    sifra.readOnly=false;
    titula.disabled=false;
    dugme.value="Confirm";
    
    }
    else
    {
       $('#updateModal').modal('show'); 
    }

}
function promeniPodatke()
{
     $('#updateModal').modal('hide'); 
     const formData = new FormData();
    
    formData.append("ime",ime.value);
    formData.append("prezime",prezime.value);
    formData.append("smena",smena.value);
    formData.append("jmbg",jmbg.value);
    formData.append("email",email.value);
    formData.append("korisnickoIme",korisnickoIme.value);
    formData.append("sifra",sifra.value);
    formData.append("zvanje",titula.value);
    
    const fetchData =
            {
                method:"POST",
                body: formData
            }
    
       fetch("../../php/izmeniLekara.php",fetchData)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
       

    }).then(()=>zamrzniPolja())
            .catch(error => console.log(error));
    zamrzniPolja();
    dugme.value="Update";
}
function zamrzniPolja()
{
    ime.readOnly=true;
    prezime.readOnly=true;
    smena.readOnly=true;
    jmbg.readOnly=true;
    email.readOnly=true;
    
    sifra.readOnly=true;
    titula.readOnly=true;
    $('#okModal').modal('show');
}
