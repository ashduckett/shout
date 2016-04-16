<?php
    require_once 'DBObjects/Shout.class.php';
    require_once 'DBObjects/SchedulingProject.php';
    $project_id = $_GET['project_id'];

    $project = SchedulingProject::findByProjectId($project_id);
    $shout_count = $project->getShoutCount();
    $page_count = $shout_count / 10;
    $page_count += $shout_count % 10 > 0 ? 1 : 0;
    $page_count = intval($page_count);
    
    
    
    
    
    
    
    echo $page_count;    
?>
