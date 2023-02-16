<?php

session_start();
include "classes/database.php";

$db = new database();
if($_POST['data']>$_SESSION['game4']){
	$query = "UPDATE users SET ColorBallFlap = '".$_POST['data']."' WHERE username = '".$_SESSION['user']."';";
    $query_run = mysqli_query($db->connect(), $query);
    if(!$query_run) {
        exit();
    }
}
$db->session();

?>