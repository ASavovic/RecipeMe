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


