<?php
    require_once 'DBObjects/Shout.class.php';
    
    $data = array(
        'id' => $_POST['shoutId'],
        'project_id' => $_POST['projectId'],
        'text' => $_POST['shoutText'],
        'date' => $_POST['shoutDate'],
        'time' => $_POST['shoutTime']
    );

    // Now with have a project with the correct id and correct name
    $shout = new Shout($data);

    // This should just work?
    $shout->update();
