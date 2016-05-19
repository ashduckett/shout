<?php
    require_once 'DBObjects/SchedulingProject.class.php';

    $_POST['name'];

    $data = array(
        'name' => $_POST['name']
    );

    $project = new SchedulingProject($data);
    echo($project->insert());


?>
