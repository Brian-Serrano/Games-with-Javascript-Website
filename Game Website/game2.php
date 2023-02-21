<?php

session_start(); 

if (isset($_SESSION["id"])){

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<style>
    .image1, .image2, .image3, .images, .balloons {
        display: none;
    }
</style>
<body>
    <?php include 'header.php'; ?>
	<div class="main">
        <?php include "gameaside.php"; ?>
		<div class="article">
            <div id="game">
                <h1>Balloon Pop</h1>
                <canvas id="canvas" width="700px" height="500px"></canvas>
            </div>
            <div class="images">
                <img src="assets/Balloon Pop/m4/PRE_ORIG_SIZE.png" id="theme">
                <img src="assets/Balloon Pop/m7/PRE_ORIG_SIZE.png" id="theme">
                <img src="assets/Balloon Pop/m8/PRE_ORIG_SIZE.png" id="theme">
                <img src="assets/Buttons/start_button.png" id="start-button">
                <img src="assets/Buttons/back_button.png" id="back-button">
                <img src="assets/Buttons/leaderboard_button.png" id="leaderboard-button">
                <img src="assets/Buttons/continue_button.png" id="continue-button">
                <img src="assets/Buttons/restart_button.png" id="restart-button">
                <img src="assets/Buttons/home_button.png" id="home-button">
                <img src="assets/Balloon Pop/Balloon_Pop_Leaderboard.png" id="leaderboard-background">
            </div>
            <div class="balloons">
                <img id="bln" src="assets/Balloon Pop/balloons/balloon_blue.png">
                <img id="bln" src="assets/Balloon Pop/balloons/balloon_green.png">
                <img id="bln" src="assets/Balloon Pop/balloons/balloon_purple.png">
                <img id="bln" src="assets/Balloon Pop/balloons/balloon_red.png">
                <img id="bln" src="assets/Balloon Pop/balloons/balloon_yellow.png">
            </div>
            <div class="image1">
                <img id="img1" src="assets/Balloon Pop/m4/1.png">
                <img id="img1" src="assets/Balloon Pop/m4/2.png">
                <img id="img1" src="assets/Balloon Pop/m4/3.png">
            </div>
            <div class="image2">
                <img id="img2" src="assets/Balloon Pop/m7/1.png">
                <img id="img2" src="assets/Balloon Pop/m7/2.png">
                <img id="img2" src="assets/Balloon Pop/m7/3_3.png">
            </div>
            <div class="image3">
                <img id="img3" src="assets/Balloon Pop/m8/1_1.png">
                <img id="img3" src="assets/Balloon Pop/m8/2.png">
                <img id="img3" src="assets/Balloon Pop/m8/3.png">
            </div>
        </div>
        <?php include "recommendaside.php"; ?>
	</div>
	<?php include 'footer.php'; ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
	<script src="script.js"></script>
    <script src="script2.js"></script>
</body>
</html>

<?php

} 
else {
    header('location:login.php?login=youdidntlogin');
}

?>