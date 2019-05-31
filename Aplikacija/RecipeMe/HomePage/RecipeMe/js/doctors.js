
fetch("../../../Pacijent/php/vratiSlike.php")
        .then(response =>{
     if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(slike=>prikaziPodatke(slike))
           .catch(error => console.log(error));
   
   
   function prikaziPodatke(slike)
   {
       let innerHtml=" ";
       slike.forEach(s =>{
         
          
           const div=document.createElement("div");
           div.className="staff";
           const slika=document.createElement("img");
           slika.src=s.slika;
           slika.className="rounded";
           slika.className="img-thumbnail";
           slika.style.width="50%";
           div.appendChild(slika);
           div.style.width="100%";
           div.style.textAlign="center";
           document.getElementById("doktori"). appendChild(div);
           const divText=document.createElement("div");
           divText.className="info text-center";
           const h2=document.createElement("h2");
           h2.innerHTML="Employee of the month";
           const p=document.createElement("p");
           p.innerHTML=s.doktor+"<br>"+s.opis;
           divText.appendChild(h2);
           divText.appendChild(p);
          
           div.appendChild(divText);
           //document.getElementById("doktori"). appendChild(divText);
            
           
       }

         
           
       );
   
      
   }


