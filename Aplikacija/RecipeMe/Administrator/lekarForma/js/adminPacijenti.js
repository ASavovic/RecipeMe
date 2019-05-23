const logOut=document.getElementById("userDropdown");
const dugmeOk=document.getElementById("okModalConfirm");
logOut.onclick=(ev)=>odjaviSe();
dugmeOk.onclick=(ev)=>osveziStranicu();

function osveziStranicu()
{
    location.reload();
}
function odjaviSe()
{
    $("#logoutModal").modal('show');
}
function srediIzgledTabele()
{
    
       const tabela=document.getElementById("dataTable2");
       for(let i=0;i<tabela.rows.length;i++)
       {
           tabela.rows[i].classList.add("text-center");
       }
}
const tabela=document.getElementById("dataTable");

prikaziPacijente();
var nizPacijenata=[];
function prikaziPacijente(){
   fetch("../../php/pacijenti.php").then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else 
           return response.json();
   }).then((listaPacijenata)=>prikaziPodatke(listaPacijenata))
           .catch(error => console.log(error));
    
    }
  
function prikaziPodatke(listaPacijenata)
{
  
   nizPacijenata=[];
  
    listaPacijenata.forEach((pacijent) =>  { 
        nizPacijenata[pacijent.id]=pacijent.korisnickoIme;
       
        
    });
}
const confirmDugme=document.getElementById("confirm");
confirmDugme.onclick=(ev)=>{izbrisiPacijente(ev.target);}

function izbrisiPacijente(dugme)
{
    let element;
    let brojac=0;
    for(const key in nizPacijenata){
       
     element=document.querySelector("input[name='"+key+"']")
     
     if(element.checked==true)
     {
         obrisiPacijenta(key);
         brojac++;
     }   
    }
    if (brojac==0)
    {
        $('#deleteModal').modal('hide');
        $('#warningModal').modal('show');
    }
}
function obrisiPacijenta(id)
{
    $('#deleteModal').modal('hide');
    fetch("../../php/obrisipacijenta.php?id="+id).then(response=>
    {
        if(!response.ok)
            throw new Error(response.statusText)
        else return response.json();
    }).then(pacijenti=>prikaziPodatke(pacijenti))
            .catch(error=>console.log(error));
    $('#okModal').modal('show');
}
function Hronicni(p)
{
    if(p==1)
        return "Yes";
    else return "No"
    }