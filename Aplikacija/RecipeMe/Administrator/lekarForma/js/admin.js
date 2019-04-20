const tabela=document.getElementById("dataTable");
const confirmDugme=document.getElementById("confirm");
confirmDugme.onclick=(ev)=>{azurirajSmeneLekara(ev.target);}
//console.log(1);
var nizLekara=[];
var listaLekaraPod=[];
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
    let innerHTMLTabele = "<thead  class='rounded-top' style='background-color:#4e73df; color:white; text-align:center;'><tr><th>Name</th><th>Surname</th><th>SSN</th><th>Vocation</th><th>Shift</th><th>Change Shift</th></tr></thead>\n\
<tfoot style='text-align:center'><tr><th>Name</th><th>Surname</th><th>SSN</th><th>Vocation</th><th>Shift</th><th>Change Shift</th></tr></tfoot><tbody>";
listaLekara.lekari.forEach((lekar) =>  {  
        nizLekara[lekar.id]=lekar.smena;
        listaLekaraPod[lekar.id]=lekar;
        innerHTMLTabele += "<tr><td>"+ lekar.ime +"</td><td>"+ lekar.prezime 
                + "</td><td>"+lekar.jmbg+"</td><td>"+ lekar.zvanje 
                + "</td><td>"+Smena(lekar.smena) +"</td><td>"
                +"<form><label class='radio-inline mr-2'><input  type='radio' name='"+lekar.id+"'id='"+lekar.id+"' value='1'> first</label><label class='radio-inline  mr-2'><input  type='radio' name='"+lekar.id+"' id='"+lekar.id+"' value='2'> second</label><label class='radio-inline  mr-2'><input type='radio' name='"+lekar.id+"'id='"+lekar.id+"' value='3'> night</label></form> </td></tr>";})
    innerHTMLTabele += "</tbody>";   
    tabela.innerHTML = innerHTMLTabele;
    //tabela.innerHTML="";
    popuniRadioDugmad(listaLekara);
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
        pom=document.querySelector("input[name='"+key+"']:checked").value
        if(nizLekara[key]!=pom)
            promeniSmenuLekara(document.querySelector("input[name='"+key+"']:checked").id,pom,listaLekaraPod[key]);
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
    fetch("../php/promeniSmenuLekara.php",fetchData).then(response=>
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