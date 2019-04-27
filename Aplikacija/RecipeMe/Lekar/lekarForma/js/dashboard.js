const tabela=document.getElementById("dataTable");
var idPacijenta;

var nizPacijenata=[];
var listaPacijenataPod=[];

let docUsername;

prikaziPacijente();

function prikaziPacijente(){
   const formData=new FormData();
   var url_string = window.location.href;
   var url = new URL(url_string);
   var username = url.searchParams.get("name");
   
   formData.append("username",username);
   
   
    const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    
   fetch("../php/pacijenti.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(listaPacijenata=>prikaziPodatke(listaPacijenata))
           .catch(error => console.log(error));
   
   docUsername = username;
}
  
 var id;   
function prikaziPodatke(listaPacijenata)
{
let innerHTMLTabele = "<thead  class='rounded-top' style=' text-align:center;'><tr><th>Name</th><th>Surname</th><th>SSN</th><th>Phone number</th><th>E-mail</th><th>Chronic patient</th><th>Diagnosis</th><th>Medicines</th><th>Allowed dose</th><th>Control</th><th>Served Number</th><th>Process</th></tr></thead>\n\
<tfoot style='text-align:center'><tr><th>Name</th><th>Surname</th><th>SSN</th><th>Phone number</th><th>E-mail</th><th>Chronic Patient</th><th>Diagnosis</th><th>Medicines</th><th>Allowed dose</th><th>Control</th><th>Served Number</th><th>Process</th></tr></tfoot><tbody>";

    listaPacijenata.pacijenti.forEach((pacijent) =>  {  
        id=1;
        let pom=false;
        if(pacijent.hronicniBolesnik==1)
            pom=true;
        let dijagnoza="None";
        if(pacijent.dijagnoza!=null)
            dijagnoza=pacijent.dijagnoza;
        let medikamenti="None";
        if(pacijent.medikamenti!=null)
            medikamenti=pacijent.medikamenti;
        if(pom==true)    
        { innerHTMLTabele += "<tr id='"+id+"'><td>"+ pacijent.ime +"</td><td>"+ pacijent.prezime 
                + "</td><td>"+pacijent.jmbg+"</td><td>"+pacijent.telefon+"</td><td>"+ pacijent.email+"</td>\n\
           <td ><input class='ml-3' name='"+pacijent.id+"' type='checkbox' checked disabled/></td>\n\
          <td><textarea id='dijagnoza"+pacijent.id+"' name='"+pacijent.id+"' disabled>"+dijagnoza+"</textarea></td>\n\
          <td><textarea id='medikamenti"+pacijent.id+"' name='"+pacijent.id+"' disabled>"+medikamenti+"</textarea></td>\n\
          <td><input type='number'  id='doza"+pacijent.id+"' value='"+pacijent.doza+"' disabled/></td>\n\
          <td><input type='number'  id='kontrola"+pacijent.id+"' value='"+pacijent.kontrola+"' disabled/></td>\n\
          <td>"+ pacijent.brojPreuzetih +"</td><td><button class='btn btn-primary' name='process' id="+pacijent.id+">Process</button>"
                +"</td></tr>";
        }
        else
        {
            innerHTMLTabele += "<tr id='"+id+"'><td>"+ pacijent.ime +"</td><td>"+ pacijent.prezime 
                + "</td>\n\
            <td>"+pacijent.jmbg+"</td><td>"+ pacijent.email+"</td>\n\
            <td ><input class='ml-3' name='"+pacijent.id+"' type='checkbox' disabled/></td>\n\
            <td><textarea id='dijagnoza"+pacijent.id+"' name='"+pacijent.id+"' disabled>"+dijagnoza+"</textarea></td>\n\
            <td><textarea id='medikamenti"+pacijent.id+"' name='"+pacijent.id+"' disabled>"+medikamenti+"</textarea></td>\n\
            <td><input type='number'  id='doza"+pacijent.id+" 'value='"+pacijent.doza+"' disabled/></td>\n\
            <td><input type='number'  id='kontrola"+pacijent.id+"' value='"+pacijent.doza+"' disabled/></td>\n\
            <td><button class='btn btn-primary' name='process' id="+pacijent.id+">Process</button>"
                +"</td></tr>";
        }
      
    });
    innerHTMLTabele += "</tbody>";   
    tabela.innerHTML = innerHTMLTabele;
    id++;
    
    nizPacijenata = listaPacijenata;
   
  let nizDugmadi=document.querySelectorAll("button[name='process']");
  nizDugmadi.forEach(d => 
  {d.onclick=(ev)=>otvoriNovuStranicu(d);});
}

function otvoriNovuStranicu(korisnik)
{
    if(korisnik==null)
    {
        let tmp=document.getElementById("alert");
        let innerHtml="<div class='alert alert-danger' role='alert'><strong> </strong> \n\
            <a href='#' class='alert-link'>User does not exist!</a>\n\
           </div>";
        tmp.innerHTML=innerHtml;
        tmp.style.visibility="inherit";
        tmp.style.textAlign="center";
    }
    else
    {
        let patUsername;
        let myu = korisnik.id
        nizPacijenata.pacijenti.forEach((pacijent) =>  {
            if(pacijent.id == myu)
                patUsername = pacijent.korisnickoIme;
        });
        var url_safe_username = encodeURIComponent(docUsername);
        var url_safe_username2 = encodeURIComponent(patUsername);
        window.open("obradaPacijenta.html?docName="+ url_safe_username + "&patName="+ url_safe_username2,"_self");
        //window.location.href="index.html";
        /*window.open("index.html");*/
    }
}