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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Document</title>
</head>
<body>
    <?php include "header.php"; ?>
    <div class="main">
        <?php include "gameaside.php"; ?>
        <div class="article">
            <h1>Hi <?php echo $_SESSION['user']; ?>, Welcome to our Website</h1><hr>
            <p>Welcome to our game website! We are excited to offer a wide selection of fun and entertaining games for players of all ages. Our current lineup includes Fruit Catch, Balloon Pop, Ship Destroyer, ColorBall Flap, and Cube Jump.</p>
            <p>In addition to our games, we also offer a login-signup feature. By creating an account, you can keep track of your high scores, compete against other players from around the world, and save your progress to pick up where you left off on any device.</p>
            <p>Our website is designed to be easy to use and accessible on any device, so you can enjoy our games and features wherever you are. So why wait? Start playing now and see how high you can score!</p>
        </div>
        <?php include "recommendaside.php"; ?>
    </div>
    <?php include "footer.php"; ?>
    <script src="script.js"></script>
</body>
</html>

<?php

} 
else {
    header('location:login.php?login=youdidntlogin');
}

?>