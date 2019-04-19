const tabela=document.getElementById("dataTable");
const confirmDugme=document.getElementById("confirm");
confirmDugme.onclick=(ev)=>{azurirajSmeneLekara(ev.target);}
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
    let innerHTMLTabele = "<thead><tr><th>Name<th>Vocation</th><th>Shift</th><th>Change Shift</th></tr></thead><tbody>";
    
    listaLekara.lekari.forEach((lekar) =>  {  
        nizLekara[lekar.id]=lekar.smena;
        innerHTMLTabele += "<tr><td>"+ lekar.ime + " "+ lekar.prezime 
                + "</td><td>"+ lekar.zvanje 
                + "</td><td>"+Smena(lekar.smena) +"</td><td>"
                +"<input type='radio' name='"+lekar.id+"'id='"+lekar.id+"' value='1'> first </input><input type='radio' name='"+lekar.id+"' id='"+lekar.id+"' value='2'></input> second <input type='radio' name='"+lekar.id+"'id='"+lekar.id+"' value='3'> night </input></td></tr>";})
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
            promeniSmenuLekara(document.querySelector("input[name='"+key+"']:checked").id,pom);
    }
        
}
function promeniSmenuLekara(id,smena)
{
    fetch("../php/promeniSmenuLekara.php?id="+id+"&smena="+smena).then(response=>
    {
        if(!response.ok)
            throw new Error(response.statusText);
        else return response.json();
    }).then(listaL=>prikaziLekare())
            .catch(error=>console.log(error));

}
function Smena(s)
{
    if(s==1)
        return "first";
    else if(s==2)
        return "second";
    else return "night"
    }