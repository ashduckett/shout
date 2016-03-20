<?php
    require "DataObject.class.php";
    require_once __DIR__ . '/../config.php';
    
    class SchedulingProject extends DataObject {
        protected $data = array(
            "id" => "",
            "name" => ""
        );

         public function insert() {
            $conn = DataObject::connect();
            $sql = "INSERT INTO " . TBL_SCHEDULING_PROJECT . "(name) VALUES (:name)";
            $st = $conn->prepare($sql);
            
            $st->bindValue(":name", $this->data["name"], PDO::PARAM_STR);
            $st->execute();
            
            $lastInsertId = $conn->lastInsertId();

            DataObject::disconnect($conn);
            
            return $lastInsertId;

           
        }



    }


?>
