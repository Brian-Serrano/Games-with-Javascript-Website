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
    .tiles {
        display: none;
    }
</style>
<body>
    <?php include 'header.php'; ?>
	<div class="main">
        <?php include "gameaside.php"; ?>
		<div class="article">
            <h1>My Account</h1>
			<table id="info">
				<tr>
					<th>Key</th>
					<th>Value</th>
					<th>Edit</th>
				</tr>
				<tr>
					<td>Username:</td>
					<td><?php echo $_SESSION["user"]; ?></td>
					<td><a class="button-15" role="button" onclick="myFunc(0);">Edit</a></td>
				</tr>
				<tr>
					<td>Email Address:</td>
					<td><?php echo $_SESSION['email']; ?></td>
					<td></td>
				</tr>
				<tr>
					<td>Password:</td>
					<td>&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</td>
					<td><a class="button-15" role="button" onclick="myFunc(1);">Edit</a></td>
				</tr>
				<tr>
					<td>Age:</td>
					<td><?php echo $_SESSION["age"]; ?></td>
					<td><a class="button-15" role="button" onclick="myFunc(2);">Edit</a></td>
				</tr>
				<tr>
					<td>Job:</td>
					<td><?php echo $_SESSION["job"]; ?></td>
					<td><a class="button-15" role="button" onclick="myFunc(3);">Edit</a></td>
				</tr>
                <tr>
					<td>Birth Date:</td>
					<td><?php echo $_SESSION["birthdate"]; ?></td>
					<td><a class="button-15" role="button" onclick="myFunc(4);">Edit</a></td>
				</tr>
                <tr>
					<td>Birth Place:</td>
					<td><?php echo $_SESSION["birthplace"]; ?></td>
					<td><a class="button-15" role="button" onclick="myFunc(5);">Edit</a></td>
				</tr>
                <tr>
					<td>Address:</td>
					<td><?php echo $_SESSION["address"]; ?></td>
					<td><a class="button-15" role="button" onclick="myFunc(6);">Edit</a></td>
				</tr>
                <tr>
					<td>Fruit Catch Highscore:</td>
					<td><?php echo $_SESSION['game1']; ?></td>
					<td></td>
				</tr>
                <tr>
					<td>Balloon Pop Highscore:</td>
					<td><?php echo $_SESSION['game2']; ?></td>
					<td></td>
				</tr>
                <tr>
					<td>Ship Destroyer Highscore:</td>
					<td><?php echo $_SESSION['game3']; ?></td>
					<td></td>
				</tr>
                <tr>
					<td>ColorBall Flap Highscore:</td>
					<td><?php echo $_SESSION['game4']; ?></td>
					<td></td>
				</tr>
                <tr>
					<td>Cube Jump Highscore:</td>
					<td><?php echo $_SESSION['game5']; ?></td>
					<td></td>
				</tr>
			</table><br><br>
			<?php

                if (isset($_POST['SetUser'])){

                    $ConUser = $_POST['ConUser'];
                    $NewUser = $_POST['NewUser'];

                    include "classes/database.php";
                    include "classes/username.php";

                    $updateUser = new username($ConUser, $NewUser);
                    $updateUser->updateUser();
                    header('location:account.php?username=success');
                }

                if (isset($_POST['SetPwd'])){

                    $ConPwd = $_POST['ConPwd'];
                    $NewPwd = $_POST['NewPwd'];

                    include "classes/database.php";
                    include "classes/password.php";

                    $updatePwd = new password($ConPwd, $NewPwd);
                    $updatePwd->updatePwd();
                    header('location:account.php?password=success');
                }

				if(isset($_POST["setAge"])){

					$age = $_POST["age"];

					include "classes/database.php";
					include "classes/age.php";

					$myAge = new age($age);
					$myAge->setAge();
					header('location:account.php?age=success');
				}

				if(isset($_POST["setJob"])){

					$job = $_POST["job"];

					include "classes/database.php";
					include "classes/job.php";

					$myJob = new job($job);
					$myJob->setJob();
					header('location:account.php?job=success');
				}

                if(isset($_POST["setBirthdate"])){

					$birthdate = $_POST["birthdate"];

					include "classes/database.php";
					include "classes/birthdate.php";

					$myBirthdate = new birthdate($birthdate);
					$myBirthdate->setBirthdate();
					header('location:account.php?birthdate=success');
				}

                if(isset($_POST["setBirthplace"])){

					$birthplace = $_POST["birthplace"];

					include "classes/database.php";
					include "classes/birthplace.php";

					$myBirthplace = new birthplace($birthplace);
					$myBirthplace->setBirthplace();
					header('location:account.php?birthplace=success');
				}

                if(isset($_POST["setAddress"])){

					$address = $_POST["address"];

					include "classes/database.php";
					include "classes/address.php";

					$myAddress = new address($address);
					$myAddress->setAddress();
					header('location:account.php?address=success');
				}
					
				$url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                if(strpos($url, "username=noinput")){ 
                    echo "<p>You did not input</p>";
                }
                if(strpos($url, "username=invaliduser")){ 
                    echo "<p>Please enter valid username</p>";
                }
                if(strpos($url, "username=invalidlength")){ 
                    echo "<p>Enter specified length</p>";
                }
                if(strpos($url, "username=usernamedoesntmatch")){ 
                    echo "<p>Username doesnt match</p>";
                }
                if(strpos($url, "username=success")){ 
                    echo "<p>Username updated successfully</p>";
                }
                if(strpos($url, "password=noinput")){ 
                    echo "<p>You did not input</p>";
                }
                if(strpos($url, "password=invalidpassword")){ 
                    echo "<p>Please enter valid password</p>";
                }
                if(strpos($url, "password=invalidlength")){ 
                    echo "<p>Enter specified length</p>";
                }
                if(strpos($url, "password=passworddoesntmatch")){ 
                    echo "<p>Password doesnt match</p>";
                }
                if(strpos($url, "password=success")){ 
                    echo "<p>Password updated successfully</p>";
                }
				if(strpos($url, "error=queryfailed")){ 
					echo "<p>An error occured</p>";
				}
				if(strpos($url, "age=noinput")){ 
					echo "<p>You did not input</p>";
				}
				if(strpos($url, "age=notnumber")){ 
					echo "<p>Please enter valid age</p>";
				}
				if(strpos($url, "age=invalidlength")){ 
					echo "<p>Enter only 12 to 120</p>";
				}
				if(strpos($url, "age=success")){ 
					echo "<p>Age updated successfully</p>";
				}
				if(strpos($url, "job=noinput")){ 
					echo "<p>You did not input</p>";
				}
				if(strpos($url, "job=invalidlength")){ 
					echo "<p>Enter specified length</p>";
				}
				if(strpos($url, "job=success")){ 
					echo "<p>Job updated successfully</p>";
				}
                if(strpos($url, "birthdate=noinput")){ 
					echo "<p>You did not input</p>";
				}
				if(strpos($url, "birthdate=invalidlength")){ 
					echo "<p>Enter specified length</p>";
				}
				if(strpos($url, "birthdate=success")){ 
					echo "<p>Birthdate updated successfully</p>";
				}
                if(strpos($url, "birthplace=noinput")){ 
					echo "<p>You did not input</p>";
				}
				if(strpos($url, "birthplace=invalidlength")){ 
					echo "<p>Enter specified length</p>";
				}
				if(strpos($url, "birthplace=success")){ 
					echo "<p>Birthplace updated successfully</p>";
				}
                if(strpos($url, "address=noinput")){ 
					echo "<p>You did not input</p>";
				}
				if(strpos($url, "address=invalidlength")){ 
					echo "<p>Enter specified length</p>";
				}
				if(strpos($url, "address=success")){ 
					echo "<p>Address updated successfully</p>";
				}
			?>
            <form action="account.php" method="post" style="display: none;">
                <p>Confirm Username:</p>
                <input type = "text" name = "ConUser" class = "input" placeholder="Confirm Username here..." maxlength="20" minlength="7" required><br>
                <p>New Username:</p>
                <input type = "text" name = "NewUser" class = "input" placeholder="New Username here..." maxlength="20" minlength="7" required><br>
				<h5>Username must be at least 7 characters and not greater than 20 characters</h5><br><br><br>
                <button class="button-15" role="button" name="SetUser" type="submit">Change Username</button><br><br>
            </form>
            <form action="account.php" method="post" style="display: none;">
                <p>Confirm Password:</p>
                <input type = "password" name = "ConPwd" id = "toggle1" class = "input" placeholder="Confirm Password here..." maxlength="20" minlength="7" required><br>
                <p>New Password:</p>
                <input type = "password" name = "NewPwd" id = "toggle2" class = "input" placeholder="New Password here..." maxlength="20" minlength="7" required><br>
				<h5>Password must be at least 7 characters and not greater than 20 characters<br>and must include at least one uppercase letter, number and special character</h5><br><br><br>
				<a onclick="togglePassword()" class="hsp">Hide/Show Password</a><br><br><br><br>
                <button class="button-15" role="button" name="SetPwd" type="submit">Change Password</button><br><br>
            </form>
			<form action="account.php" method="post" style="display: none;">
				<p>Set Age</p>
				<input type="number" name="age" class="input" placeholder="Age here..." max="120" min="12" required><br><br>
				<button class="button-15" role="button" name="setAge" type="submit">Update Age</button><br><br>
			</form>
			<form action="account.php" method="post" style="display: none;">
				<p>Set Job</p>
				<input type="text" name="job" class="input" placeholder="Job here..." maxlength="20" minlength="7" required><br><br>
				<button class="button-15" role="button" name="setJob" type="submit">Update Job</button><br><br>
			</form>
            <form action="account.php" method="post" style="display: none;">
				<p>Set Birthdate</p>
				<input type="date" name="birthdate" class="input" placeholder="Birthdate here..." maxlength="20" minlength="7" required><br><br>
				<button class="button-15" role="button" name="setBirthdate" type="submit">Update Birthdate</button><br><br>
			</form>
            <form action="account.php" method="post" style="display: none;">
				<p>Set Birthplace</p>
				<input type="text" name="birthplace" class="input" placeholder="Birthplace here..." maxlength="20" minlength="7" required><br><br>
				<button class="button-15" role="button" name="setBirthplace" type="submit">Update Birthplace</button><br><br>
			</form>
            <form action="account.php" method="post" style="display: none;">
				<p>Set Address</p>
				<input type="text" name="address" class="input" placeholder="Address here..." maxlength="30" minlength="7" required><br><br>
				<button class="button-15" role="button" name="setAddress" type="submit">Update Address</button><br><br>
			</form>
            <script>
                function togglePassword() {
                    var toggle1 = document.getElementById("toggle1");
                    var toggle2 = document.getElementById("toggle2");
                    if(toggle1.type == "password"){
                        toggle1.type = "text";
                        toggle2.type = "text";

                    } else {
                        toggle1.type = "password";
                        toggle2.type = "password";
                    }
                }
            </script>
        </div>
        <?php include "recommendaside.php"; ?>
	</div>
	<?php include 'footer.php'; ?>
	<script src="script.js"></script>
    <script src="displayset.js"></script>
</body>
</html>

<?php

} 
else {
    header('location:login.php?login=youdidntlogin');
}

?>