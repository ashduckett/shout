<?php
    require_once 'DBObjects/Shout.class.php';
    require_once 'DBObjects/SchedulingProject.class.php';
    
    error_log('Hit the script', 3, 'error_log.log');

    $page_no = $_GET['page_no'];
    $project_id = $_GET['project_id'];
    $project_shout_count = 0;

    error_log('Obtained information', 3, 'error_log.log');



    // Page number, limit, project id
    $shouts = Shout::getPage($page_no, 10, $project_id, $page_count, $next_page, $prev_page);
    
    error_log('Called getPage', 3, 'error_log.log');

    // Echoes both the shouts for the selected page, and the number of shouts for the selected project
    echo json_encode(array('shouts' => $shouts, 'page_count' => $page_count, 'next_page' => $next_page, 'prev_page' => $prev_page));

?>