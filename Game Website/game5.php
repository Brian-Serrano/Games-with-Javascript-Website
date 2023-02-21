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
    .tiles, .images {
        display: none;
    }
</style>
<body>
    <?php include 'header.php'; ?>
	<div class="main">
        <?php include "gameaside.php"; ?>
		<div class="article">
            <div id="game">
                <h1>Cube Jump</h1>
                <canvas id="canvas" width="700px" height="500px"></canvas>
            </div>
            <div class="images">
                <img src="assets/Buttons/start_button.png" id="start-button">
                <img src="assets/Buttons/back_button.png" id="back-button">
                <img src="assets/Buttons/leaderboard_button.png" id="leaderboard-button">
                <img src="assets/Buttons/settings_button.png" id="settings-button">
                <img src="assets/Buttons/continue_button.png" id="continue-button">
                <img src="assets/Buttons/restart_button.png" id="restart-button">
                <img src="assets/Buttons/home_button.png" id="home-button">
                <img src="assets/Cube Jump/Cube_Jump_Leaderboard.png" id="leaderboard-background">
            </div>
            <div class="tiles">
                <img id="tile" src="assets/Cube Jump/Tiles/block.png">
                <img id="tile" src="assets/Cube Jump/Tiles/flipped spike.png">
                <img id="tile" src="assets/Cube Jump/Tiles/spike.png">
                <img id="tile" src="assets/Cube Jump/Tiles/thorn.png">
            </div>
        </div>
        <?php include "recommendaside.php"; ?>
	</div>
	<?php include 'footer.php'; ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
	<script src="script.js"></script>
    <script src="script5.js"></script>
</body>
</html>

<?php

} 
else {
    header('location:login.php?login=youdidntlogin');
}

?>