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
<body>
    <?php include 'header.php'; ?>
	<div class="main">
        <?php include "gameaside.php"; ?>
		<div class="article">
            <h1>About Website</h1><hr>
            <p>Welcome to our game website! We are excited to offer a variety of fun and exciting games for you to enjoy. Our current selection includes Fruit Catch, Balloon Pop, Ship Destroyer, ColorBall Flap, and Cube Jump.</p>
            <p>In addition to our games, we also offer a login-signup feature. By creating an account, you can keep track of your high scores and compete against other players from around the world. Plus, you'll have the ability to save your progress and pick up where you left off on any device.</p>
            <p>Our website is designed to be easy to use and accessible on any device. Whether you are using a desktop computer, or a laptop you'll be able to enjoy our games and features without any problems.</p>
            <p>Thank you for visiting our website. We hope you have a great time playing our games, and we look forward to seeing you again soon!</p>
        </div>
        <?php include "recommendaside.php"; ?>
	</div>
	<?php include 'footer.php'; ?>
	<script src="script.js"></script>
</body>
</html>

<?php

} 
else {
    header('location:login.php?login=youdidntlogin');
}

?>