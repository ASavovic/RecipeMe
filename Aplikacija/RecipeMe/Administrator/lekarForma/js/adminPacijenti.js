const tabela=document.getElementById("dataTable");
//console.log(1);
//tabela.innerHTML="";
prikaziPacijente();
var nizPacijenata=[];
function prikaziPacijente(){
   fetch("../php/pacijenti.php").then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(listaPacijenata=>prikaziPodatke(listaPacijenata))
           .catch(error => console.log(error));
    
    }
function prikaziPodatke(listaPacijenata)
{
    let innerHTMLTabele = "<thead class='rounded-top' style='background-color:#4e73df; color:white; text-align:center;'><tr><th>Name Surname</th><th>SSN</th><th>Phone number</th><th>Username</th><th>Password</th><th>Email</th><th>Cronic patient</th><th>Disease</th><th>Delete</th></tr></thead>\n\
<tfoot style='text-align:center'><tr><th>Name Surname</th><th>SSN</th><th>Username</th><th>Password</th><th>Email</th><th>Chronic Patient</th><th>Diseas</th><th>Delete</th></tr></tfoot><tbody>";
    nizPacijenata=[];
    listaPacijenata.pacijenti.forEach((pacijent) =>  { 
        nizPacijenata[pacijent.id]=pacijent.korisnickoIme;
        let id=1;
        innerHTMLTabele += "<tr id='"+id+"'><td>"+ pacijent.ime + " "+ pacijent.prezime  
                + "</td><td>"+ pacijent.jmbg + "</td><td>"+ pacijent.telefon +"</td><td>"+pacijent.korisnickoIme+"</td><td>"+pacijent.sifra
                + "</td><td>"+ pacijent.email + "</td><td>"+ Hronicni(pacijent.hronicni) + "</td><td>"+pacijent.bolest + "</td><td>"
                +"<input  type='checkbox' name='"+pacijent.id+"' value='"+pacijent.id+"'>  Check to delete</td></tr>";})
    innerHTMLTabele += "</tbody>";   
    tabela.innerHTML = innerHTMLTabele;
    id++;
    //tabela.innerHTML=""
}
const confirmDugme=document.getElementById("confirm");
confirmDugme.onclick=(ev)=>{izbrisiPacijente(ev.target);}

function izbrisiPacijente(dugme)
{
    let element;
    let brojac=0;
    for(const key in nizPacijenata){
        //console.log(nizLekara);
     element=document.querySelector("input[name='"+key+"']")
     //console.log(lekar);
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
    fetch("../php/obrisipacijenta.php?id="+id).then(response=>
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