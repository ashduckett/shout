<?php
    require_once 'header.php';
?>
        <div class="sidebar">
            <ul class="sidebar-listing">
                <li class="sidebar-header">Social Media</li>
                <li class="sidebar-item" id="new-project">New Project</li>
                <li class="sidebar-item">Import...</li>
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
        <div class="schedule-workspace">
            <div class="shout-table"></div>        
        </div>
        <div class="account-list-container">
            <div class="account-list-container-account-list">
            </div>
            <div class="account-list-container-buttons">
                <a href="#">Add/Remove Accounts...</a>
            </div>
        </div>
<?php
    require_once 'footer.php';
?>