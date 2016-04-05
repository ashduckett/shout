<?php
    require_once 'header.php';
?>
        <div class="sidebar">
            <ul class="sidebar-listing">
                <li class="sidebar-header">Social Media</li>
                <li class="sidebar-item">Dashboard</li>
                <li class="sidebar-item">Projects</li>
                <li class="sidebar-item" id="new-project">New Project</li>
                <li class="sidebar-item">Import...</li>
                <li class="sidebar-item">Add New Account...</li>
                <li class="sidebar-header">Project</li>
                <li class="sidebar-item" id="new-shout">Add Item...</li>
                <li class="sidebar-item">Generate Schedule...</li>
                <li class="sidebar-item">Import To...</li>
                <li class="sidebar-item">Export From...</li>
                <li class="sidebar-item">Delete</li>
                <li class="sidebar-item">Advanced...</li>
            
            </ul>
        </div>
       
        <div class="listview-container">
            <ul class="listview">
                
               
            </ul>
        </div>
        
        <div class="container" style="background-color: yellow; width: 500px; height: 50%; margin-top: 10px; font-size: 0px; white-space: nowrap; float: left;">
            
            
            <div class="header" style="width: 33.33%; background-color: #0ff; display: inline-block; text-align: center; font-size: 12px;">
                Text
            </div>

            <div class="header" style="width: 33.33%; background-color: #0ff; display: inline-block; text-align: center; font-size: 12px;">
                Date
            </div>
            
            <div class="header" style="width: 33.33%; background-color: #0ff; display: inline-block; text-align: center; font-size: 12px;">
                Time
            </div>
        

            <div class="shout-list-item" style="white-space: nowrap;">
                <div class="shout-text" style="width: 33.33%; height: 120px; background-color: green; font-size: 12px; display: inline-block; float: left; white-space: normal; ">
                    W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W 
                    W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W 
                </div>
            
                <div class="shout-date" style="width: 33.33%; height: 120px; background-color: green; font-size: 12px; display: inline-block; text-align: center;">
                    30/12/1982
                </div>

                <div class="shout-time" style="width: 33.33%; height: 120px; background-color: green; font-size: 12px; display: inline-block; text-align: center;">
                    12:00AM
                </div>
            </div>          
        </div>
        


    <script>

        // Where should this live?

        // Also, how are we going to get hold of the data to give it? I guess we need to request it from the back end with a post call

        // You will need information from the ScheduledProject table.
        // But you will also need to calculate the next shout time.
        // And you will also need to get hold of the text from the next shout.

        // For now, get only the account name and iterate over that.



        // Should it be done this way? There are probably other ways.
        // It will need its data passed to it. Hitting a PHP script.

        var items = [];

        $.getJSON('get_all_scheduled_projects.php', function (data) {
            $('.listview').listView(data, function (id) {

                var deleteProjectModal = new Modal(400, 100, "Confirm", "modal_layouts/delete_project.php");

                deleteProjectModal.addButton('No!', 'default', function () {
                    deleteProjectModal.hideModal();
                });

                deleteProjectModal.addButton('Yip!', 'primary', function () {
                    // alert('how we gon\' do this?');

                    // Should have access to id so deletion should be simple

                    $.post("delete_scheduled_project.php", { projId: id })
                        .done(function (data) {
                            deleteProjectModal.hideModal();

                            // You'll also want to hide the project somehow.
                            // Deleting is working though.
                        });



                });

                deleteProjectModal.showModal();
            });
        });


        $('.listview').listView();

    </script>

<?php
    require_once 'footer.php';
?>




