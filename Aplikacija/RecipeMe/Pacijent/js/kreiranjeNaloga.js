let users=[];
/*fetch("../php/indexProveraUsername.php")
            .then(response => 
            {
                
                    if(!response.ok)
                        throw new Error(response.statusText);
                    else
                        return response.json();
               
 
            }).then((korisnici) => {users=korisnici})
            .catch(error => console.log(error));
console.log(users);
*/

let korisnik = {
    ime:"",
    prezime:"",
    jmbg:"",
    telefon:"",
    email:"",
    korisnickoIme:"",
    sifra:""
    }

const dugme=document.getElementById("register");
const el=document.getElementById("alert");

//podesavanje event-a
dugme.onclick = (ev) => kreirajNalog();
function proveriPostojanjeKorisnika()
{
    fetch("../php/indexProveraUsername.php")
            .then(response => 
            {
                
                    if(!response.ok)
                        throw new Error(response.statusText);
                    else
                        return response.json();
               
 
            }).then((korisnici) => 
               
                postojiKorisnik(korisnici)
            )
            .catch(error => console.log(error));
    
}
function postojiKorisnik(korisnici){
    
    users=korisnici;
    let indikator=1;
    let pom=users.pacijenti.filter(x => x.korisnickoIme==korisnik.korisnickoIme);
    if(pom.length!=0)
        indikator=0;
   // return indikator;
   if(indikator==1)
   {
    el.innerHTML="<div  class='alert alert-success' role='alert' >\n\
                  <strong>This</strong>\n\
                   may take a little time. Please<a href='#' class='alert-link'> wait!\n\
                 <div class='loader' >Loading...</div></a>";
            
   
    el.style.visibility="inherit";
    el.style.textAlign="center";
    const formData = new FormData();
    
    formData.append("ime",korisnik.ime);
    formData.append("prezime",korisnik.prezime);
    formData.append("jmbg",korisnik.jmbg);
    formData.append("telefon",korisnik.telefon);
    formData.append("email",korisnik.email);
    formData.append("korisnickoIme",korisnik.korisnickoIme);
    formData.append("sifra",korisnik.sifra);
       
     const fetchData =
            {
                method:"POST",
                body: formData
            }
         fetch("../php/indexKreirajNalog.php",fetchData)
            .then(response =>
             {
                if(!response.ok)
                    throw new Error(response.statusText);

             }).then(()=>notifyKorisnik())
                .catch(error => console.log(error));
   }
   else
   {
          let innerHtml="<div class='alert alert-danger' role='alert'><strong>Username already exists!</strong></div>";
          el.innerHTML=innerHtml;
          el.style.visibility="inherit";
          el.style.textAlign="center";
          const korisnickoIme=document.querySelector("input[name='korisnickoIme']");
          pocrveni(korisnickoIme);
   }
 
        
}

function kreirajNalog()
{
    el.innerHTML="";
    let prom=validacija();
    if(prom==0)
    {
     upozoriKlijenta();
     exit;
    }
    prom=validacijaOstatka();
    if(prom==0)
    {
        exit;
    }
    
    /*const formData = new FormData();
    
    formData.append("ime",korisnik.ime);
    formData.append("prezime",korisnik.prezime);
    formData.append("jmbg",korisnik.jmbg);
    formData.append("telefon",korisnik.telefon);
    formData.append("email",korisnik.email);
    formData.append("korisnickoIme",korisnik.korisnickoIme);
    formData.append("sifra",korisnik.sifra);
    */
    
    //let pom=proveriPostojanjeKorisnika();
   proveriPostojanjeKorisnika();
   /*if(pom!=1)
    {
         let innerHtml="<div class='alert alert-danger' role='alert'><strong>Username already exists!</strong></div>";
          el.innerHTML=innerHtml;
          el.style.visibility="inherit";
          el.style.textAlign="center";
          const korisnickoIme=document.querySelector("input[name='korisnickoIme']");
          pocrveni(korisnickoIme);
          
    }
    else
     { 
         const fetchData =
            {
                method:"POST",
                body: formData
            }
         fetch("../php/indexKreirajNalog.php",fetchData)
            .then(response =>
             {
                if(!response.ok)
                    throw new Error(response.statusText);

             }).then(()=>notifyKorisnik())
                .catch(error => console.log(error));
     }*/
    
}
function postojiUsername(formData){

    //let pom;
    const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    fetch("../php/indexProveraUsername.php",fetchData)
            .then(response => 
            {
                
                    if(!response.ok)
                        throw new Error(response.statusText);
                    else
                        return response.json();
               
 
            }).then((korisnici) => proveriObjekat(korisnici,formData)
                 ).catch(error => console.log(error));
   
    
}
function proveriObjekat(korisnici,formData)
{
    let pom=1;
    korisnici.forEach(k =>{
        if(k.korisnickoIme==korisnik.korisnickoIme)
            pom=0;
    });
    
}
function notifyKorisnik(){
    let innerHtml="<div  class='alert alert-success' role='alert' >\n\
                  <strong>Well done!</strong>\n\
                   You have successfully created a medical account!<a href='logovanjeKorisnika.html' class='alert-link'> Go Back!\n\
                 </a>";
        
          el.innerHTML=innerHtml;
          el.style.visibility="inherit";
          el.style.textAlign="center";
          setTimeout(preusmeri, 2500);
          let body=document.querySelectorAll("input");
          body.forEach(el => el.readOnly="true");
}
function preusmeri()
{
      window.history.back();
}
function validacija()
{
    let nizSifri=document.querySelectorAll("input[name='sifra']");
    let ind=0;
    if( nizSifri[0].value==nizSifri[1].value )
        ind=1;
    return ind;
}
function upozoriKlijenta()
{
    let nizSifri=document.querySelectorAll("input[name='sifra']");
    nizSifri.forEach(sifra =>
    {
       pocrveni(sifra);
    });
}
function validacijaOstatka()
{
        let ind=1;
        const ime=document.querySelector("input[name='ime']");
        korisnik.ime=ime.value;
        const prezime=document.querySelector("input[name='prezime']");
        korisnik.prezime=prezime.value;
        const jmbg=document.querySelector("input[name='jmbg']");
        korisnik.jmbg=jmbg.value;
        const telefon=document.querySelector("input[name='telefon']");
        korisnik.telefon=telefon.value;
        const email=document.querySelector("input[name='email']");
        korisnik.email=email.value;
        const potvrda=document.querySelector("input[type='checkbox']");
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
        if(jmbg.value=="")
        {
            pocrveni(jmbg);
            ind=0;
        }
        if(telefon.value=="")
        {
            pocrveni(telefon);
            ind=0;
        }
        if(email.value=="")
        {
            pocrveni(email);
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
        if(potvrda.checked==false)
        {
            let innerHtml="<div class='alert alert-danger' role='alert'><strong>You must accept our </strong> \n\
            <a href='#' class='alert-link'>policy & terms!</a>\n\
           </div>";
          el.innerHTML=innerHtml;
          el.style.visibility="inherit";
          el.style.textAlign="center";
          ind=0;
        
        }
        return ind;
        
        
}
    function pocrveni(el)
    {
        el.value="";
        el.style.borderColor="red";
    }

    



