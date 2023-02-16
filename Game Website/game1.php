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
    #food, #basket, #theme, .image1, .image2, .image3, #start-button, #back-button, #leaderboard-button, #leaderboard-background {
        display: none;
    }
</style>
<body>
    <?php include 'header.php'; ?>
	<div class="main">
        <?php include "gameaside.php"; ?>
		<div class="article">
            <div id="game">
                <h1>Fruit Catch</h1>
                <canvas id="canvas" width="700px" height="500px"></canvas>
            </div>
            <img src="assets/Fruit Catch/PACK/sprites.png" id="food">
            <img src="assets/Fruit Catch/basket.png" id="basket">
            <img src="assets/Fruit Catch/m1/PRE_ORIG_SIZE.png" id="theme">
            <img src="assets/Fruit Catch/m3/PRE_ORIG_SIZE.png" id="theme">
            <img src="assets/Fruit Catch/m6/PRE_ORIG_SIZE.png" id="theme">
            <img src="assets/Buttons/start_button.png" id="start-button">
            <img src="assets/Buttons/back_button.png" id="back-button">
            <img src="assets/Buttons/leaderboard_button.png" id="leaderboard-button">
            <img src="assets/Fruit Catch/Fruit_Catch_Leaderboard.png" id="leaderboard-background">
            <div class="image1">
                <img id="img1" src="assets/Fruit Catch/m1/1.png">
                <img id="img1" src="assets/Fruit Catch/m1/2.png">
                <img id="img1" src="assets/Fruit Catch/m1/3.png">
                <img id="img1" src="assets/Fruit Catch/m1/4.png">
                <img id="img1" src="assets/Fruit Catch/m1/5.png">
            </div>
            <div class="image2">
                <img id="img2" src="assets/Fruit Catch/m3/1.png">
                <img id="img2" src="assets/Fruit Catch/m3/2.png">
                <img id="img2" src="assets/Fruit Catch/m3/3.png">
                <img id="img2" src="assets/Fruit Catch/m3/4.png">
                <img id="img2" src="assets/Fruit Catch/m3/5.png">
            </div>
            <div class="image3">
                <img id="img3" src="assets/Fruit Catch/m6/1.png">
                <img id="img3" src="assets/Fruit Catch/m6/2.png">
                <img id="img3" src="assets/Fruit Catch/m6/3.png">
                <img id="img3" src="assets/Fruit Catch/m6/4.png">
                <img id="img3" src="assets/Fruit Catch/m6/5.png">
            </div>
        </div>
        <?php include "recommendaside.php"; ?>
	</div>
	<?php include 'footer.php'; ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <script src="script1.js"></script>
</body>
</html>

<?php

} 
else {
    header('location:login.php?login=youdidntlogin');
}

?>