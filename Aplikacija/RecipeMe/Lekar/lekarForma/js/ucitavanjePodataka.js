

const profil=document.getElementById("profile");
const patients=document.getElementById("patients");
const notifications=document.getElementById("notifications");
const notify=document.getElementById("notify");
const dashboard=document.getElementById("dashboard");
const doctor=document.getElementById("doctor");


podesiValue();
profil.onclick=(ev)=>otvoriProfil();
patients.onclick=(ev)=>otvoriPatients();
notifications.onclick=(ev)=>otvoriNotifications();
notify.onclick=(ev)=>otvoriNotify();
dashboard.onclick=(ev)=>otvoriDashboard();
doctor.onclick=(ev)=>otvoriIndex();

function podesiValue()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("docName");
    return username;
}
function otvoriProfil()
{
   
    window.open("profile.html","_self");
}
function otvoriPatients()
{
    
    window.open("patients.html","_self");
    
}
function otvoriNotifications()
{
    
    window.open("notifications.html","_self");
}
function otvoriNotify()
{
   
 
    window.open("notify.html","_self");
}
function otvoriDashboard()
{

    window.open("index.html","_self");
}
function otvoriIndex()
{
 
    window.open("index.html","_self");
}

