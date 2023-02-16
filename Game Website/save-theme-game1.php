<?php

session_start();
include "classes/database.php";

$db = new database();
$themeNumber = $_POST['theme'];
$query = "UPDATE users SET Game1Theme = '$themeNumber' WHERE username = '".$_SESSION['user']."';";
mysqli_query($db->connect(), $query);
mysqli_close($db->connect());

?>