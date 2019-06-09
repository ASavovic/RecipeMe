// Call the dataTables jQuery plugin
$(document).ready(function() {
    var data=[];
     fetch("../../Administrator/php/lekari.php").then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then((listaLekara)=>{
       listaLekara.lekari.forEach((lekar)=>
       {
           var obj=
           {
               "Name": lekar.ime,
                "Surname" : lekar.prezime,
                "Vocation" :lekar.zvanje,
                "Rating" : "<div class='stars-outer'>\n\
                            <div  class='stars-inner'></div>\n\
                            </div>\n\
                            <span  class='number-rating'></span>"    
           };
          data.push(obj); 
       });
       $('#dataTable').DataTable(
               {
                    "pageLength": 25,
            "ordering":false,
             "columns":[
            {"data":"Name"},
            {"data":"Surname"},
            {"data":"Vocation"},
            {"data":"Rating"}
        ],
        "data": data
               });
         dodeliKlase();
         //izracunavanjeOcenaLekara();
         
       
   })
           .catch(error => console.log(error));
  
});
