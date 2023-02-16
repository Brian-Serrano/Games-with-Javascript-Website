<?php

session_start();
include "classes/database.php";

$db = new database();
$iconNumber = $_POST['icon'];
$backgroundNumber = $_POST['background'];
$groundNumber = $_POST['ground'];
$query = "UPDATE users SET Game5Icon = '$iconNumber', Game5BG = '$backgroundNumber', Game5Ground = '$groundNumber' WHERE username = '".$_SESSION['user']."';";
mysqli_query($db->connect(), $query);
mysqli_close($db->connect());

?>