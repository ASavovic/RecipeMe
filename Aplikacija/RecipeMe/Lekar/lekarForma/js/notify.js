const tabela=document.getElementById("dataTable");
const confirmDugme=document.getElementById("register");
confirmDugme.onclick=(ev)=>{posaljiPoruku(ev.target);}
//console.log(1);
var nizPacijenata=[];
//tabela.innerHTML="";
prikaziPacijente();

function prikaziPacijente(){
   const formData=new FormData();
   var url_string = window.location.href;
   var url = new URL(url_string);
   var username = url.searchParams.get("name");
   
   formData.append("username",username);
   
   
    const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    
   fetch("../../php/pacijenti.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(listaPacijenata=>prikaziPodatke(listaPacijenata))
           .catch(error => console.log(error));
    
}

    var id;
function prikaziPodatke(listaPacijenata)
{
    //let innerHTMLTabele = "<thead class='rounded-top' style='background-color:#4e73df; color:white; text-align:center;'><tr><th>Name</th><th>Surname</th><th>Phone number</th><th>E-mail</th><th>Disease</th><th>Chronic patient</th><th>Check Patient</th></tr></thead>\n\
    //<tfoot style='text-align:center'><tr><th>Name</th><th>Surname</th><th>Phone number</th><th>E-mail</th><th>Disease</th><th>Chronic patient</th><th>Check Patient</th></tr></tfoot><tbody>";
    listaPacijenata.pacijenti.forEach((pacijent) =>  {
        nizPacijenata[pacijent.id]=pacijent;
        /*id=1;
        innerHTMLTabele += "<tr id='"+id+"'><td>"+ pacijent.ime +"</td><td>"+ pacijent.prezime 
                + "</td><td>"+pacijent.telefon+"</td><td>"+ pacijent.email 
                + "</td><td>"+pacijent.bolest
                + "</td><td>"+HronicnaBolest(pacijent.hronicniBolesnik) +"</td><td>"
                +"<input type='checkbox' name='"+pacijent.id+"'id='"+pacijent.ime+"' value='"+pacijent.email+"'> Send email</td></tr>";})
    innerHTMLTabele += "</tbody>";   
    tabela.innerHTML = innerHTMLTabele;
    id++;
    //tabela.innerHTML="";*/
    });
}

function posaljiPoruku(dugme)
{
    let element;
    let brojac=0;
    for(const key in nizPacijenata){
        //console.log(nizLnizPacijenataekara);
     element=document.querySelector("input[name='"+key+"']")
     //console.log(pacijent);
      if(element.checked==true)
     {
         brojac++;
     }
     if(element.checked==true && document.getElementById("poruka").value!="")
     {
         posaljiPorukuPacijentu(nizPacijenata[key]);
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

function posaljiPorukuPacijentu(pacijent)
{
    //console.log(pacijent);
    $("#notifyModel").modal('hide');
    const formData = new FormData();
    formData.append("id", pacijent.id);
    formData.append("ime", pacijent.ime);
    formData.append("prezime", pacijent.prezime);
    formData.append("email", pacijent.email);
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
    .then(pacijenti => ocistiCheckboxove())
    .catch(error => console.log(error));  
     $('#okModal').modal('show');
}

function ocistiCheckboxove()
{
    for(const key in nizPacijenata){
        //console.log(nizPacijenata);
     element=document.querySelector("input[name='"+key+"']")
     element.checked=false;
     document.getElementById("poruka").value="";
 }
}

function HronicnaBolest(s)
{
    if(s==1)
        return "Yes";
    else return "No";
    }