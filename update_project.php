<?php
    require_once 'DBObjects/SchedulingProject.class.php';

    // Will need to post the id and the name
    $name = $_POST['name'];
    $id = $_POST['id'];

    $data = array(
        'id' => $id,
        'name' => $name
    );

    // Now with have a project with the correct id and correct name
    $project = new SchedulingProject($data);

    // This should just work?
    $project->update();
?>