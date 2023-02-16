<?php

session_start();
include "classes/database.php";

$db = new database();
$query = "SELECT username, FruitCatch FROM users ORDER BY FruitCatch DESC LIMIT 10;";
$query_run = mysqli_query($db->connect(), $query);
if(!$query_run) {
    exit();
}

$data = array();
if (mysqli_num_rows($query_run) > 0){
    while ($row = mysqli_fetch_assoc($query_run)) {
        $data[] = $row;
    }
}
header('Content-Type: application/json');
echo json_encode($data);

?>