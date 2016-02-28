<!--
If the user is not logged in, send them to the login page

-->

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
        <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
        <script src="js/nav.js"></script>
        <script src="js/modal.js"></script>
        <script src="js/main.js"></script>
    </head>
    <body>
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

        <script>
            //$.showModal("Hello Ash");



            $('.menu').click(function () {
           //     $.showModal(300, 200, "T");
            });
        </script>
    </body>
</html>