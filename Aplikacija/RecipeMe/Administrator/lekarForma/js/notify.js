const logOut=document.getElementById("userDropdown");
logOut.onclick=(ev)=>odjaviSe();

function odjaviSe()
{
    $("#logoutModal").modal('show');
}
const tabela=document.getElementById("dataTable");
const confirmDugme=document.getElementById("register");
confirmDugme.onclick=(ev)=>{posaljiPoruku(ev.target);}
//console.log(1);
var nizLekara=[];
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
   // var id;
function prikaziPodatke(listaLekara)
{
   /* let innerHTMLTabele = "<thead class='rounded-top' style='background-color:#4e73df; color:white; text-align:center;'><tr><th>Name</th><th>Surname</th><th>Vocation</th><th>Email</th><th>Check Doctor</th></tr></thead>\n\
<tfoot style='text-align:center'><tr><th>Name</th><th>Surname</th><th>Vocation</th><th>Email</th><th>Check Doctor</th></tr></tfoot><tbody>";
    */
    listaLekara.lekari.forEach((lekar) =>  {  
        nizLekara[lekar.id]=lekar;
      //  id=1;
        /*innerHTMLTabele += "<tr id='"+id+"'><td>"+ lekar.ime + "</td><td> "+ lekar.prezime 
                + "</td><td>"+ lekar.zvanje 
                + "</td><td>"+lekar.email +"</td><td>"
                +"<input type='checkbox' name='"+lekar.id+"'id='"+lekar.ime+"' value='"+lekar.email+"'> Send email</td></tr>";})
    innerHTMLTabele += "</tbody>";   */
    //tabela.innerHTML = innerHTMLTabele;
    //id++;
    //tabela.innerHTML="";
    
//}
    });
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
         brojac++;
     } 
     if(element!=null && element.checked==true && document.getElementById("poruka").value!="")
     {
         posaljiPorukuLekaru(nizLekara[key]);
     }   
    }
   
    if(brojac==0)
    {
        $('#notifyModel').modal('hide');
        $('#warningModal').modal('show');
    }
    if(document.getElementById("poruka").value=="")
    {
        $('#notifyModel').modal('hide');
        $('#warningModal1').modal('show');
        
    }
}
function posaljiPorukuLekaru(lekar)
{
    //console.log(lekar);
    $("#notifyModel").modal('hide');
    const formData = new FormData();
    formData.append("id", lekar.id);
    formData.append("ime", lekar.ime);
    formData.append("prezime", lekar.prezime);
    formData.append("email", lekar.email);
    formData.append("txtPoruke",document.getElementById("poruka").value)
    const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../../php/notify.php", fetchData)
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
function srediIzgledTabele()
{
    
       const tabela=document.getElementById("dataTable3");
       for(let i=0;i<tabela.rows.length;i++)
       {
           tabela.rows[i].classList.add("text-center");
       }
} 

