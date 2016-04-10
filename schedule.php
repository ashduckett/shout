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
                <li class="sidebar-item">Advanced...</li>
            
            </ul>
        </div>
       
        <div class="listview-container">
            <ul class="listview">
                
               
            </ul>
        </div>
        

        <div class="shout-table" style="float: left;"></div>

        


        <div class="account-list-container" style="position: relative;">
            <div class="account-list-container-buttons" style="width: 100%; height: 40px; background-color: black; bottom: 0; position: absolute;"></div>


            <div class="account-list-container-account-list" style="width: 100%; height: calc(100% - 40px); background-color: blue;">
            
            </div>

        </div>


<?php
    require_once 'footer.php';
?>




