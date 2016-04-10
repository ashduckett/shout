
<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

    require_once 'DBObjects/SchedulingProject.php';
    require_once 'DBObjects/Shout.class.php';
/*
    This file is here to spit out anything it needs to


    A URL will need to be hit maybe a POST

    A POST would send the name of the method and the object to save
    // Gets will have to be here
    // Get alls
    // Saves because the JS needs to get here

*/

$method = $_GET['method'];
$type = $_GET['type'];



switch($method) {
    case 'get_all':
        switch($type) {
            case 'SchedulingProject':
                $projects = SchedulingProject::getAll();
                echo json_encode($projects);
                break;
        }
        break;
    case 'get_by_id':
        switch($type) {
            case 'Shout':
                $shouts = Shout::findByProjectId($_GET['id']);
                echo json_encode($shouts);
                break;
        }
}


/*
So how would you use this?

    From JS you would do a post containing these things. JS would then get the json.

    This stuff's never actually called from the PHP
*/





?>
