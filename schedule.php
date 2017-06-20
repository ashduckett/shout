<?php
    require_once 'header.php';
?>
    <div class="sidebar">
        <ul class="sidebar-listing">
            <li class="sidebar-header">Social Media</li>
            <li class="sidebar-item" id="new-project">New Project</li>
            <li class="sidebar-item disabled">Import...</li>
            <li class="sidebar-header">Project</li>
            <li class="sidebar-item disabled" id="new-shout">Add Item...</li>
            <li class="sidebar-item disabled" id="generate-schedule">Generate Schedule...</li>
            <li class="sidebar-item disabled">Import To...</li>
            <li class="sidebar-item disabled">Export From...</li>
            <li class="sidebar-item disabled">Advanced...</li>
        </ul>
    </div>

    <div class="schedule-workspace">
        <div class="column-container"></div>
    </div>

<?php
    require_once 'footer.php';
?>

<script>

    $(function () {
       
        // How will I set content?
        // How will I associate data?
        // How will I update data?

        // The model will need projects, which will need ids. They'll also need to store all the data a project has.
        // The model will need shouts, each of which will need ids.
        // Hopefully, this way, we end up with a model that matches the layout of the screen and can then get ids that way.
    });


/*
    TODO:
        Can you add a splitter bar to the add accounts section as well?
        Can you make the splitter bar completely generic?
        Can you get rid of the gap showing at the bottom of the screen?
        Can you add restrictions on how far the splitter bars will go in both directions?
        Can you make the splitter bar control look better? Maybe add a grip image?
        Can you make the table responsive based on how must space it has?

        

*/




</script>

