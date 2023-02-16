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
            <h1>Sign Up</h1>
            <form action="signup.php" method="post">
                <fieldset class="fieldset">
                    <label for="user">Username:</label><input id="user" type="text" name="user" class="input" placeholder="Username here..." maxlength="20" minlength="7" title="Username must be at least 7 characters and not greater than 20 characters" required>
                    <label for="email">Email:</label><input id="email" type="email" name="email" class="input" placeholder="Email address here..." maxlength="40" minlength="10" title="Email should have valid format" required>
                    <label for="pwd">Password:</label><input id="pwd" type="password" name="pwd" class="input" placeholder="Password here..." maxlength="20" minlength="7" title="Password must be at least 7 characters and not greater than 20 characters and must include at least one uppercase letter, number and special character" required>
                    <label for="conPwd">Confirm:</label><input id="conPwd" type="password" name="conPwd" class="input" placeholder="Confirm password here..." maxlength="20" minlength="7" title="Confirm password should be the same with password" required>
                </fieldset>
                <fieldset class="fieldset">
                    <label for="age">Age:</label><input id="age" type="number" name="age" class="input" placeholder="Age here..." max="120" min="12" required>
                    <label for="job">Job:</label><input id="job" type="text" name="job" class="input" placeholder="Job here..." maxlength="20" minlength="7" required>
                    <label for="birth">Birthdate:</label><input id="birth" type="date" name="birth" class="input" placeholder="Birthdate here..." maxlength="20" minlength="7" required>
                    <label for="place">Birthplace:</label><input id="place" type="text" name="place" class="input" placeholder="Birthplace here..." maxlength="20" minlength="7" required>
                    <label for="address">Address:</label><input id="address" type="text" name="address" class="input" placeholder="Address here..." maxlength="30" minlength="7" required>
                </fieldset>
                <fieldset class="terms">
                    <label class="container">I agree with <a href="terms.php" target="_blank">terms and conditions</a>
                        <input type="checkbox" id="terms" name="terms" value="terms" required>
                        <span class="checkmark"></span>
                    </label>
                </fieldset>
                <br>
                <a onclick="myFunc()" class="hsp">Hide/Show Password</a><br><br><br>
                <button class="button-15" role="button" name="signup" type="submit">Sign Up</button><br><br>
            </form>
            <script>
                function myFunc() {
                    var toggle1 = document.getElementById("pwd");
                    var toggle2 = document.getElementById("conPwd");
                    if(toggle1.type == "password"){
                        toggle1.type = "text";
                        toggle2.type = "text";
                    } else {
                        toggle1.type = "password";
                        toggle2.type = "password";
                    }
                }
            </script>
            <?php
                if (isset($_POST['signup'])) {

                    $user = $_POST['user'];
                    $email = $_POST['email'];
                    $pwd = $_POST['pwd'];
                    $conPwd = $_POST['conPwd'];
                    $age = $_POST['age'];
                    $job = $_POST['job'];
                    $birthdate = $_POST['birth'];
                    $birthplace = $_POST['place'];
                    $address = $_POST['address'];


                    include "classes/database.php";
                    include "classes/signupfunc.php";

                    $signup = new signupfunc($user, $email, $pwd, $conPwd, $age, $job, $birthdate, $birthplace, $address);
                    $signup->signupUser();
                    echo "<script type='text/javascript'>document.location.href='index.php';</script>";
                }

                $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                if (strpos($url, "signup=noinput")) {
                    echo "<p>You did not input</p>";
                }
                if (strpos($url, "signup=user")) {
                    echo "<p>Username Validation Failed</p>";
                }
                if (strpos($url, "signup=pwdvalidation")) {
                    echo "<p>Password Validation Failed</p>";
                }
                if (strpos($url, "signup=email")) {
                    echo "<p>Invalid email address</p>";
                }
                if (strpos($url, "signup=password")) {
                    echo "<p>Passwords don't match</p>";
                }
                if (strpos($url, "signup=taken")) {
                    echo "<p>Username or Email Already exists</p>";
                }
                if(strpos($url, "signup=invalidlength")){ 
                    echo "<p>Enter specified length</p>";
                }
                if (strpos($url, "signup=queryfailed")) {
                    echo "<p>An error occured</p>";
                }
                if (strpos($url, "error=queryfailed")) {
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