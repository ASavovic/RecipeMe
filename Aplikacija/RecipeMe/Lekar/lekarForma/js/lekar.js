$('.toast').toast('show');

const profil=document.getElementById("profile");
const patients=document.getElementById("patients");
const notifications=document.getElementById("notifications");
const notify=document.getElementById("notify");
const dashboard=document.getElementById("dashboard");


podesiValue();
profil.onclick=(ev)=>otvoriProfil();
patients.onclick=(ev)=>otvoriPatients();
notifications.onclick=(ev)=>otvoriNotifications();
notify.onclick=(ev)=>otvoriNotify();
dashboard.onclick=(ev)=>otvoriDashboard();

function podesiValue()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("name");
    profil.value=username;
}
function otvoriProfil()
{
    let myu=profil.value;
    var url_safe_username = encodeURIComponent(myu); 
    window.open("profile.html?name="+ url_safe_username,"_self");
}
function otvoriPatients()
{
    let myu=profil.value;
    var url_safe_username = encodeURIComponent(myu); 
    window.open("patients.html?name="+ url_safe_username,"_self");
    
}
function otvoriNotifications()
{
    let myu=profil.value;
    var url_safe_username = encodeURIComponent(myu); 
    window.open("notifications.html?name="+ url_safe_username,"_self");
}
function otvoriNotify()
{
    let myu=profil.value;
    var url_safe_username = encodeURIComponent(myu); 
    window.open("notify.html?name="+ url_safe_username,"_self");
}
function otvoriDashboard()
{
    let myu=profil.value;
    var url_safe_username = encodeURIComponent(myu); 
    window.open("index.html?name="+ url_safe_username,"_self");
}