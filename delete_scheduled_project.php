<?php
    require_once (__DIR__ . '\DBObjects\SchedulingProject.php');
    $id = $_POST['projId'];
    SchedulingProject::deleteById($id);
?>
