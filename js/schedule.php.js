$(document).ready(function () {
    var projectModel = new SchedulingProjectModel();

    projectModel.loadProjects(function () {
        var element = document.getElementsByClassName('listview')[0];
        var projectView = new SchedulingProjectView(projectModel, element);
        var controller = new ProjectController(projectModel, projectView);
        projectView.draw();
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
                modal.hideModal();
            });
        });

        modal.addButton('Cancel', 'default', function () {
            modal.hideModal();
        });
        modal.showModal();
    });





    // Code for Add item button
    $('#generate-schedule').click(function () {

        var modal = new Modal(300, 200, 'Generate Schedule', '../modal_layouts/generate_schedule.php');
        modal.addButton('Save', 'primary', function () {
            projectId = $('li.selected').data('id');

            var locale = window.navigator.userLanguage || window.navigator.language;
            moment.locale(locale);

            //var shoutDate = moment($('.calendar').val(), "L").format('YYYY-MM-DD 00:00:00');
            //var shoutTime = moment($('.clock').val(), "h:mm A").format('YYYY-MM-DD HH:mm:00');
            //var shoutText = $('#shoutText').val();
            
            //$.post("../save_shout.php", { shoutDate: shoutDate, shoutTime: shoutTime, projectId: projectId, shoutText: shoutText }, function (data) {
            //    modal.hideModal();
            //});
        });

        modal.addButton('Cancel', 'default', function () {
            modal.hideModal();
        });
        modal.showModal();
    });
});