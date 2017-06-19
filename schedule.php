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

    <div class="schedule-workspace" style="position: relative;">
        <div class="column-container" style="width: 100%;"></div>
    </div>

<?php
    require_once 'footer.php';
?>

<script>

    $(function () {



            // Why is this appearing on top of the menu?!
            var colMethods = $('.column-container').DraggableColsAndRows();

            colMethods.addColumn();
            colMethods.addColumn();
            colMethods.addColumn();

            colMethods.addRowToColumn(0, '<div>Content 1</div>');
            colMethods.addRowToColumn(0, '<div>Content 1</div>');
            colMethods.addRowToColumn(0, '<div>Content 1</div>');
            colMethods.addRowToColumn(0, '<div>Content 1</div>');
            colMethods.addRowToColumn(0, '<div>Content 1</div>');
            colMethods.addRowToColumn(1, '<div>Content 1</div>');
            colMethods.addRowToColumn(2, '<div>Content 1</div>');
            colMethods.addRowToColumn(2, '<div>Content 1</div>');
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

