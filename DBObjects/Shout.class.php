<?php
    require_once "DataObject.class.php";
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
        
        // The limit clause will do it all
        // limit here will be 10, page No 1, 2, 3...1 10 1 is passed in.

        public static function getPage($pageNo, $limit, $project_id, &$shout_count, &$next_page, &$prev_page) {
            // Get the total number of records
            $conn = parent::connect();
            $sql = "SELECT COUNT(*) FROM " . TBL_SHOUT . " WHERE project_id = :project_id";
            $st = $conn->prepare($sql);
            $st->bindValue(":project_id", $project_id);
            $st->execute();
            $no_of_rows = $st->fetchColumn();


            


            // We have the total number of rows for the project so we can now work out how many pages based on the limit.

            $numberOfPages = floatval($no_of_rows / $limit);

            // Is there a ceiling function to use instead?
            $numberOfPages += $no_of_rows % $limit > 0 ? 1 : 0;

            // Now we have the total number of pages...
            $numberOfPages = intval($numberOfPages);

        //    $pageCount = $numberOfPages;

            $next_page = $pageNo == $numberOfPages || $numberOfPages == 0 ? 'none' : $pageNo + 1;
            
            // Can pageNo be 0 if there are no shouts?
            $prev_page = ($pageNo == 1 || $pageNo == 0) ? 'none' : $pageNo - 1;
            
            $shout_count = $numberOfPages;


            $offset = ($pageNo - 1) * 10;

            if($pageNo <= $numberOfPages) {
                $sql = "SELECT * FROM " . TBL_SHOUT . " WHERE project_id = :project_id LIMIT 10 OFFSET :offset";
          
                $st = $conn->prepare($sql);
                $st->bindValue(":project_id", $project_id);
                $st->bindValue(":offset", $offset, PDO::PARAM_INT);
                $st->execute();
                $shouts = array();

                foreach($st->fetchAll() as $row) {
                    $shouts[] = new Shout($row);
                }
           
                parent::disconnect($conn);
                return $shouts;

            } else {
                parent::disconnect($conn);
                // Page number was invalid! Maybe should throw exception. But it's not exceptional. People use exceptions too often these days...
              error_log('no more pages!', 3, 'error_log.log');
                return false;
            }
            
        }

        public static function getCount($project_id) {
            $conn = parent::connect();
            $sql = "SELECT COUNT(*) FROM " . TBL_SHOUT . " WHERE project_id = :project_id";
            $st = $conn->prepare($sql);
            $st->bindValue(":project_id", $project_id);
            $st->execute();
            $no_of_rows = $st->fetchColumn();


            // We have the total number of rows for the project so we can now work out how many pages based on the limit.

            $numberOfPages = floatval($no_of_rows / 10);

            // Is there a ceiling function to use instead?
            $numberOfPages += $no_of_rows % 10 > 0 ? 1 : 0;

            // Now we have the total number of pages...
            $numberOfPages = intval($numberOfPages);
        
            error_log('number of pages! ' . $numberOfPages, 3, 'error_log.log');


            return $numberOfPages;
        
        }


        public function JsonSerialize()
        {
            $vars = get_object_vars($this);

            return $vars;
        }


}


?>
