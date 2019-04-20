document.body.onload = myFunction();

function myFunction(){
   
    var url_string =window.location.href;
    var url = new URL(url_string);
    var name = url.searchParams.get("name");
    
    if(name!=null)
    {
        const el=document.getElementById("id1");
        el.innerHTML="Profile";
    }
}

