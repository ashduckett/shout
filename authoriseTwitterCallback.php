<?php
    require "twitteroauth-0.6.2/autoload.php";
    //require "classes/config.php";
    //require_once "classes/TwitterAccount.class.php";
    use Abraham\TwitterOAuth\TwitterOAuth;
    
    define("CONSUMER_KEY", "3oOdr2T8WDxQd99YBoVHkA");
    define("CONSUMER_SECRET", "nBMO0FqkJhk1c1saoFxlC7cbrat2TGU4xjqtAsW4A");
  define("OAUTH_CALLBACK", "../authoriseTwitterCallback.php");
  define("OAUTH_CALLBACK", "http://localhost:59165/authoriseTwitterCallback.php");
    
    session_start();

    $request_token = [];
    $request_token['oauth_token'] = $_SESSION['oauth_token'];
    $request_token['oauth_token_secret'] = $_SESSION['oauth_token_secret'];

    if(isset($_REQUEST['oauth_token']) && $request_token['oauth_token'] !== $_REQUEST['oauth_token']) {
        // ABORT ABORT!!
    }


   // echo 'consumer key is ' . CONSUMER_KEY;
    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $request_token['oauth_token'], $request_token['oauth_token_secret']);
    $access_token = $connection->oauth("oauth/access_token", array("oauth_verifier" => $_REQUEST['oauth_verifier']));

    $auth_token = $access_token['oauth_token'];
    $auth_token_secret = $access_token['oauth_token_secret'];

   
    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

    $user = $connection->get("account/verify_credentials");
    

   // print_r($user);
    echo $user->screen_name;
    echo $user->id;
   
    
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

    //$account = new TwitterAccount($data);
    //$account->insert();*/

    echo "SUCCESS";
?>
