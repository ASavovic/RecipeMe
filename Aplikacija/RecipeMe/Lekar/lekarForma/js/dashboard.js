const tabela=document.getElementById("dataTable");
var idPacijenta;

var nizPacijenata=[];
var listaPacijenataPod=[];

let docUsername;

prikaziPacijente();

function prikaziPacijente(){
  
  const formData=new FormData();
   var username = sessionStorage.getItem("name");
   
   formData.append("username",username);
   
   
    const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    
   fetch("../../php/pacijenti.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(listaPacijenata=>prikaziPodatke(listaPacijenata))
           .catch(error => console.log(error));
   
   docUsername = username;
}
  
 
function podesiButton()
{
  
  let nizDugmadi=document.querySelectorAll("button[name='process']");
  nizDugmadi.forEach(d => 
  {
      d.onclick=(ev)=>otvoriNovuStranicu(d);
  });
}


function prikaziPodatke(listaPacijenata)
{

    listaPacijenata.pacijenti.forEach((pacijent) =>  {  
       /* id=1;

        let dijagnoza="None";
        if(pacijent.dijagnoza!=null)
            dijagnoza=pacijent.dijagnoza;
        let medikamenti="None";
        if(pacijent.medikamenti!=null)
            medikamenti=pacijent.medikamenti;
           
        innerHTMLTabele += "<tr id='"+id+"'><td>"+ pacijent.ime +"</td><td>"+ pacijent.prezime 
                + "</td><td>"+pacijent.jmbg+"</td><td>"+pacijent.telefon+"</td><td>"+ pacijent.email+"</td>\n\
           <td ><input class='ml-3' name='"+pacijent.id+"' type='checkbox' checked disabled/></td>\n\
          <td>"+dijagnoza+"</td>\n\
          <td>"+medikamenti+"<td><button class='btn btn-primary' name='process' id="+pacijent.id+">Process</button>"
                +"</td></tr>";
        */
       
      
    });
    /*innerHTMLTabele += "</tbody>";   
    tabela.innerHTML = innerHTMLTabele;
    id++;*/
    
    nizPacijenata = listaPacijenata;
    
  
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
        let myu = korisnik.id;
        nizPacijenata.pacijenti.forEach((pacijent) =>  {
            if(pacijent.id == myu)
                patUsername = pacijent.korisnickoIme;
        });
        var url_safe_username = sessionStorage.getItem("name");
        sessionStorage.setItem("patName",patUsername);
        window.open("obradaPacijenta.html","_self");
       // var url_safe_username2 = encodeURIComponent(patUsername);
       // window.open("obradaPacijenta.html?docName="+ url_safe_username + "&patName="+ url_safe_username2,"_self");
        //window.location.href="index.html";
        /*window.open("index.html");*/
    }
}