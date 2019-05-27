const radni_dan=document.querySelector("input[name='rdan']");
const subota=document.querySelector("input[name='subota']");
const nedelja=document.querySelector("input[name='nedelja']");
const dugme=document.getElementById("register");
const logOut=document.getElementById("userDropdown");
const doktor=document.getElementById("doktor");
const opis=document.getElementById("opis");
const slika=document.getElementById("slika");
const save=document.getElementById("save");
const add=document.getElementById("add");
logOut.onclick=(ev)=>odjaviSe();
add.onclick=(ev)=>ubaciSliku();
save.onclick=(ev)=>provera();
  
function provera()
{
    
   
   if(doktor.value=="" || opis.value=="" || slika.files[0].name=="")
    {
         $('#warningModal').modal('show');
    }
    else
    {
        $('#zaposleniMeseca').modal('show');
    }
    
}

function ubaciSliku()
{
   // $('#zaposleniMeseca').modal('hide');
    var file = slika.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file); 
    setTimeout(function(){
        var base64 = reader.result;
     const formData=new FormData();
    formData.append("doktor",doktor.value);
    formData.append("opis",opis.value);
    formData.append("slika",base64);
      console.log(4,base64);
      
    const fetchData={
        method:"POST",
        body: formData
    };
     fetch("../../php/ubaciSliku.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
      
   }).then(()=>{})
           .catch(error => console.log(error));
   $('#proba').modal('show');},100);
   
    
}

function getBase64(file) {
   
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
       
        // dodato
        prikaziSvePacijente();
    }
}
function prikaziObavestenje()
{
    $('#okModal').modal('show');
}

var nizPacijenata=[];
function prikaziSvePacijente()
{
    fetch("../../php/pacijenti.php").then(response=>
    {
        if(!response.ok)
            throw new Error(response.statusText)
        else 
            return response.json();
    }).then((listaPacijenata)=>upisiPodatke(listaPacijenata))
            .catch(error => console.log(error));
}
    
function upisiPodatke(listaPacijenata)
{
    nizPacijenata=[];
    
    listaPacijenata.forEach((pacijent) =>  { 
        nizPacijenata[pacijent.id]=pacijent;
    });
    
    //console.log(nizPacijenata);
    
    posaljiMejloveSvima();
}

function posaljiMejloveSvima()
{
    nizPacijenata.forEach((pacijent) => {
    
    const formData = new FormData();
    formData.append("radni_dan",document.querySelector("input[name='rdan']").value);
    formData.append("subota", document.querySelector("input[name='subota']").value);
    formData.append("nedelja", document.querySelector("input[name='nedelja']").value);
    formData.append("ime", pacijent.ime);
    formData.append("prezime", pacijent.prezime);
    formData.append("email", pacijent.email);
  
    const fetchData = {
        method: "post",
        body: formData
    }
    
    fetch("../../php/posalji_mejlove_pacijentima.php",fetchData)
        .then(response=>
        {
            if(!response.ok)
                throw new Error(response.statusText)
        }).then(()=> console.log(nizPacijenata))
        .catch(error => console.log(error));
    });
}