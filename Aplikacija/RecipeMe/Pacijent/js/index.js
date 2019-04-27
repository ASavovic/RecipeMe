const profil=document.getElementById("profile");
const recept=document.querySelector("a[name='recept']");
const pregled=document.querySelector("a[name='pregled']");
const dashboard=document.getElementById("dashboard");



podesiValue();
profil.onclick=(ev)=>otvoriProfil();
pregled.onclick=(ev)=>otvoriPregled();
recept.onclick=(ev)=>otvoriRecept();
dashboard.onclick=(ev)=>otvoriDashboard();


function podesiValue()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("name");
    return username;
}
function otvoriProfil()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("profil.html?name="+ url_safe_username,"_self");
}
function otvoriPregled()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("pregled.html?name="+ url_safe_username,"_self");
    
}
function otvoriRecept()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("recept.html?name="+ url_safe_username,"_self");
}

function otvoriDashboard()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("pacijent.html?name="+ url_safe_username,"_self");
}
function otvoriIndex()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("pacijent.html?name="+ url_safe_username,"_self");
}

