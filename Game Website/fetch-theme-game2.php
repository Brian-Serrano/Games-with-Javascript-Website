<?php

session_start();
include "classes/database.php";

$db = new database();
$query = "SELECT Game2Theme FROM users WHERE username = '".$_SESSION['user']."';";
$result = mysqli_query($db->connect(), $query);
$row = mysqli_fetch_assoc($result);
$themeNumber = $row['Game2Theme'];
header('Content-Type: application/json');
echo json_encode($themeNumber);
mysqli_close($db->connect());

?>