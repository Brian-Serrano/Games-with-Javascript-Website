<?php

session_start();
include "classes/database.php";

$db = new database();
$weaponNumber = $_POST['weapon'];
$query = "UPDATE users SET Game3Weapon = '$weaponNumber' WHERE username = '".$_SESSION['user']."';";
mysqli_query($db->connect(), $query);
mysqli_close($db->connect());

?>