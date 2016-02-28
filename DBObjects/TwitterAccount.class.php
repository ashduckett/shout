<?php
    require_once "DataObject.class.php";
    require_once __DIR__ . "../config.php";


    class TwitterAccount extends DataObject {
        protected $data = array(
            "account_id" => "",
            "twitter_user_id" => "",
            "twitter_screen_name" => "",
            "cust_id" => "",
            "oauth_token" => "",
            "oauth_token_secret" => ""
        );
        
        public function insert() {
            $conn = DataObject::connect();
            $sql = "INSERT INTO " . TBL_TWITTER_ACCOUNT . "(twitter_user_id, twitter_screen_name, cust_id, oauth_token, oauth_token_secret) VALUES (:twitter_user_id, :twitter_screen_name, :cust_id, :oauth_token, :oauth_token_secret)";
            $st = $conn->prepare($sql);
            
            $st->bindValue(":twitter_user_id", $this->data["twitter_user_id"], PDO::PARAM_INT);
            $st->bindValue(":twitter_screen_name",  $this->data["twitter_screen_name"], PDO::PARAM_STR);
            $st->bindValue(":cust_id",  $this->data["cust_id"], PDO::PARAM_STR);
            $st->bindValue(":oauth_token",  $this->data["oauth_token"], PDO::PARAM_STR);
            $st->bindValue(":oauth_token_secret", $this->data["oauth_token_secret"], PDO::PARAM_STR);
            $st->execute();
            DataObject::disconnect($conn);
        }
    }
?>