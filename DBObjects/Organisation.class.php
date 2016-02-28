<?php
        echo 'about to include config';
    

    require "DataObject.class.php";
    

    

    require_once __DIR__ . '/../config.php';

    echo 'config included';

    class Organisation extends DataObject {
        protected $data = array(
            "id" => "",
            "name" => ""
        );

         public function insert() {
            $conn = DataObject::connect();
            $sql = "INSERT INTO " . TBL_ORGANISATION . "(name) VALUES (:name)";
            $st = $conn->prepare($sql);
            
            $st->bindValue(":name", $this->data["name"], PDO::PARAM_STR);
            $st->execute();

            echo 'insert has been executed';

            $lastInsertId = $conn->lastInsertId();

            DataObject::disconnect($conn);
            
            return $lastInsertId;

           
        }



    }


?>
