<?php
    error_reporting(-1);
    ini_set('display_errors', "On");   



    $db = new PDO("mysql:host=localhost;dbname=ShoutDB;", "root", "Visualstudio2010");
    $sql = "CREATE TABLE MyGuests (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(30) NOT NULL, lastname VARCHAR(30) NOT NULL, email VARCHAR(50), reg_date TIMESTAMP)";



    try {
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->beginTransaction();
        $db->exec($sql);
        $db->commit();

    } catch(Exception $error) {
        $db->rollback();
        echo "Transaction not completed : " . $error->getMessage();
    }


    
    


    


?>
