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

        public static function findByEmail($email) {
            $conn = DataObject::connect();
            $sql = "SELECT * FROM user WHERE email = :email";
             
            $st = $conn->prepare($sql);
            
            $st->bindValue(":email", $email);
            $st->execute();

            $users = array();

            foreach($st->fetchAll() as $row) {
                $users[] = new User($row);
            }

            $st = $conn->query("SELECT found_rows() AS totalRows");
            $row = $st->fetch();
            parent::disconnect($conn);
            return $users[0];
        }

        // This could possibly be placed in the superclass.
        // It should also be called save not update.
        public function update() {
            try {
            $conn = DataObject::connect();

            $sql = "UPDATE " . TBL_USER . " SET org_id = :org_id, 
                                                first_name = :first_name, 
                                                second_name = :second_name, 
                                                email = :second_name, 
                                                password_hash = :password_hash 
                                                WHERE id = " . $this->data["id"];

            $st->prepare($sql);
            $st->bindValue(":org_id", $this->data["org_id"]);
            $st->bindValue(":first_name", $this->data["first_name"]);
            $st->bindValue(":second_name", $this->data["second_name"]);
            $st->bindValue(":email", $this->data["email"]);
            $st->bindValue(":password_hash", $this->data["password_hash"]);

            $st->execute();
            } catch(Exception $e) {
                echo $e->getMessage();
            }
            parent::disconnect($conn);

        }
    }
?>