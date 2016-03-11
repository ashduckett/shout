<?php
    session_start();
    if(!isset($_SESSION['user_logged_in']) || $_SESSION['user_logged_in'] !== 'yes') {
        header('HTTP/1.1 302 Redirect');
        header('Location: login.php');
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <link rel="stylesheet" type="text/css" href="css/nav.css">
        <link rel="stylesheet" type="text/css" href="css/listview.css">
        <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
        <script src="js/nav.js"></script>
        <script src="js/modal.js"></script>

        <script src="js/NewModal.js"></script>
        <script src="js/main.js"></script>

        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300">
        <link rel="stylesheet" type="text/css" href="css/sidebar.css">
    </head>
    <body>
        <div class="main-container" style="height: 100vh">
        <div class="menu">
            <ul>
                <li><span class="menu-item">Shout...</span>
                    <ul class="dropdown">
                        <li>Social Media...</li>
                        <li>My Profile...</li>
                        <li id="menu-item-accounts">Accounts...</li>
                        <li>Scheduling...</li>
                    </ul>
                </li>
            </ul>
        </div>
        
        


