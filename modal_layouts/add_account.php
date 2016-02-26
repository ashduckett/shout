

<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);


    require "../twitteroauth-0.6.2/autoload.php";
    
    //require "../classes/config.php";
    use Abraham\TwitterOAuth\TwitterOAuth;
    


    define("CONSUMER_KEY", "3oOdr2T8WDxQd99YBoVHkA");
    define("CONSUMER_SECRET", "nBMO0FqkJhk1c1saoFxlC7cbrat2TGU4xjqtAsW4A");

    define("OAUTH_CALLBACK", "http://localhost:59165/authoriseTwitterCallback.php");

    session_start();

    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
    
    
    $request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));

    

    $_SESSION['oauth_token'] = $request_token['oauth_token'];
    $_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
    $url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));
?>


<style>
    .social-menu li {
        list-style-type: none;
        padding: 14px;
    }
    
    .social-menu li:hover {
        background: rgb(24, 131, 215);
    }
    
    .social-menu {
        float: left;
        width: 40%;
    }
    
    .account-modal-content {
        float: left;
        height: 100%;
        width: 60%;
        background-color: red;
    }
    
    
</style>





<ul class="social-menu">
    <li>Twitter</li>
    <li>Facebook</li>
    <li>Google+</li>
    <li>LinkedIn</li>
    <li>WordPress</li>
    <li>Instagram</li>
</ul>

<div class="account-modal-content">
    <p>To connect a Twitter account, please press the button.</p>
    <a href="<?php echo $url?>">Connect</a>
    

</div>