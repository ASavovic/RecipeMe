var korisnik={
    username:"",
    password:""
}
const el=document.getElementById("logIn");
el.onclick = (ev)=> ucitajKorisnika(ev);

sessionStorage.removeItem("name");



function ucitajKorisnika(ev)
{
   
    let pom=validacijaKorisnika();
    if(pom==0)
    {
        let tmp=document.getElementById("alert");
        let innerHtml="<div class='alert alert-danger' role='alert'><strong>Incorrect </strong> \n\
            <a href='#' class='alert-link'>Login Form!</a>\n\
           </div>";
        tmp.innerHTML=innerHtml;
        tmp.style.visibility="inherit";
        tmp.style.textAlign="center";
    }
        
        const formData = new FormData();
        formData.append("username",korisnik.username);
        formData.append("password",korisnik.password);
   
     
        const fetchData =
            {
                method:"POST",
                body: formData
            }
    fetch("../php/indexLogovanje.php",fetchData)
            .then(response =>
    {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then(pacijent => {
                
  otvoriNovuStranicu(pacijent);
    })
    
            .catch(error => console.log(error));
    
  
         
    
}
function otvoriNovuStranicu(pacijent)
{
    if(pacijent==null)
    {
        let tmp=document.getElementById("alert");
        let innerHtml="<div class='alert alert-danger' role='alert'><strong> </strong> \n\
            <a href='#' class='alert-link'>Wrong username or password!</a>\n\
           </div>";
        tmp.innerHTML=innerHtml;
        tmp.style.visibility="inherit";
        tmp.style.textAlign="center"; 
       
       
    }
    else
    {
        sessionStorage.setItem("name",pacijent.korisnickoIme);
    
        window.open("../html/pacijent.html","_self");
    }
}

function validacijaKorisnika(){
        let ind=1;
        const username=document.querySelector("input[name='username']");
        korisnik.username=username.value;
        const password=document.querySelector("input[name='password']");
        korisnik.password=password.value;
        
        if(username.value=="")
        {
            pocrveni(username);
            ind=0;
        }
        if(password.value=="")
        {
            pocrveni(password);
            ind=0;
        }
        return ind;     
        
}
 function pocrveni(el)
{
        el.value="";
        el.style.borderColor="red";
}