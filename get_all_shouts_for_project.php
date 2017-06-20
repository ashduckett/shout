<?php
    require_once 'DBObjects/Shout.class.php';
    require_once 'DBObjects/SchedulingProject.class.php';
       
    $project_id = $_GET['project_id'];
    
    error_log($project_id, 3, 'error_log.log');
    // Page number, limit, project id
    //$shouts = Shout::getPage($page_no, 10, $project_id, $page_count, $next_page, $prev_page);
    
    // What should I call here?
//ublic static function findByProjectId($project_id) {

    $shouts = Shout::findByProjectId($project_id);
    error_log(print_r($shouts, true), 3, 'error_log.log');
    // Echoes both the shouts for the selected page, and the number of shouts for the selected project
    echo json_encode(array('shouts' => $shouts));

?>