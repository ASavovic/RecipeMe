// Call the dataTables jQuery plugin
 
$(document).ready(function() {
  var data = [];
  var result= fetch("../php/lekari.php").then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then(response =>{
      
       response.lekari.forEach((element) => {
           var obj = { 
               "Name": element.ime,
               "Surname": element.prezime,
               "SSN": element.jmbg,
               "Shift": element.smena,
               "ChangeShift":"<form><label class='radio-inline mr-2'><input  type='radio' name='"+element.id+"'id='"+element.id+"' value='1'> first</label><label class='radio-inline  mr-2'><input  type='radio' name='"+element.id+"' id='"+element.id+"' value='2'> second</label><label class='radio-inline  mr-2'><input type='radio' name='"+element.id+"'id='"+element.id+"' value='3'> night</label></form>"
                
           };
           data.push(obj);
        });
        $('#dataTable').DataTable({
        "columns":[
            {"data":"Name"},
            {"data":"Surname"},
            {"data":"SSN"},
            {"data":"Shift"},
            {"data":"ChangeShift"},
        ],
        "data": data
      
  });
   popuniRadioDugmad(response);
       })
           .catch(error => console.log(error));


   
   
                    
                    
  
  
});


/*$(document).ready(function() {
    $('#dataTable').DataTable( {
        order: [[ 3, 'desc' ], [ 0, 'asc' ]]
    } );
} );*/