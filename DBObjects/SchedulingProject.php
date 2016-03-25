<?php
    
  //  error_reporting(E_ALL);
 //   ini_set('display_errors', 1);
    require "DataObject.class.php";
    require_once __DIR__ . '/../config.php';
    
    class SchedulingProject extends DataObject implements JsonSerializable {
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
    

    public static function getAll() {
        $conn = parent::connect();

        $sql = "SELECT * FROM " . TBL_SCHEDULING_PROJECT;

        try {
            $st = $conn->prepare($sql);
            $st->execute();

            $projects = array();

            foreach($st->fetchAll() as $row) {
                $projects[] = new SchedulingProject($row);
            }
           
            parent::disconnect($conn);
            return $projects;
        } catch(PDOException $e) {
            die("Query failed: " . $e->getMessage());
        }
    }

    public static function deleteById($id) {
        $conn = parent::connect();
        $sql = "DELETE FROM " . TBL_SCHEDULING_PROJECT . " WHERE id = :id";
       
        $st = $conn->prepare($sql);
        $st->bindValue(":id", $id, PDO::PARAM_STR);
        $st->execute();
        DataObject::disconnect($conn);

    }

     public function JsonSerialize()
    {
        $vars = get_object_vars($this);

        return $vars;
    }
    }

?>
