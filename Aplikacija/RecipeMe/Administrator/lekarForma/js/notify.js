const tabela=document.getElementById("dataTable");
const confirmDugme=document.getElementById("register");
confirmDugme.onclick=(ev)=>{posaljiPoruku(ev.target);}
//console.log(1);
var nizLekara=[];
//tabela.innerHTML="";
prikaziLekare();
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
    let innerHTMLTabele = "<thead class='rounded-top' style='background-color:#4e73df; color:white; text-align:center;'><tr><th>Name</th><th>Surname</th><th>Vocation</th><th>Email</th><th>Check Doctor</th></tr></thead>\n\
<tfoot style='text-align:center'><tr><th>Name</th><th>Surname</th><th>Vocation</th><th>Email</th><th>Check Doctor</th></tr></tfoot><tbody>";
    
    listaLekara.lekari.forEach((lekar) =>  {  
        nizLekara[lekar.id]=lekar;
        innerHTMLTabele += "<tr><td>"+ lekar.ime + "</td><td> "+ lekar.prezime 
                + "</td><td>"+ lekar.zvanje 
                + "</td><td>"+lekar.email +"</td><td>"
                +"<input type='checkbox' name='"+lekar.id+"'id='"+lekar.ime+"' value='"+lekar.email+"'> Send email</td></tr>";})
    innerHTMLTabele += "</tbody>";   
    tabela.innerHTML = innerHTMLTabele;
    //tabela.innerHTML="";
    
}

function posaljiPoruku(dugme)
{
    let element;
    let brojac=0;
    for(const key in nizLekara){
        //console.log(nizLekara);
     element=document.querySelector("input[name='"+key+"']")
     //console.log(lekar);
     if(element.checked==true)
     {
         posaljiPorukuLekaru(nizLekara[key]);
         brojac++;
     }   
    }
    if(brojac==0)
    {
        $('#notifyModel').modal('hide');
        $('#warningModal').modal('show');
    }
}
function posaljiPorukuLekaru(lekar)
{
    //console.log(lekar);
    $("#notifyModel").modal('hide');
    const formData = new FormData();
    formData.append("ime", lekar.ime);
    formData.append("prezime", lekar.prezime);
    formData.append("email", lekar.email);
    formData.append("txtPoruke",document.getElementById("poruka").value)
    const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../php/notify.php", fetchData)
    .then(response => {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    })
    .then(lekari => ocistiCheckboxove())
    .catch(error => console.log(error));  
     $('#okModal').modal('show');

}
function ocistiCheckboxove()
{

    for(const key in nizLekara){
        //console.log(nizLekara);
     element=document.querySelector("input[name='"+key+"']")
     element.checked=false;
     document.getElementById("poruka").value="";
    
 }
    
}
