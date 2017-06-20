<?php
    require_once 'DBObjects/Shout.class.php';
    require_once 'DBObjects/SchedulingProject.class.php';
       
    $shouts = Shout::getAll();

    // Echoes both the shouts for the selected page, and the number of shouts for the selected project
    echo json_encode(array('shouts' => $shouts));

?>