<?php

session_start();
include "classes/database.php";

$db = new database();
$query = "SELECT Game5Icon, Game5BG, Game5Ground FROM users WHERE username = '".$_SESSION['user']."';";
$result = mysqli_query($db->connect(), $query);
$row = mysqli_fetch_assoc($result);
header('Content-Type: application/json');
echo json_encode($row);
mysqli_close($db->connect());

?>