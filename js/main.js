$(document).ready(function () {
    console.log('something');
    console.log(document.location.hostname);
    $('#menu-item-accounts').click(function () {

        var modal = new Modal(500, 500, "Add a Social Media Account...", '../modal_layouts/add_account.php');

        modal.addButton('Close', '', function () {
            modal.hideModal();
        });

        modal.showModal();
    });

    $('#menu-item-scheduling').click(function () {
        window.open(rootFolder + '/schedule.php', '_self');
    });
});