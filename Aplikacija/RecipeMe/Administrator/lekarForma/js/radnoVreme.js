const radni_dan=document.querySelector("input[name='rdan']");
const subota=document.querySelector("input[name='subota']");
const nedelja=document.querySelector("input[name='nedelja']");
const dugme=document.getElementById("register");
const logOut=document.getElementById("userDropdown");
const save=document.getElementById("save");
var path;
save.onclick=(ev) => sacuvajPodatkeUBazu();
logOut.onclick=(ev)=>odjaviSe();
function sacuvajPodatkeUBazu()
{
    const file=document.getElementById("file");
    path=file.value;
    const lekar=document.getElementById("opisLekara");
    let opis=lekar.value;
    
    const formData=new FormData();
    formData.append("slika",path);
    formData.append("opis",opis);
    
    const fetchData={
        method:"POST",
        body: formData
    }
    
      fetch("../../php/ubaciSliku.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(()=>{})
           .catch(error => console.log(error));
    
}
function odjaviSe()
{
    $("#logoutModal").modal('show');
}
dugme.onclick =(ev) => promeni();
prikaziRadnoVreme();

function prikaziRadnoVreme()
{
     fetch("../../php/radno_vreme.php").then(response=>
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
    if(dugme.innerHTML=="Update")
    {
        dugme.innerHTML="Confirm";
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
        
         fetch("../../php/radno_vreme_promena.php",fetchData)
                 .then(response=>
                 {
                    if(!response.ok)
                        throw new Error(response.statusText)
       
                }).then(()=> prikaziObavestenje())
                .catch(error => console.log(error));
       radni_dan.readOnly=true;
        subota.readOnly=true;
        nedelja.readOnly=true;
       dugme.innerHTML="Update";
    }
    
}
function prikaziObavestenje()
{
    $('#okModal').modal('show');
}