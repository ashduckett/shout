<?php
    require_once "DataObject.class.php";
    require_once __DIR__ . "/../config.php";
    

    class User extends DataObject {
        protected $data = array(
            "id" => "",
            "org_id" => "",
            "first_name" => "",
            "second_name" => "",
            "email" => "",
            "password_hash" => ""
        );

       
        public function insert() {

            $conn = DataObject::connect();
            $sql = "INSERT INTO " . TBL_USER . "(org_id, first_name, second_name, email, password_hash) VALUES (:org_id, :first_name, :second_name, :email, :password_hash)";
            $st = $conn->prepare($sql);
            
            $st->bindValue(":org_id", $this->data["org_id"], PDO::PARAM_INT);
            $st->bindValue(":first_name",  $this->data["first_name"], PDO::PARAM_STR);
            $st->bindValue(":second_name",  $this->data["second_name"], PDO::PARAM_STR);
            $st->bindValue(":email",  $this->data["email"], PDO::PARAM_STR);
            $st->bindValue(":password_hash",  $this->data["password_hash"], PDO::PARAM_STR);
            $st->execute();
            DataObject::disconnect($conn);
        }
    }
?>