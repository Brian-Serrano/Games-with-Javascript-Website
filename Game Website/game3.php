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
    .spaceship, .spaceshipflip, .image, #start-button, #back-button, #leaderboard-button, #leaderboard-background {
        display: none;
    }
</style>
<body>
    <?php include 'header.php'; ?>
	<div class="main">
        <?php include "gameaside.php"; ?>
		<div class="article">
            <div id="game">
                <h1>Ship Destroyer</h1>
                <canvas id="canvas" width="700px" height="500px"></canvas>
            </div>
            <img src="assets/Buttons/start_button.png" id="start-button">
            <img src="assets/Buttons/back_button.png" id="back-button">
            <img src="assets/Buttons/leaderboard_button.png" id="leaderboard-button">
            <img src="assets/Ship Destroyer/Ship_Destroyer_Leaderboard.png" id="leaderboard-background">
            <div class="spaceship">
                <img id="ship" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs/Main Ship - Base - Very damaged.png">
                <img id="ship" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs/Main Ship - Base - Damaged.png">
                <img id="ship" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs/Main Ship - Base - Slight damage.png">
                <img id="ship" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs/Main Ship - Base - Full health.png">
                <img id="bullet" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs/Main ship weapon - Projectile - Auto cannon bullet.png">
                <img id="bullet" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs/Main ship weapon - Projectile - Big Space Gun.png">
                <img id="bullet" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs/Main ship weapon - Projectile - Rocket.png">
                <img id="bullet" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs/Main ship weapon - Projectile - Zapper.png">
            </div>
            <div class="spaceshipflip">
                <img id="shipflip" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs flipped/Main Ship - Base - Very damaged.png">
                <img id="shipflip" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs flipped/Main Ship - Base - Damaged.png">
                <img id="shipflip" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs flipped/Main Ship - Base - Slight damage.png">
                <img id="shipflip" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs flipped/Main Ship - Base - Full health.png">
                <img id="bulletflip" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs flipped/Main ship weapon - Projectile - Auto cannon bullet.png">
                <img id="bulletflip" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs flipped/Main ship weapon - Projectile - Big Space Gun.png">
                <img id="bulletflip" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs flipped/Main ship weapon - Projectile - Rocket.png">
                <img id="bulletflip" src="assets/Ship Destroyer/Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs flipped/Main ship weapon - Projectile - Zapper.png">
            </div>
            <div class="image">
                <img id="img" src="assets/Ship Destroyer/parallax_mountain_pack/layers/parallax-mountain-bg.png">
                <img id="img" src="assets/Ship Destroyer/parallax_mountain_pack/layers/parallax-mountain-foreground-trees.png">
                <img id="img" src="assets/Ship Destroyer/parallax_mountain_pack/layers/parallax-mountain-montain-far.png">
                <img id="img" src="assets/Ship Destroyer/parallax_mountain_pack/layers/parallax-mountain-mountains.png">
                <img id="img" src="assets/Ship Destroyer/parallax_mountain_pack/layers/parallax-mountain-trees.png">
            </div>
        </div>
        <?php include "recommendaside.php"; ?>
	</div>
	<?php include 'footer.php'; ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
	<script src="script.js"></script>
    <script src="script3.js"></script>
</body>
</html>

<?php

} 
else {
    header('location:login.php?login=youdidntlogin');
}

?>