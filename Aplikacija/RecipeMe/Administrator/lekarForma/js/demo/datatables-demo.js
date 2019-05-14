// Call the dataTables jQuery plugin
 
$(document).ready(function() {
  var data = [];
  var data1=[];
  var data2=[];
  var data3=[];
  var result0=fetch("../php/pacijenti.php").then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else 
           return response.json();
   }).then((response)=>{
       response.forEach((element) => {
           let hronicni="No";
           let bolest="None";
           if(element.hronicniBolesnik=="1")
               hronicni="Yes";
           if(element.dijagnoza!=null)
               bolest=element.dijagnoza;
           var obj = { 
               "Name Surname": element.ime+ " "+element.prezime,
               "SSN": element.jmbg,
               "Phone Number": element.telefon,
                "Username" : element.korisnickoIme,
                "Password" : element.sifra,
                "Email" :element.email,
                "Chronic Patient" : hronicni,
                "Disease": bolest,
                "Delete" : "<input  type='checkbox' name='"+element.id+"' value='"+element.id+"'/>  Check to delete"
                
                      
           };
           data2.push(obj);
       });
            $('#dataTable2').DataTable({
        "columns":[
            {"data":"Name Surname"},
            {"data":"SSN"},
            {"data":"Phone Number"},
            {"data":"Username"},
            {"data":"Password"},
            {"data":"Email"},
            {"data":"Chronic Patient"},
            {"data":"Disease"},
            {"data":"Delete"}
        ],
        "data": data2
      
  });

       
   
    }).catch(error => console.log(error));
    
   
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
           var obj1={
                      "Name" : element.ime,
                      "Surname" : element.prezime,
                      "SSN" : element.jmbg,
                      "Vocation" : element.zvanje,
                      "Username" : element.korisnickoIme,
                      "Password" : element.sifra,
                       "Email" :element.email,
                       "Shift" : element.smena,
                       "Delete" : "<input  type='checkbox' name='"+element.id+"' value='"+element.id+"'/>  Check to delete"
 
           };
           data1.push(obj1);
            var obj2={
                      "Name" : element.ime,
                      "Surname" : element.prezime,
                      "Vocation" : element.zvanje,
                      "Email" :element.email,
                      "Check Doctor" : "<input type='checkbox' name='"+element.id+"'id='"+element.ime+"' value='"+element.email+"'> Send email"
                         
 
           };
           data3.push(obj2);
        });
        $('#dataTable').DataTable({
        "columns":[
            {"data":"Name"},
            {"data":"Surname"},
            {"data":"SSN"},
            {"data":"Shift"},
            {"data":"ChangeShift"}
        ],
        "data": data
      
  });
  if(typeof (popuniRadioDugmad)===typeof(Function))
     popuniRadioDugmad(response);
   $('#dataTable1').DataTable({
        "columns":[
            {"data":"Name"},
            {"data":"Surname"},
            {"data":"SSN"},
            {"data":"Vocation"},
            {"data":"Username"},
            {"data":"Password"},
            {"data":"Email"},
            {"data":"Shift"},
            {"data":"Delete"}
        ],
        "data": data1
      
  });
          $('#dataTable3').DataTable({
        "columns":[
            {"data":"Name"},
            {"data":"Surname"},
            {"data":"Vocation"},
            {"data":"Email"},
            {"data":"Check Doctor"}
        ],
        "data": data3
      
  });
  
       })
           .catch(error => console.log(error));

   

   
   
                    
                    
  
  
});


/*$(document).ready(function() {
    $('#dataTable').DataTable( {
        order: [[ 3, 'desc' ], [ 0, 'asc' ]]
    } );
} );*/