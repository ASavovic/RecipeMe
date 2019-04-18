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
    
    
    
    
   let innerHTMLTabele = "<thead><tr><th>Name</th><th>Surname</th><th>SSN</th><th>Rank</th><th>Email</th><th>Shift</th><th>Delete</th></tr></thead><tbody>";
    
    listaLekara.lekari.forEach((lekar) =>  {       
        innerHTMLTabele += "<tr><td>"+ lekar.ime + "</td><td>"+ lekar.prezime 
                + "</td><td>"+ lekar.jmbg + "</td><td>"+ lekar.zvanje 
                + "</td><td>"+ lekar.email + "</td><td>"+ lekar.smena + "</td><td>"
                +"<input type='checkbox' name='"+lekar.korisnickoIme+"' value='"+lekar.korisnickoIme+"'>  Check to delete</input></td></tr>";})
    innerHTMLTabele += "</tbody>";   
    tabela.innerHTML = innerHTMLTabele;
    //tabela.innerHTML=""
}


