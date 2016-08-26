<?php
    error_log('HIT', 3, 'error_log.log');
    // if this is called twice it errors? Deleting repeatedly is fine...
    require_once 'DBObjects/Shout.class.php';
    error_log('require once passed', 3, 'error_log.log');
    
    $data = array(
        'project_id' => $_POST['projectId'],
        'text' => $_POST['shoutText'],
        'date' => $_POST['shoutDate'],
        'time' => $_POST['shoutTime'],

    );

    error_log('data passed', 3, 'error_log.log');
    
    $shout = new Shout($data);
    error_log('new shout passed', 3, 'error_log.log');
    
    
    
    // Second save fails here!
    echo($shout->insert());
    error_log('insert', 3, 'error_log.log');
?>
