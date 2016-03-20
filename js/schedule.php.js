$(document).ready(function () {

    $('#new-project').click(function () {
        var modal = new Modal(500, 200, 'Add Project', '../modal_layouts/add_project.php');
    
        modal.addButton('Save', 'primary', function () {
            var name = $('#project-name').val();

            $.post("../save_project.php", { name: name }, function (data) {
                //    $( ".result" ).html( data );
                // This is where you'll add the project to the UI

                modal.hideModal();
            });
        });

        modal.addButton('Close', 'default', function () {
            modal.hideModal();
        });

        modal.showModal();
    });



});