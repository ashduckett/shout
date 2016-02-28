<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
    require "twitteroauth-0.6.2/autoload.php";
    require "config.php";

    require_once "DBObjects/TwitterAccount.class.php";

    //require_once "classes/TwitterAccount.class.php";
    use Abraham\TwitterOAuth\TwitterOAuth;
    

    
    session_start();

    $request_token = [];
    $request_token['oauth_token'] = $_SESSION['oauth_token'];
    $request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

    if(isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
        // ABORT ABORT!!
    }

    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $request_token['oauth_token'], $request_token['oauth_token_secret']);
    $access_token = $connection->oauth("oauth/access_token", array("oauth_verifier" => $_REQUEST['oauth_verifier']));

    $auth_token = $access_token['oauth_token'];
    $auth_token_secret = $access_token['oauth_token_secret'];
  
    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

    $user = $connection->get("account/verify_credentials");
    


    $screenName = $user->screen_name;
    $twitterId = $user->id;
    $cust_id = 0;

    $data = array(
        "twitter_user_id" => $twitterId,
        "twitter_screen_name" => $screenName,
        "cust_id" => 0,
        "oauth_token" => $access_token['oauth_token'],
        "oauth_token_secret" => $access_token['oauth_token_secret']
    );

    try {
        $account = new TwitterAccount($data);
        $account->insert();
        echo "Account successfully added to the database.";

    } catch(Exception $e) {
        echo "This account has already been added.";
    }

    
?>
