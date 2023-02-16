<?php

session_start();
include "classes/database.php";

$db = new database();
$ballNumber = $_POST['ball'];
$query = "UPDATE users SET Game4Ball = '$ballNumber' WHERE username = '".$_SESSION['user']."';";
mysqli_query($db->connect(), $query);
mysqli_close($db->connect());

?>