const tabela=document.getElementById("dataTable");
const confirmDugme=document.getElementById("confirmChange");
var idPacijenta;
confirmDugme.onclick=(ev)=>azurirajHronicneBolesnike(ev);

var nizPacijenata=[];
var listaPacijenataPod=[];

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
   
    
   fetch("../../php/pacijenti.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(listaPacijenata=>prikaziPodatke(listaPacijenata))
           .catch(error => console.log(error));
    
}
  
 var id;   
function prikaziPodatke(listaPacijenata)
{

/*let innerHTMLTabele = "<thead  class='rounded-top' style=' text-align:center;'><tr><th>Name</th><th>Surname</th><th>SSN</th><th>E-mail</th><th>Chronic patient</th><th>Diagnosis</th><th>Medicines</th><th>Allowed dose</th><th>Control</th><th>Edit</th></tr></thead>\n\
<tfoot style='text-align:center'><tr><th>Name</th><th>Surname</th><th>SSN</th><th>E-mail</th><th>Chronic Patient</th><th>Diagnosis</th><th>Medicines</th><th>Allowed dose</th><th>Control</th><th>Edit</th></tr></tfoot><tbody>";
*/
    //listaPacijenata.pacijenti.forEach((pacijent) =>  {  
       /* id=1;
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
                + "</td><td>"+pacijent.jmbg+"</td><td>"+ pacijent.email+"</td>\n\
           <td ><input class='ml-3' name='"+pacijent.id+"' type='checkbox' checked disabled/></td>\n\
          <td><textarea id='dijagnoza"+pacijent.id+"' name='"+pacijent.id+"' disabled>"+dijagnoza+"</textarea></td>\n\
          <td><textarea id='medikamenti"+pacijent.id+"' name='"+pacijent.id+"' disabled>"+medikamenti+"</textarea></td>\n\
          <td><input type='number'  id='doza"+pacijent.id+"' value='"+pacijent.doza+"' disabled/></td>\n\
          <td><input type='number'  id='kontrola"+pacijent.id+"' value='"+pacijent.kontrola+"' disabled/></td>\n\
          <td><button class='btn btn-primary' name='edit' id="+pacijent.id+">Edit</button>"
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
            <td><button class='btn btn-primary' name='edit' id="+pacijent.id+">Edit</button>"
                +"</td></tr>";
            
        }
      
    });
    innerHTMLTabele += "</tbody>";   
    tabela.innerHTML = innerHTMLTabele;
    id++;
   */

}
function podesiButton()
{
  let nizDugmadi=document.querySelectorAll("button[name='edit']");
  nizDugmadi.forEach(d => 
  {d.onclick=(ev)=>omoguciPromene(d);});
}

function omoguciPromene(d)
{
    
    if(d.innerHTML=="Edit")
    {
        idPacijenta=d.id;
        let nizElemenata=document.querySelectorAll("input[name='"+d.id+"'");
        const dijagnoza=document.getElementById("dijagnoza"+d.id);
        const medikamenti=document.getElementById("medikamenti"+d.id);
        const doza=document.getElementById("doza"+d.id);
        const kontrola=document.getElementById("kontrola"+d.id);
        nizElemenata.forEach(el => {
            el.disabled=false;
        });
        dijagnoza.disabled=false;
        if(dijagnoza.innerHTML=="None")
         dijagnoza.innerHTML="";
        medikamenti.disabled=false;
        if(medikamenti.innerHTML=="None")
           medikamenti.innerHTML="";
        doza.disabled=false;
        kontrola.disabled=false;
        d.innerHTML="Confirm";
    }
    else
    {
        let nizElemenata=document.querySelectorAll("input[name='"+idPacijenta+"'");
        const dijagnoza=document.getElementById("dijagnoza"+idPacijenta);
        const medikamenti=document.getElementById("medikamenti"+idPacijenta);
        const doza=document.getElementById("doza"+idPacijenta);
        const kontrola=document.getElementById("kontrola"+idPacijenta);
        if(nizElemenata[0].checked==true)
        {
            if(dijagnoza.value=="" || medikamenti.value=="")
            { 
                $('#warningModal').modal('show');
                return;
            }
            else
            {
               $('#confirmModal').modal('show'); 
            }
        }
        else
        {
            dijagnoza.value="";
            medikamenti.value="";
        }
        $('#confirmModal').modal('show');
        
        
    }
  
}

function azurirajHronicneBolesnike(ev)
{
    
     $('#confirmModal').modal('hide');
        let nizElemenata=document.querySelectorAll("input[name='"+idPacijenta+"'");
        const dijagnoza=document.getElementById("dijagnoza"+idPacijenta);
        const medikamenti=document.getElementById("medikamenti"+idPacijenta); 
        const doza=document.getElementById("doza"+idPacijenta);
        const kontrola=document.getElementById("kontrola"+idPacijenta); 
        var url_string = window.location.href;
        var url = new URL(url_string);
        var username = url.searchParams.get("name");
        
        const formData=new FormData();
        let pom=0;
        if(nizElemenata[0].checked==true)
            pom=1;
        
        let date=new Date();
        let datum=date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
        formData.append("pacijent",idPacijenta);
        formData.append("hronicni",pom);
        formData.append("dijagnoza",dijagnoza.value);
        formData.append("medikamenti",medikamenti.value);
        formData.append("doktor",username);
        formData.append("doza",doza.value);
        formData.append("kontrola",kontrola.value);
        formData.append("datum",datum);
        
        const fetchData =
            {
                method:"POST",
                body: formData
            }
   
    
   fetch("../../php/promeniHronicnogPacijenta.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       
   }).then(()=>{$('#okModal').modal('show');})
           .catch(error => console.log(error));   
    
    nizElemenata.forEach(el => {
            el.disabled=true;
        });
        dijagnoza.disabled=true;
        medikamenti.disabled=true;
        doza.disabled=true;
        kontrola.disabled=true;
       document.getElementById(idPacijenta).innerHTML="Edit";
       
      
       
}