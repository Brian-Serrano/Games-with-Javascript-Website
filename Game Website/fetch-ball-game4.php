<?php

session_start();
include "classes/database.php";

$db = new database();
$query = "SELECT Game4Ball FROM users WHERE username = '".$_SESSION['user']."';";
$result = mysqli_query($db->connect(), $query);
$row = mysqli_fetch_assoc($result);
$ballNumber = $row['Game4Ball'];
header('Content-Type: application/json');
echo json_encode($ballNumber);
mysqli_close($db->connect());

?>