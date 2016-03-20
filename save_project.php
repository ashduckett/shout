<?php
    require_once 'DBObjects/SchedulingProject.php';

    $_POST['name'];
    echo $_POST['name'];

    $data = array(
        'name' => $_POST['name']
    );

    $project = new SchedulingProject($data);
    $project->insert();


?>
