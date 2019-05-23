const logOut=document.getElementById("userDropdown");
logOut.onclick=(ev)=>odjaviSe();

function odjaviSe()
{
    $("#logoutModal").modal('show');
}
const tabela=document.getElementById("dataTable");
const confirmDugme=document.getElementById("confirm");
confirmDugme.onclick=(ev)=>{azurirajSmeneLekara(ev.target);}

var nizLekara=[];
var listaLekaraPod=[];


prikaziLekare();

function srediIzgledTabele()
{
    
       const tabela=document.getElementById("dataTable");
       for(let i=0;i<tabela.rows.length;i++)
       {
           tabela.rows[i].classList.add("text-center");
       }
}

function prikaziLekare(){
 
    fetch("../../php/lekari.php").then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(listaLekara=>prikaziPodatke(listaLekara))
           .catch(error => console.log(error));
    
}

function prikaziPodatke(listaLekara)
{
      
listaLekara.lekari.forEach((lekar) =>  {  
        nizLekara[lekar.id]=lekar.smena;
        listaLekaraPod[lekar.id]=lekar;
       });
    
}

function popuniRadioDugmad(listaLekara)
{
    listaLekara.lekari.forEach((lekar) =>
    {
        let niz=[];
        niz=document.querySelectorAll("input[name='"+lekar.id+"']")
        niz.forEach(el=>{if(el.value==lekar.smena)el.checked=true})
    });
}

  
function azurirajSmeneLekara(rod)
{
    let pom;
    for(const key in nizLekara)
    {
        pom=document.querySelector("input[name='"+key+"']:checked").value;
        if(nizLekara[key]!=pom)
        {
            promeniSmenuLekara(document.querySelector("input[name='"+key+"']:checked").id,pom,listaLekaraPod[key]);
            //dodato
            obrisiTermineLekara(listaLekaraPod[key]);
            dodeliNoveTermineLekaru(pom,listaLekaraPod[key]);
        }
    }
        
}

function promeniSmenuLekara(id,smena,lekar)
{
    $('#changeModal').modal('hide');
    document.getElementById(lekar.korisnickoIme).innerHTML=smena;
    const formData = new FormData();
    formData.append("id",id);
    formData.append("ime", lekar.ime);
    formData.append("prezime", lekar.prezime);
    formData.append("email", lekar.email);
    formData.append("smena",smena);
     const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../../php/promeniSmenuLekara.php",fetchData).then(response=>
    {
        if(!response.ok)
            throw new Error(response.statusText);
        else return response.json();
    }).then(listaL=>{})
            .catch(error=>console.log(error));
    $('#okModal').modal('show');

}

function Smena(s)
{
    if(s==1)
        return "first";
    else if(s==2)
        return "second";
    
}

//dodato
function obrisiTermineLekara(korisnik)
{
    $('#changeModal').modal('hide');
    const formData = new FormData();
    //console.log(korisnik.korisnickoIme);
    formData.append("ime", korisnik.ime);
    formData.append("prezime", korisnik.prezime);
    formData.append("username", korisnik.korisnickoIme);
     const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../../php/obrisiTermineLekara.php",fetchData).then(response=>
    {
        if(!response.ok)
            throw new Error(response.statusText);
        else return response.json();
    }).then(listaL=>console.log(listaL))
            .catch(error=>console.log(error));
    $('#okModal').modal('show');

}

function dodeliNoveTermineLekaru(smena,korisnik)
{
    $('#changeModal').modal('hide');
    const formData = new FormData();
    formData.append("ime", korisnik.ime);
    formData.append("prezime", korisnik.prezime);
    formData.append("username", korisnik.korisnickoIme);
     const fetchData = {
        method: "post",
        body: formData
    }
    if(smena == 1)
    {
        fetch("../../php/terminiPrvaSmena.php",fetchData).then(response=>
        {
            if(!response.ok)
                throw new Error(response.statusText);
            else return response.json();
        }).then(listaL=>prikaziPodatke(listaL))
        .catch(error=>console.log(error));
        $('#okModal').modal('show');
    }
    else if(smena == 2)
    {
        fetch("../../php/terminiDrugaSmena.php",fetchData).then(response=>
        {
            if(!response.ok)
                throw new Error(response.statusText);
            else return response.json();
        }).then(listaL=>prikaziPodatke(listaL))
        .catch(error=>console.log(error));
        $('#okModal').modal('show');
    }
}