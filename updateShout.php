<?php
    require_once 'DBObjects/Shout.class.php';
    error_log('Message', 3, 'error_log.log');
    // A shout will need:
    // an id

    $data = array(
        'id' => $_POST['shoutId'],
        'project_id' => $_POST['projectId'],
        'text' => $_POST['shoutText'],
        'date' => $_POST['shoutDate'],
        'time' => $_POST['shoutTime']
    );

    error_log('data created', 3, 'error_log.log');


    // Now with have a project with the correct id and correct name
    $shout = new Shout($data);

    // This should just work?
    $shout->update();
