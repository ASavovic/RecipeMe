


// Call the dataTables jQuery plugin
$(document).ready(function() {
   const formData=new FormData();
   /*var url_string = window.location.href;
   var url = new URL(url_string);
   var username = url.searchParams.get("name");*/
  var username = sessionStorage.getItem("name");
   formData.append("username",username);
   var data=[];
   var data1=[];
   var data2=[];
   
    const fetchData =
            {
                method:"POST",
                body: formData
            };
   
    
   var result = fetch("../../php/pacijenti.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then((response)=>{
       var zaDugmice=0;
       response.pacijenti.forEach((pacijent)=>
       {
        let indikator="";
        let hronicni="No";
        if(pacijent.hronicniBolesnik=="1")
        {
            indikator="checked";
            hronicni="Yes";
        }
        let bolest="None";
        if(pacijent.dijagnoza!=null)
            bolest=pacijent.dijagnoza;
        let lekovi="None";
        if(pacijent.medikamenti!=null)
            lekovi=pacijent.medikamenti;
           var obj=
           {
               "Name": pacijent.ime,
                "Surname" : pacijent.prezime,
                "SSN" :pacijent.jmbg,
                "Phone Number" :pacijent.telefon,
                "Email" : pacijent.email,
                "Chronic Patient": "<input class='ml-3' name='"+pacijent.id+"' type='checkbox' "+indikator+" disabled/>",
                "Diagnosis" : bolest,
                "Medicines" : lekovi,
                "Process" : "<button  class='btn btn-primary' name='process' id="+pacijent.id+">Process</button>"
              
           };
           
           data.push(obj);
           
           var obj1={
                "Name": pacijent.ime,
                "Surname" : pacijent.prezime,
                "SSN" : pacijent.jmbg,
                "Email" : pacijent.email,
                "Chronic Patient": "<input class='ml-3' name='"+pacijent.id+"' type='checkbox' "+indikator+" disabled/>",
                "Diagnosis" : "<textarea id='dijagnoza"+pacijent.id+"' name='"+pacijent.id+"' disabled>"+bolest+"</textarea>",
                "Medicines" : "<textarea id='medikamenti"+pacijent.id+"' name='"+pacijent.id+"' disabled>"+lekovi+"</textarea>",
                "Allowed Dose":"<input type='number'  id='doza"+pacijent.id+"' value='"+pacijent.doza+"' disabled/>",
                "Control (Month)" :"<input type='number'  id='kontrola"+pacijent.id+"' value='"+pacijent.kontrola+"' disabled/>",
                "Edit": "<button class='btn btn-primary' name='edit' id="+pacijent.id+">Edit</button>"
             
           };
           data1.push(obj1);
           
           var obj2={
               "Name" : pacijent.ime,
               "Surname" : pacijent.prezime,
               "Phone Number": pacijent.telefon,
               "Email" : pacijent.email,
                "Chronic Patient": hronicni,
               "Disease" : bolest,
               "Check Patient" :"<input type='checkbox' name='"+pacijent.id+"'id='"+pacijent.ime+"' value='"+pacijent.email+"'> Send email"
              
           };
           data2.push(obj2);
          
       });
       $('#dataTable').DataTable(
          {
              "pageLength": 25,
        "columns":[
            {"data":"Name"},
            {"data":"Surname"},
            {"data":"SSN"},
            {"data":"Phone Number"},
            {"data":"Email"},
            {"data":"Chronic Patient"},
            {"data":"Diagnosis"},
            {"data":"Medicines"},
            {"data":"Process"}
        ],
        "data": data
    });
 

   
    $('#dataTable1').DataTable(
          {
              "pageLength": 25,
        "columns":[
            {"data":"Name"},
            {"data":"Surname"},
            {"data":"SSN"},
            {"data":"Email"},
            {"data":"Chronic Patient"},
            {"data":"Diagnosis"},
            {"data":"Medicines"},
            {"data":"Allowed Dose"},
            {"data":"Control (Month)"},
            {"data":"Edit"}
        ],
        "data": data1
    });
     $('#dataTable2').DataTable(
          {
              "pageLength": 25,
        "columns":[
            {"data":"Name"},
            {"data":"Surname"},
            {"data":"Phone Number"},
            {"data":"Email"},
            {"data":"Chronic Patient"},
            {"data":"Disease"},
            {"data":"Check Patient"}
           
        ],
        "data": data2
    });
    
   if(typeof(podesiButton)===typeof(Function))
       podesiButton();
    
   })
   .catch(error => console.log(error));
   
   const formData1=new FormData();
   formData1.append("username",username);

   const fetchData1=
   {
     method: "POST",
     body: formData1   
   }
   var data5=[];
   var result1=fetch("../../php/vratiTermine.php",fetchData).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
       else return response.json();
   }).then((response)=>
   {
       response.forEach(t =>
       {
           var obj5;
           
                obj5={
                   "Name":t.ime,
                   "Surname":t.prezime,
                   "SSN":t.jmbg,
                   "Phone":t.telefon,
                   "Email":t.email,
                   "Day":t.dan,
                   "Appointment":t.termin,
                   "Done":"<button class='btn btn-primary' id='"+t.id+"'>Done</button>"
                   };
               data5.push(obj5);
       });
        $('#dataTable5').DataTable(
          {
              "pageLength": 25,
        "columns":[
            {"data":"Name"},
            {"data":"Surname"},
            {"data":"SSN"},
             {"data":"Phone"},
            {"data":"Email"},
            
           
            {"data":"Day"},
            {"data":"Appointment"},
            {"data":"Done"}
           
        ],
        "data": data5
    });
       if(typeof(dodeliFunkcijeDugmicima)==typeof(Function))
           dodeliFunkcijeDugmicima();
       }).catch(error=>console.log(error));
           
     
       
      
       

 
 
    
});
