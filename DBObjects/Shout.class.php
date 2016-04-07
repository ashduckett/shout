<?php
    require "DataObject.class.php";
    require_once __DIR__ . '/../config.php';








    class Shout extends DataObject implements JsonSerializable {
        protected $data = array(
            "id" => "",
            "project_id" => "",
            "text" => "",
            "date" => "",
            "time" => ""
        );

         public function insert() {
            $conn = DataObject::connect();
            $sql = "INSERT INTO " . TBL_SHOUT . "(project_id, text, date, time) VALUES (:project_id, :text, :date, :time)";
            $st = $conn->prepare($sql);
            $st->bindValue(":project_id", intval($this->data["project_id"]), PDO::PARAM_INT);
            $st->bindValue(":text", $this->data["text"], PDO::PARAM_STR);
            $st->bindValue(":date", $this->data["date"], PDO::PARAM_STR);
            $st->bindValue(":time", $this->data["time"], PDO::PARAM_STR);


            
            $st->execute();

            $lastInsertId = $conn->lastInsertId();

            DataObject::disconnect($conn);
            
            return $lastInsertId;

           
        }


         public static function findByProjectId($project_id) {
            $conn = DataObject::connect();
            $sql = "SELECT * FROM shout WHERE project_id = :project_id";
             
            $st = $conn->prepare($sql);
            
            $st->bindValue(":project_id", $project_id);
            $st->execute();

            $shouts = array();



            foreach($st->fetchAll() as $row) {
                $shouts[] = new Shout($row);



            }

           


            parent::disconnect($conn);
            return $shouts;
        }

    public static function getAll() {
        $conn = parent::connect();

        $sql = "SELECT * FROM " . TBL_SHOUT;

        try {
            $st = $conn->prepare($sql);
            $st->execute();

            $shouts = array();

            foreach($st->fetchAll() as $row) {
                $shouts[] = new Shout($row);
            }
           
            parent::disconnect($conn);
            return $shouts;
        } catch(PDOException $e) {
            die("Query failed: " . $e->getMessage());
        }
    }

         public function JsonSerialize()
    {
        $vars = get_object_vars($this);

        return $vars;
    }


    }


?>
