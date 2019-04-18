const tabela=document.getElementById("dataTable");
console.log(1);
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
    
    
    
    
    let innerHTMLTabele = "<thead><tr><th>Name</th><th>Surname</th><th>SSN</th><th>Rank</th><th>Email</th><th>Shift</th><th>Change Shift</th></tr></thead><tbody>";
    
    listaLekara.lekari.forEach((lekar) =>  {       
        innerHTMLTabele += "<tr><td>"+ lekar.ime + "</td><td>"+ lekar.prezime 
                + "</td><td>"+ lekar.jmbg + "</td><td>"+ lekar.zvanje 
                + "</td><td>"+ lekar.email + "</td><td>"+ lekar.smena + "</td><td>"
                +"<input type='radio' name='"+lekar.korisnickoIme+"' value='1'>1</input><input type='radio' name='"+lekar.korisnickoIme+"' value='2'></input>2<input type='radio' name='"+lekar.korisnickoIme+"' value='3'>3</input></td></tr>";})
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
        niz=document.querySelectorAll("input[name='"+lekar.korisnickoIme+"']")
        niz.forEach(el=>{if(el.value==lekar.smena)el.checked=true})
    });
}


