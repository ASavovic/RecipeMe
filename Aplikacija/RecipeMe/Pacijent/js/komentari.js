const save=document.getElementById("save");
const opis=document.getElementById("komentarZaLekara");

save.onclick=(ev) => unesiKomentar();

function unesiKomentar()
{
    if(opis.value=="")
    {
        $('#komentar').modal('show');
    }
    else
    {
       var url_string = window.location.href;
       var url = new URL(url_string);
       var username = url.searchParams.get("name");
       
        const formData=new FormData();
        formData.append("pacijent",username);
        formData.append("komentar",opis.value);
        
        
        const fetchData =
            {
                method:"POST",
                body: formData
            }
    fetch("../php/ubaciKomentar.php",fetchData)
            .then(response =>
    {
        if(!response.ok)
            throw new Error(response.statusText);
        else
            return response.json();

    }).then(() => {})
    
            .catch(error => console.log(error));
    
    $('#okModalKomentar').modal('show');
    }
}



