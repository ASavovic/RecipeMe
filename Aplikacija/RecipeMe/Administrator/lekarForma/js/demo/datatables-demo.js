// Call the dataTables jQuery plugin
/*$(document).ready(function() {
  $('#dataTable').DataTable();
  
});
*/

$(document).ready(function() {
    $('#dataTable').DataTable( {
        order: [[ 3, 'desc' ], [ 0, 'asc' ]]
    } );
} );