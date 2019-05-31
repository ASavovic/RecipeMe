const profil=document.getElementById("profile");
const recept=document.querySelector("a[name='recept']");
const pregled=document.querySelector("a[name='pregled']");
const comm=document.querySelector("a[name='comm']");
const dashboard=document.getElementById("dashboard");
const patient=document.getElementById("patient");
const ranks=document.querySelector("a[name='ranks']");
const logOut=document.getElementById("userDropdown");
logOut.onclick=(ev)=>odjaviSe();

function odjaviSe()
{
    $("#logoutModal").modal('show');
}

podesiValue();
profil.onclick=(ev)=>otvoriProfil();
pregled.onclick=(ev)=>otvoriPregled();
recept.onclick=(ev)=>otvoriRecept();
dashboard.onclick=(ev)=>otvoriDashboard();
patient.onclick=(ev)=>otvoriDashboard();
ranks.onclick=(ev)=>otvoriRank();
comm.onclick=(ev)=>otvoriKomentare();
function otvoriRank()
{
   let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("rangiranjeDoktora.html","_self");
    
}
function otvoriKomentare()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("komentari.html","_self");
}

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
    window.open("profil.html","_self");
}
function otvoriPregled()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("pregled.html","_self");
    
}
function otvoriRecept()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("recept.html","_self");
}

function otvoriDashboard()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("index.html","_self");
}
function otvoriIndex()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("index.html","_self");
}

