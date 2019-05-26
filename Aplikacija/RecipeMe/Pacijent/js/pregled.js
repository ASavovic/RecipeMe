const doktori=document.querySelector("select[name='doctor']");
const temperatura=document.querySelector("select[name='temperatura']");
const grlo=document.querySelector("select[name='grlo']");
const kasalj=document.querySelector("input[name='kasalj']");
const kijanje=document.querySelector("input[name='kijanje']");
const curenje=document.querySelector("input[name='curenje']");
const komentar=document.querySelector("textarea[name='komentar']");
const dugmeSlanjePotvrda=document.getElementById("sendConfirm");
const dugme=document.getElementById("Send");


dugme.onclick=(ev)=>prikaziModal();
dugmeSlanjePotvrda.onclick=(ev)=>posaljiTegobe(ev);

popuniDoktore();
function validacijaZahteva()
{
    if(doktori.value==null)
        return false;
    if(temperatura.value==null)
        return false;
    if(grlo.value==null)
        return false;
    if(document.querySelector("input[name='kasalj']:checked")==null)
        return false;
    if(document.querySelector("input[name='kijanje']:checked")==null)
        return false;
    if(document.querySelector("input[name='curenje']:checked")==null)
        return false;
    if(komentar.value==null)
        return false;
    if(doktori.value==null)
        return false;
    return true;
}
function prikaziModal()
{
    let pom=validacijaZahteva();
    if(!pom)
        $('#upozorenje').modal('show');
    else
        $('#send').modal('show');
}
function posaljiTegobe()
{
   $('#send').modal('hide');
   
   var url_string = window.location.href;
   var url = new URL(url_string);
   var pacijent = url.searchParams.get("name");
   const formData = new FormData();
   var today = new Date();
   var datum=today.getDate()+"."+today.getMonth()+"."+today.getFullYear()+".";
   var vreme=today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
   formData.append("pacijent",pacijent);
   formData.append("temperatura",temperatura.value);
   formData.append("grlo",grlo.value);
   formData.append("kasalj",document.querySelector("input[name='kasalj']:checked").value);
   formData.append("kijanje",document.querySelector("input[name='kijanje']:checked").value);
   formData.append("curenje",document.querySelector("input[name='curenje']:checked").value);
   formData.append("komentar",komentar.value);
   formData.append("doktor",doktori.value);
   formData.append("date",datum);
    formData.append("time",vreme);
     
        const fetchData =
            {
                method:"POST",
                body: formData
            }
       fetch("../php/unesiTegobe.php",fetchData)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then(()=>prikaziPoruku())
            .catch(error => console.log(error));
     $('#okModal').modal('show');
}
function popuniDoktore()
{
   var today = new Date();
   var time = today.getHours();
   var smena;
    if(time>=12)
    {
        smena=2;
    }
    else
    {
        smena=1;
    }
    const formData=new FormData();
    formData.append("smena",smena);
    const fetchData =
            {
                method:"POST",
                body: formData
            }
       fetch("../php/vratiLekare.php",fetchData)
            .then(response =>
            {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then((lekari)=>popuniPolja(lekari))
            .catch(error => console.log(error));
   
    
}
function popuniPolja(lekari)
{
    lekari.forEach(lekar => {
        let el=document.createElement("option");
        el.value=lekar.korisnickoIme;
        el.innerHTML=lekar.ime+" "+lekar.prezime;
        doktori.appendChild(el);
    });
}
function prikaziPoruku()
{
    
}


