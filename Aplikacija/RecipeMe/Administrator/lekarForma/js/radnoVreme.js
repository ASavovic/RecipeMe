const radni_dan=document.querySelector("input[name='rdan']");
const subota=document.querySelector("input[name='subota']");
const nedelja=document.querySelector("input[name='nedelja']");
const dugme=document.getElementById("register");

dugme.onclick =(ev) => promeni();
prikaziRadnoVreme();

function prikaziRadnoVreme()
{
     fetch("../php/radno_vreme.php").then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(radnoVreme=>prikaziPodatke(radnoVreme))
           .catch(error => console.log(error));
    
}

function prikaziPodatke(radnoVreme)
{
    radni_dan.value=radnoVreme.radni_dan;
    radni_dan.readOnly=true;
    subota.value=radnoVreme.subota;
    subota.readOnly=true;
    nedelja.value=radnoVreme.nedelja;
    nedelja.readOnly=true;
            
}
function promeni()
{
    if(dugme.value=="Update")
    {
        dugme.value="Confirm";
        radni_dan.readOnly=false;
        subota.readOnly=false;
        nedelja.readOnly=false;
    }
    else
    {
        const formData = new FormData();
        formData.append("radni_dan",radni_dan.value);
        formData.append("subota", subota.value);
        formData.append("nedelja", nedelja.value);
  
     const fetchData = {
        method: "post",
        body: formData
    }
        
         fetch("../php/radno_vreme_promena.php",fetchData)
                 .then(response=>
                 {
                    if(!response.ok)
                        throw new Error(response.statusText)
       
                }).then(()=> prikaziObavestenje())
                .catch(error => console.log(error));
       prikaziRadnoVreme();
       dugme.value="Update";
    }
    
}
function prikaziObavestenje()
{
    $('#okModal').modal('show');
}