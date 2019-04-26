$('.toast').toast('show');

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
    var username = url.searchParams.get("name");
    return username;
}
function otvoriProfil()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("profile.html?name="+ url_safe_username,"_self");
}
function otvoriPatients()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("patients.html?name="+ url_safe_username,"_self");
    
}
function otvoriNotifications()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("notifications.html?name="+ url_safe_username,"_self");
}
function otvoriNotify()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("notify.html?name="+ url_safe_username,"_self");
}
function otvoriDashboard()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("index.html?name="+ url_safe_username,"_self");
}
function otvoriIndex()
{
    let myu=podesiValue();
    var url_safe_username = encodeURIComponent(myu); 
    window.open("index.html?name="+ url_safe_username,"_self");
}