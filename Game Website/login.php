<?php

session_start();

if (isset($_SESSION["id"])) {
    header('location:index.php');
} else {
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
            <h1>Log In</h1>
            <form action="login.php" method="post">
                <fieldset class="fieldset">
                    <label for="user">Username:</label><input id="user" type = "text" name = "user" class = "input" placeholder="Username here..." maxlength="20" minlength="7" required>
                    <label for="pwd">Password:</label><input id="pwd" type = "password" name = "pwd" class = "input" placeholder="Password here..." maxlength="20" minlength="7" required>
                </fieldset>
                <fieldset class="terms">
                    <label class="container">I agree with <a href="terms.php" target="_blank">terms and conditions</a>
                        <input type="checkbox" id="terms" name="terms" value="terms" required>
                        <span class="checkmark"></span>
                    </label>
                </fieldset>
                <br>
                <a onclick="myFunc()" class="hsp">Hide/Show Password</a><br><br><br>
                <button class="button-15" role="button" name="login" type="submit">Log In</button>
                <p>Don't have an account yet? <a href="signup.php">Sign Up Here</a></p>
            </form>
            <script>
                function myFunc() {
                    var toggle = document.getElementById("pwd");
                    if(toggle.type == "password"){
                        toggle.type = "text";
                    } else {
                        toggle.type = "password";
                    }
                }
            </script>
            <?php
				if (isset($_POST['login'])){

                    $user = $_POST['user'];
                    $pwd = $_POST['pwd'];

					include "classes/database.php";
                    include "classes/loginfunc.php";

                    $login = new loginfunc($user, $pwd);
                    $login->loginUser();
                    echo "<script type='text/javascript'>document.location.href='index.php';</script>";
                }

				$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                if(strpos($url, "login=noinput")){ 
                    echo "<p>You did not input</p>";
                }
                if(strpos($url, "login=usernotfound")){ 
                    echo "<p>User not found</p>";
                }
                if(strpos($url, "login=wrongpassword")){ 
                    echo "<p>Wrong password</p>";
                }
                if(strpos($url, "login=queryfailed")){ 
                    echo "<p>An error occured</p>";
                }
                if(strpos($url, "login=invalidlength")){ 
                    echo "<p>Enter specified length</p>";
                }
                if(strpos($url, "login=youdidntlogin")){ 
                    echo "<p>Login first to access</p>";
                }
                if(strpos($url, "error=queryfailed")){ 
                    echo "<p>An error occured</p>";
                }
			?>
        </div>
        <?php include "recommendaside.php"; ?>
	</div>
	<?php include 'footer.php'; ?>
	<script src="script.js"></script>
</body>
</html>

<?php } ?>