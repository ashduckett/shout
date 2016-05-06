$(document).ready(function () {

    //var items = [];

    console.log('Javascript start');
    var projectModel = new SchedulingProjectModel();


    projectModel.loadProjects(function () {
        console.log('inside loadProjects callback');
        var element = document.getElementsByClassName('listview')[0];
        var projectView = new SchedulingProjectView(projectModel, element);


        var controller = new ProjectController(projectModel, projectView);

        console.log('about to call draw');
        projectView.draw();
    });
    console.log('projects loaded');


    var shoutModel = new ShoutModel();

    // Once this is called, the shouts will exist on the ShoutModel object
    
    // So you need to know which project has just been clicked on.
    
    // Nothing should be loaded until the project is clicked. So you need an event on each project that brings out the id.
    //shoutModel.loadShouts(3, function () {
        
    //    var element = document.getElementsByClassName('shout-table');
//        var shoutView = new ShoutView(shoutModel, element);



  //      console.log('about to call draw on shout view');
    
        // This is fixed. It needs to be dynamic!
    //    shoutView.draw();


        // Get hold of the element to put the table on
    //});



    // function ProjectController(model, view) {
    // function SchedulingProjectModel() {
    // function SchedulingProjectView(model, element) {




    /*$.getJSON('API.php', { method: 'get_all', type: 'SchedulingProject' }, function (data) {

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

    // What does the script return if it finds nothing? It returns 0.
    var url = "get_shout_page.php";
    $('.shout-table').shoutTable(url, {project_id: id, page_no: 1});
            
            

    });
    });*/


    /*  $('#new-project').click(function () {
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
    });*/

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