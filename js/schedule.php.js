$(document).ready(function () {

























    var items = [];

    $.getJSON('get_all_scheduled_projects.php', function (data) {
        $('.listview').listView(data, function (id) {

            var deleteProjectModal = new Modal(400, 100, "Confirm", "modal_layouts/delete_project.php");

            deleteProjectModal.addButton('No!', 'default', function () {
                deleteProjectModal.hideModal();
            });

            deleteProjectModal.addButton('Yip!', 'primary', function () {

                // Should have access to id so deletion should be simple

                $.post("delete_scheduled_project.php", { projId: id })
                        .done(function (data) {
                            deleteProjectModal.hideModal();

                            // You'll also want to hide the project somehow.
                            // Deleting is working though.
                        });



            });

            deleteProjectModal.showModal();
        }, function (id) {
            alert('edit button callback');
        }, function (id) {

            $.getJSON('get_all_shouts.php', { project_id: id }, function (data) {
                $('.shout-table').find('table').remove();
                $('.shout-table').shoutTable(data);
            });












            // In here I guess we want to ajax the table into the table area.

            // Is this going to be a plugin or just a file? File sounds okay for now. The file will have to:
            //  Get all shouts
            // Iterate over them adding them to the table

            // That should do for now

        });
    });


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

    // Code for Add item button
    $('#new-shout').click(function () {

        var modal = new Modal(300, 200, 'Add Shout', '../modal_layouts/add_shout.php');
        modal.addButton('Save', 'primary', function () {
            projectId = $('li.selected').data('id');

            var locale = window.navigator.userLanguage || window.navigator.language;


            moment.locale(locale);
            var shoutDate = moment($('.calendar').val(), "L").format('YYYY-MM-DD 00:00:00');
            var shoutTime = moment($('.clock').val(), "h:mm A").format('YYYY-MM-DD HH:mm:00');
            var shoutText = $('#shoutText').val();



            $.post("../save_shout.php", { shoutDate: shoutDate, shoutTime: shoutTime, projectId: projectId, shoutText: shoutText }, function (data) {
                // Update the table here
                //    $( ".result" ).html( data );


                modal.hideModal();
            });


        });

        modal.addButton('Cancel', 'default', function () {
            modal.hideModal();
        });
        modal.showModal();
    });



});


/*
    I think the next thing to do is to figure out how to display the shouts.
    I think we'd decided on using a table, which is fine.

    The question now is how to hook an event up to the list view items. Select a project and what should fire?

    Callback?

    And how should the table be presented? Updated?

*/