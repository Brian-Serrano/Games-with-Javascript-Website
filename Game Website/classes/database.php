<?php

class database {
    
    public function connect(){
        $conn = mysqli_connect('localhost', 'root', '', 'gwdb');
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        return $conn;
    }
    public function session(){
        
        $query = "SELECT * FROM users WHERE id = '".$_SESSION['id']."';";
        $query_run = mysqli_query($this->connect(), $query);
        if(!$query_run) {
            echo "<script type='text/javascript'>document.location.href='".$_SERVER['PHP_SELF']."?error=queryfailed';</script>";
            exit();
        }
        $user = mysqli_fetch_assoc($query_run);
        
        $_SESSION["id"] = $user["id"];
        $_SESSION["user"] = $user["username"];
        $_SESSION["pwd"] = $user["pass"];
        $_SESSION["email"] = $user["email"];
        $_SESSION["age"] = $user["age"];
        $_SESSION["job"] = $user["job"];
        $_SESSION["birthdate"] = $user["birthdate"];
        $_SESSION["birthplace"] = $user["birthplace"];
        $_SESSION["address"] = $user["address"];
        $_SESSION["game1"] = $user["FruitCatch"];
        $_SESSION["game2"] = $user["BalloonPop"];
        $_SESSION["game3"] = $user["ShipDestroyer"];
        $_SESSION["game4"] = $user["ColorBallFlap"];
        $_SESSION["game5"] = $user["CubeJump"];
    }
}

?>