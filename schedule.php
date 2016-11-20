<?php
    require_once 'header.php';
?>
    <style>
        
        .listview-container {
            width: calc(100% - 200px);
        }
        
        .left {
            height: 100%;
        }
        
   
        

    </style>

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
            <div class="spl" style="height: calc(100vh - 50px); width: calc(100% - 200px); float: left;">
                <div class="left">
                    <div class="listview-container" style="height: 100%; width: inherit;">
                        <ul class="listview">
                        </ul>
                    </div>
                </div>

                
                <div class="right" style="height: 100%;">
                    <div class="schedule-workspace">
                        <div class="shout-table"></div>        
                    </div>
          
                    <div class="account-list-container">
                <div class="account-list-container-account-list"></div>
                <div class="account-list-container-buttons">
                    <a href="#">Add/Remove Accounts...</a>
                </div>
            </div>

              </div>
            </div>

            

<?php
    require_once 'footer.php';
?>

<script>

    $(function () {
        $('.spl').splitterView();
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

