const logOut=document.getElementById("userDropdown");
logOut.onclick=(ev)=>odjaviSe();

function odjaviSe()
{
    $("#logoutModal").modal('show');
}
const tabela=document.getElementById("dataTable");
const confirmDugme=document.getElementById("confirm");
confirmDugme.onclick=(ev)=>{azurirajSmeneLekara(ev.target);}
//console.log(1);
var nizLekara=[];
var listaLekaraPod=[];

//tabela.innerHTML="";
prikaziLekare();



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
      

 
 //var i=0; 
 //let innerHTMLTabele = "<thead  class='rounded-top' style=' text-align:center;'><tr><th>Id</th><th>Name</th><th>Surname</th><th>SSN</th><th>Vocation</th><th>Shift</th><th>Change Shift</th></tr></thead>\n\
//<tfoot style='text-align:center'><tr><th>Name</th><th>Surname</th><th>SSN</th><th>Vocation</th><th>Shift</th><th>Change Shift</th></tr></tfoot><tbody>";
listaLekara.lekari.forEach((lekar) =>  {  
        nizLekara[lekar.id]=lekar.smena;
        listaLekaraPod[lekar.id]=lekar;
       
       /* innerHTMLTabele += "<tr><td>"+i+"</td><td>"+ lekar.ime +"</td><td>"+ lekar.prezime 
                + "</td><td>"+lekar.jmbg+"</td><td>"+ lekar.zvanje 
                + "</td><td>"+Smena(lekar.smena) +"</td><td>"
                +"<form><label class='radio-inline mr-2'><input  type='radio' name='"+lekar.id+"'id='"+lekar.id+"' value='1'> first</label><label class='radio-inline  mr-2'><input  type='radio' name='"+lekar.id+"' id='"+lekar.id+"' value='2'> second</label><label class='radio-inline  mr-2'><input type='radio' name='"+lekar.id+"'id='"+lekar.id+"' value='3'> night</label></form> </td></tr>";
    i++;*/});
    //innerHTMLTabele += "</tbody>";   
   // tabela.innerHTML = innerHTMLTabele;
    
    //tabela.innerHTML="";
    //popuniRadioDugmad(listaLekara);
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
    }).then(listaL=>prikaziPodatke(listaL))
            .catch(error=>console.log(error));
    $('#okModal').modal('show');

}

function Smena(s)
{
    if(s==1)
        return "first";
    else if(s==2)
        return "second";
    else return "night"
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