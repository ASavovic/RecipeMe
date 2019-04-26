const tabela=document.getElementById("dataTable");
const confirmDugme=document.getElementById("confirm");
confirmDugme.onclick=(ev)=>{azurirajHronicneBolesnike(ev.target);}
//console.log(1);
var nizPacijenata=[];
var listaPacijenataPod=[];
//tabela.innerHTML="";
prikaziPacijente();

function prikaziPacijente(){
   fetch("../php/pacijenti.php").then(response=>
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
    let innerHTMLTabele = "<thead  class='rounded-top' style=' text-align:center;'><tr><th>Name</th><th>Surname</th><th>Phone number</th><th>E-mail</th><th>Disease</th><th>Chronic patient</th><th>Change Chronic</th></tr></thead>\n\
<tfoot style='text-align:center'><tr><th>Name</th><th>Surname</th><th>Phone number</th><th>E-mail</th><th>Disease</th><th>Chronic patient</th><th>Change Chronic</th></tr></tfoot><tbody>";
listaPacijenata.pacijenti.forEach((pacijent) =>  {  
        nizPacijenata[pacijent.id]=pacijent.smena;
        listaPacijenataPod[pacijent.id]=pacijent;
        id=1;
        innerHTMLTabele += "<tr id='"+id+"'><td>"+ pacijent.ime +"</td><td>"+ pacijent.prezime 
                + "</td><td>"+pacijent.telefon+"</td><td>"+ pacijent.email 
                + "</td><td>"+pacijent.bolest
                + "</td><td>"+HronicnaBolest(pacijent.hronicniBolesnik) +"</td><td>"
                +"<form><label class='radio-inline mr-2'><input  type='radio' name='"+pacijent.id+"'id='"+pacijent.id+"' value='1'> Yes</label><label class='radio-inline  mr-2'><input  type='radio' name='"+pacijent.id+"' id='"+pacijent.id+"' value='0'> No</label></form> </td></tr>";})
    innerHTMLTabele += "</tbody>";   
    tabela.innerHTML = innerHTMLTabele;
    id++;
    //tabela.innerHTML="";
    popuniRadioDugmad(listaPacijenata);
}
function popuniRadioDugmad(listaPacijenata)
{
    listaPacijenata.pacijenti.forEach((pacijent) =>
    {
        let niz=[];
        niz=document.querySelectorAll("input[name='"+pacijent.id+"']")
        niz.forEach(el=>{if(el.value==pacijent.hronicniBolesnik)el.checked=true})
    });
}

function azurirajHronicneBolesnike(rod)
{
    let pom;
    for(const key in nizPacijenata)
    {
        pom=document.querySelector("input[name='"+key+"']:checked").value
        if(nizPacijenata[key]!=pom)
            promeniHronicneBolesnike(document.querySelector("input[name='"+key+"']:checked").id,pom,listaPacijenataPod[key]);
    }
}

function promeniHronicneBolesnike(id,hronicni,pacijent)
{
    $('#changeModal').modal('hide');
    const formData = new FormData();
    formData.append("id",id);
    formData.append("ime", pacijent.ime);
    formData.append("prezime", pacijent.prezime);
    formData.append("email", pacijent.email);
    formData.append("hronicniBolesnik",hronicni);
     const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../php/promeniHronicneBolesnike.php",fetchData).then(response=>
    {
        if(!response.ok)
            throw new Error(response.statusText);
        else return response.json();
    }).then(listaL=>prikaziPodatke(listaL))
            .catch(error=>console.log(error));
    $('#okModal').modal('show');
}

function HronicnaBolest(s)
{
    if(s==1)
        return "Yes";
    else return "No";
    }