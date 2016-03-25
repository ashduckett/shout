<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    require 'twitteroauth-0.6.2/autoload.php';
             
    use Abraham\TwitterOAuth\TwitterOAuth;
    
    echo 'got here';

    try {
        $twitteroauth = new TwitterOAuth('YOUR_CONSUMER_KEY', 'YOUR_CONSUMER_SECRET');
    } catch(Exception $e) {
        echo $e->getMessage();
    }

?>
