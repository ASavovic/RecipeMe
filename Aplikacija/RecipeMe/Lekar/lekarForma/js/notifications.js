var name=sessionStorage.getItem("name");
fetch("../../php/vratiObavestenja.php?username="+name).then(response=>
{
    if(!response.ok)
        throw new Error(response.statusText)
    else return response.json();
}).then(listaObavestenja=>prikaziObavestenja(listaObavestenja))
        .catch(error => console.log(error));

const kontenjerDiv=document.getElementById("father");
function prikaziObavestenja(lista)
{
    kontenjerDiv.innerHTML="";
    if(lista.obavestenja.length==0)
    {
        kontenjerDiv.innerHTML="There is no any new notifications...";
    }
    else{
        lista.obavestenja.reverse().forEach((obavestenje)=>
        {
            
            let kontenjer=document.createElement("div");
            //kontenjer.align='left';
            kontenjer.className="toast fade show";
            kontenjer.setAttribute('role','alert');
            kontenjer.setAttribute('aria-live','assertive');
            kontenjer.setAttribute('aria-atomic','true');
            kontenjer.setAttribute('data-autohide','false');
            
            let zaglavlje=document.createElement("div");
            zaglavlje.className="toast-header bg-primary text-white";
          
            
            let naslov =document.createElement("strong");
            naslov.innerHTML="RecipeMe Administrator";
            naslov.className="mr-auto";
            zaglavlje.appendChild(naslov);
            
            let datum=document.createElement("small");
            datum.innerHTML="Date: "+obavestenje.datum+"<br>Time: "+obavestenje.vreme;
            zaglavlje.appendChild(datum);
            
            let dugme=document.createElement("button");
            dugme.className="ml-2 mb-1 close";
            dugme.setAttribute('type','button');
            dugme.setAttribute('data-dismiss','toast');
            dugme.setAttribute('aria-label','Close');
            dugme.value=obavestenje.id;
            dugme.innerHTML="×";
            dugme.onclick=(ev)=>ponistenoObavestenje(ev.target);
            /*let spanElement=document.createElement("span");
            spanElement.setAttribute('aria-hidden','true');
            spanElement.innerHTML="×";
            dugme.appendChild(spanElement);*/
            zaglavlje.appendChild(dugme);
            
            let telo=document.createElement("div");
            telo.className="toast-body";
            telo.innerHTML=obavestenje.text_poruke;
            kontenjer.appendChild(zaglavlje);
            kontenjer.appendChild(telo);
            kontenjerDiv.appendChild(kontenjer);
        });
    }
        
}
function ponistenoObavestenje(dugme)
{
    fetch("../../php/ponistiObavestenje.php?username="+name+"&id="+dugme.value).then(response=>
{
    if(!response.ok)
        throw new Error(response.statusText)
    else return response.json();
}).then(listaObavestenja=>prikaziObavestenja(listaObavestenja))
        .catch(error => console.log(error));
}