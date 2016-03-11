$(document).ready(function () {
    
    
    function Modal() {
        
    }

    // Create button objects and pass them in along with their callbacks





    $('#menu-item-accounts').click(function () {
        $.showModal(400, 300, "Account Addition...", '../modal_layouts/add_account.php');
    });
});