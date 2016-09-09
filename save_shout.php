<?php
    require_once 'DBObjects/Shout.class.php';
        
    $data = array(
        'project_id' => $_POST['projectId'],
        'text' => $_POST['shoutText'],
        'date' => $_POST['shoutDate'],
        'time' => $_POST['shoutTime'],

    );

    $shout = new Shout($data);
            
    // Second save fails here!
    echo($shout->insert());
    
?>
