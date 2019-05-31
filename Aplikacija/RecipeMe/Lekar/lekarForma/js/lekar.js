$('.toast').toast('show');

const profil=document.getElementById("profile");
const patients=document.getElementById("patients");
const notifications=document.getElementById("notifications");
const notify=document.getElementById("notify");
const dashboard=document.getElementById("dashboard");
const doctor=document.getElementById("doctor");
const termin=document.getElementById("termin");
const logOut=document.getElementById("userDropdown");
logOut.onclick=(ev)=>odjaviSe();

function odjaviSe()
{
    $("#logoutModal").modal('show');
}

podesiValue();
profil.onclick=(ev)=>otvoriProfil();
patients.onclick=(ev)=>otvoriPatients();
notifications.onclick=(ev)=>otvoriNotifications();
notify.onclick=(ev)=>otvoriNotify();
dashboard.onclick=(ev)=>otvoriDashboard();
doctor.onclick=(ev)=>otvoriIndex();
termin.onclick=(ev)=>otvoriTermine();

function podesiValue()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("name");
    return username;
}
function otvoriTermine()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("zakazaniTermini.html","_self");
    
}
function otvoriProfil()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("profile.html","_self");
}
function otvoriPatients()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("patients.html","_self");
    
}
function otvoriNotifications()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("notifications.html","_self");
}
function otvoriNotify()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("notify.html","_self");
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