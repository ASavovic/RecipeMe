const recept=document.getElementById("recept");
recept.onclick = (ev) => otvoriRecept();

function otvoriRecept()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    //window.open("prepisiRecept.html","_self");
    window.open("prepisiRecept.html?name="+ url_safe_username,"_self");
    
}
function podesiValue()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("name");
    return username;
}

