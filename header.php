<?php
    session_start();
    if(!isset($_SESSION['user_logged_in']) || $_SESSION['user_logged_in'] !== 'yes') {
        header('HTTP/1.1 302 Redirect');
        header('Location: login.php');
    }
?>