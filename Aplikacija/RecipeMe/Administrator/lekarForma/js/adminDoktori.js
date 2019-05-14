const tabela=document.getElementById("dataTable");
//console.log(1);
//tabela.innerHTML="";
prikaziLekare();
var nizLekara=[];
function prikaziLekare(){
   fetch("../php/lekari.php").then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(listaLekara=>prikaziPodatke(listaLekara))
           .catch(error => console.log(error));
    
}

function prikaziPodatke(listaLekara)
{
 //   var i=0;
//    let innerHTMLTabele = "<thead class='rounded-top' style='background-color:#4e73df; color:white; text-align:center;'><tr><th>Name</th><th>Surname</th><th>SSN</th><th>Vocation</th><th>Username</th><th>Password</th><th>Email</th><th>Shift</th><th>Delete</th></tr></thead>\n\
//<tfoot style='text-align:center'><tr><th>Name</th><th>Surname</th><th>SSN</th><th>Vocation</th><th>Username</th><th>Password</th><th>Email</th><th>Shift</th><th>Delete</th></tr></tfoot><tbody>";
    nizLekara=[];
    listaLekara.lekari.forEach((lekar) =>  { 
        nizLekara[lekar.id]=lekar.korisnickoIme;
    
  /*      innerHTMLTabele += "<tr id='"+i+"'><td>"+ lekar.ime + "</td><td>"+ lekar.prezime  
                + "</td><td>"+ lekar.jmbg + "</td><td>"+ lekar.zvanje +"</td><td>"+lekar.korisnickoIme+"</td><td>"+lekar.sifra
                + "</td><td>"+ lekar.email + "</td><td>"+ Smena(lekar.smena) + "</td><td>"
                +"<input  type='checkbox' name='"+lekar.id+"' value='"+lekar.id+"'>  Check to delete</td></tr>";
        i++;*/
    
});
    /*innerHTMLTabele += "</tbody>";   
    tabela.innerHTML = innerHTMLTabele;*/

    
    //tabela.innerHTML=""
}
const confirmDugme=document.getElementById("confirm");
confirmDugme.onclick=(ev)=>{izbrisiLekare(ev.target);}

function izbrisiLekare(dugme)
{
    let element;
    let brojac=0;
    for(const key in nizLekara){
        //console.log(nizLekara);
     element=document.querySelector("input[name='"+key+"']")
     //console.log(lekar);
     if(element.checked==true)
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
    fetch("../php/obrisiLekara.php?id="+id).then(response=>
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
    else return "night"
    }