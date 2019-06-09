    jQuery(function ($) {
        $("#export").click(function () {
            // parse the HTML table element having an id=exportTable
            var dataSource = shield.DataSource.create({
                data: "#dataTable5",
                schema: {
                    type: "table",
                    fields: {
                        Name: { type: String },
                        Surname: { type: String },
                        SSN: { type: String },
                        Phone: { type: String },
                        Email: { type: String },
                        Day: { type: String },
                        Appointment: { type: String }
                    }
                }
            });

            // when parsing is done, export the data to PDF
            dataSource.read().then(function (data) {
                var pdf = new shield.exp.PDFDocument({
                    author: "RecimeMe",
                    created: new Date()
                });

                pdf.addPage("a4", "landscape");

                pdf.table(
                    50,
                    50,
                    data,
                    [
                        { field: "Name", title: " Name", width: 100 },
                        { field: "Surname", title: "Surname", width: 100 },
                        { field: "SSN", title: "SSN", width: 100 },
                         { field: "Phone", title: "Phone", width: 100},
                        { field: "Email", title: "Email", width: 150},
                        { field: "Day", title: "Day", width: 100 },
                        { field: "Appointment", title: "Appointment", width: 100 }
                    ],
                    {
                        margins: {
                            top: 50,
                            left: 50
                        }
                    }
                );

                pdf.saveAs({
                    fileName: "Appointments"
                });
            });
        });
    });

 jQuery(function ($) {
        $("#exportExcel").click(function () {
            // parse the HTML table element having an id=exportTable
            var dataSource = shield.DataSource.create({
                data: "#dataTable5",
                schema: {
                    type: "table",
                      fields: {
                        Name: { type: String },
                        Surname: { type: String },
                        SSN: { type: String },
                        Phone: { type: String },
                        Email: { type: String },
                        Day: { type: String },
                        Appointment: { type: String }
                    }
                }
            });

            // when parsing is done, export the data to Excel
            dataSource.read().then(function (data) {
                new shield.exp.OOXMLWorkbook({
                    author: "PrepBootstrap",
                    worksheets: [
                        {
                            name: "Appointments Table",
                            rows: [
                                {
                                    cells: [
                                        {
                                            style: {
                                                bold: true
                                                
                                                
                                            },
                                            type: String,
                                            value: "Name"
                                             
                                        },
                                        {
                                            style: {
                                                bold: true
                                            },
                                            type: String,
                                            value: "Surname"
                                            
                                        },
                                        {
                                            style: {
                                                bold: true
                                            },
                                            type: String,
                                            value: "SSN"
                                        },
                                        {
                                            style: {
                                                bold: true
                                            },
                                            type: String,
                                            value: "Phone"
                                        },
                                        {
                                            style: {
                                                bold: true
                                            },
                                            type: String,
                                            value: "Email"
                                            
                                        },
                                        {
                                            style: {
                                                bold: true
                                            },
                                            type: String,
                                            value: "Day"
                                        },
                                        {
                                            style: {
                                                bold: true
                                            },
                                            type: String,
                                            value: "Appointment"
                                        }
                                    ]
                                }
                            ].concat($.map(data, function(item) {
                                return {
                                    cells: [
                                        { type: String, value: item.Name },
                                        { type: String, value: item.Surname },
                                        { type: String, value: item.SSN },
                                        { type: String, value: item.Phone },
                                        { type: String, value: item.Email },
                                        { type: String, value: item.Day },
                                        { type: String, value: item.Appointment }
                                    ]
                                };
                            }))
                        }
                    ]
                }).saveAs({
                    fileName: "Appointments"
                });
            });
        });
    });
function dodeliFunkcijeDugmicima()
{
    let nizDugmadi=document.querySelectorAll("button");
    nizDugmadi.forEach(d => {
        d.onclick=(ev) => obrisiZakazaniTermin(d);
    });
}

function obrisiZakazaniTermin(d)
{
    fetch("../../php/obrisiTermin.php?id="+d.id).then(response=>
   {
       if(!response.ok)
           throw new Error(response.statusText)
      
   }).then(()=>{
       location.reload();
   })
           .catch(error => console.log(error));
}