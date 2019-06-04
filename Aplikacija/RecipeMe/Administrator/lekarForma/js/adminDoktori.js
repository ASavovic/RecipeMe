const logOut=document.getElementById("userDropdown");
const dugmeOk=document.getElementById("okModalConfirm");
logOut.onclick=(ev)=>odjaviSe();
dugmeOk.onclick=(ev)=>osveziStranicu();


function srediIzgledTabele()
{
    
       const tabela=document.getElementById("dataTable1");
       for(let i=0;i<tabela.rows.length;i++)
       {
           tabela.rows[i].classList.add("text-center");
       }
}
function osveziStranicu()
{
    location.reload();
}
function odjaviSe()
{
    $("#logoutModal").modal('show');
}
const tabela=document.getElementById("dataTable");
prikaziLekare();
var nizLekara=[];
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
    nizLekara=[];
    listaLekara.lekari.forEach((lekar) =>  { 
        nizLekara[lekar.id]=lekar.korisnickoIme;
        
});
    
}

const confirmDugme=document.getElementById("confirm");
confirmDugme.onclick=(ev)=>{izbrisiLekare(ev.target);}

function izbrisiLekare(dugme)
{
   
    let element;
    let brojac=0;
   
    
    for(const key in nizLekara){

     element=document.querySelector("input[name='"+key+"']")

     
     if(element!=null && element.checked==true)
     {
         obrisiLekara(key);
         brojac++;
         
     }   
    }
    if(brojac==0)
    {
        $('#deleteModal').modal('hide');
        $('#warningModal').modal('show');
    }
}
function obrisiLekara(id)
{
    $('#deleteModal').modal('hide');
    
    fetch("../../php/obrisiLekara.php?id="+id).then(response=>
    {
        if(!response.ok)
            throw new Error(response.statusText)
        else return response.json();
    }).then(lekari=>prikaziPodatke(lekari))
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