const logOut=document.getElementById("userDropdown");
logOut.onclick=(ev)=>odjaviSe();

function odjaviSe()
{
    $("#logoutModal").modal('show');
}
const confirmDugme=document.getElementById("register");
confirmDugme.onclick=(ev)=>{dodajLekara(ev.target);}
function dodajLekara(dugme)
{
      //console.log(lekar);
   
    
   $('#addModal').modal('hide');
    const formData = new FormData();
    formData.append("jmbg", document.querySelector("input[name='jmbg']").value);
    formData.append("ime", document.querySelector("input[name='ime']").value);
    formData.append("prezime", document.querySelector("input[name='prezime']").value);
    
    formData.append("zvanje",document.querySelector("select[name='titula']").value)
    formData.append("email",document.querySelector("input[name='email']").value)
    formData.append("sifra",document.querySelector("input[name='sifra']").value)
    formData.append("korisnickoIme",document.querySelector("input[name='korisnickoIme']").value)
    formData.append("smena",document.querySelector("select[name='smena']").value)
    
    const fetchData = {
        method: "post",
        body: formData
    }
    fetch("../../php/dodajLekara.php", fetchData)
    .then(response => {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    }).catch(error => console.log(error));  
    $('#okModal').modal('show');
    
  
}