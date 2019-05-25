
fetch("../../../Pacijent/php/vratiSlike.php")
        .then(response =>{
     if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(slike=>prikaziPodatke(slike))
           .catch(error => console.log(error));
   
   
   function prikaziPodatke(slike)
   {
       let innerHtml=document.getElementById("doktori").innerHTML;
       slike.forEach(s =>{
            let element="<div class='col-lg-3 col-md-6 d-flex mb-sm-4 ftco-animate'><div class='staff'>\n\
 <div class='img mb-4' style='background-image: url("+s.slika+");'></div>\n\
<div class='info text-center'><h3><a href='teacher-single.html'>Patricia Jacobson</a></h3>\n\
<span class='position'>Psychiatrist</span><div class='text'><p>"+s.opis+"</p><ul class='ftco-social'> </ul></div></div></div></div>";
           innerHtml+=element;
           document.getElementById("doktori"). innerHTML=innerHtml;
       });
   
      
   }


