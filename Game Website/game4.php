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
    #start-button, #back-button, #leaderboard-button, #leaderboard-background {
        display: none;
    }
</style>
<body>
    <?php include 'header.php'; ?>
	<div class="main">
        <?php include "gameaside.php"; ?>
		<div class="article">
            <div id="game">
                <h1>ColorBall Flap</h1>
                <canvas id="canvas" width="700px" height="500px"></canvas>
            </div>
            <img src="assets/Buttons/start_button.png" id="start-button">
            <img src="assets/Buttons/back_button.png" id="back-button">
            <img src="assets/Buttons/leaderboard_button.png" id="leaderboard-button">
            <img src="assets/ColorBall Flap/ColorBall_Flap_Leaderboard.png" id="leaderboard-background">
        </div>
        <?php include "recommendaside.php"; ?>
	</div>
	<?php include 'footer.php'; ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
	<script src="script.js"></script>
    <script src="script4.js"></script>
</body>
</html>

<?php

} 
else {
    header('location:login.php?login=youdidntlogin');
}

?>