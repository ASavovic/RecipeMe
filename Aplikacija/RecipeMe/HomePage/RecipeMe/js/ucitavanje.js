const radni_dan=document.getElementById("radni_dan");
const subota=document.getElementById("subota");
const nedelja=document.getElementById("nedelja");

prikaziRadnoVreme();

function prikaziRadnoVreme()
{
     fetch("../../Administrator/php/radno_vreme.php").then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(radnoVreme=>prikaziPodatke(radnoVreme))
           .catch(error => console.log(error));
    
}

function prikaziPodatke(radnoVreme)
{
    radni_dan.innerText=radnoVreme.radni_dan;
    subota.innerText=radnoVreme.subota;
    nedelja.innerText=radnoVreme.nedelja;
    
            
}

