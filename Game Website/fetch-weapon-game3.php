<?php

session_start();
include "classes/database.php";

$db = new database();
$query = "SELECT Game3Weapon FROM users WHERE username = '".$_SESSION['user']."';";
$result = mysqli_query($db->connect(), $query);
$row = mysqli_fetch_assoc($result);
$weaponNumber = $row['Game3Weapon'];
header('Content-Type: application/json');
echo json_encode($weaponNumber);
mysqli_close($db->connect());

?>