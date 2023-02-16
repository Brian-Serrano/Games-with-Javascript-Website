<?php

class signupfunc extends database {

    private $user;
    private $email;
    private $pwd;
    private $confPwd;
    private $age;
    private $job;
    private $birthdate;
    private $birthplace;
    private $address;

    public function __construct($user, $email, $pwd, $confPwd, $age, $job, $birthdate, $birthplace, $address){
        $this->user = $user;
        $this->email = $email;
        $this->pwd = $pwd;
        $this->confPwd = $confPwd;
        $this->age = $age;
        $this->job = $job;
        $this->birthdate = $birthdate;
        $this->birthplace = $birthplace;
        $this->address = $address;
    }
    public function noInput(){
        return empty($this->user) || empty($this->email) || empty($this->pwd) || empty($this->confPwd) || empty($this->age) || empty($this->job) || empty($this->birthdate) || empty($this->birthplace) || empty($this->address);
    }
    public function invalidUser(){
        return !preg_match("/^[a-zA-Z0-9]{7,20}$/", $this->user);
    }
    public function pwdValidation(){
        $uppercase = preg_match('@[A-Z]@', $this->pwd);
        $lowercase = preg_match('@[a-z]@', $this->pwd);
        $number = preg_match('@[0-9]@', $this->pwd);
        $specialChars = preg_match('@[^\w]@', $this->pwd);

        return !$uppercase || !$lowercase || !$number || !$specialChars;
    }
    public function invalidEmail(){
        return !filter_var($this->email, FILTER_VALIDATE_EMAIL);
    }
    public function pwdMatch(){
        return $this->pwd !== $this->confPwd;
    }
    public function takenCheck(){
        return !$this->checkUser($this->user, $this->email);
    }
    public function length(){
        return strlen($this->user) < 7 || strlen($this->user) > 20 ||
                strlen($this->pwd) < 7 || strlen($this->pwd) > 20 ||
                strlen($this->confPwd) < 7 || strlen($this->confPwd) > 20 ||
                strlen($this->email) < 10 || strlen($this->email) > 40 ||
                strlen($this->job) < 7 || strlen($this->job) > 20 ||
                strlen($this->birthdate) < 7 || strlen($this->birthdate) > 20 ||
                strlen($this->birthplace) < 7 || strlen($this->birthplace) > 20 ||
                strlen($this->address) < 7 || strlen($this->address) > 30 ||
                $this->age < 12 || $this->age > 120;
    }
    public function signupUser(){

        if($this->noInput()){
            echo "<script type='text/javascript'>document.location.href='signup.php?signup=noinput';</script>";
            exit();
        }
        if($this->invalidUser()){
            echo "<script type='text/javascript'>document.location.href='signup.php?signup=user';</script>";
            exit();
        }
        if($this->pwdValidation()){
            echo "<script type='text/javascript'>document.location.href='signup.php?signup=pwdvalidation';</script>";
            exit();
        }
        if($this->invalidEmail()){
            echo "<script type='text/javascript'>document.location.href='signup.php?signup=email';</script>";
            exit();
        }
        if($this->pwdMatch()){
            echo "<script type='text/javascript'>document.location.href='signup.php?signup=password';</script>";
            exit();
        }
        if($this->takenCheck()){
            echo "<script type='text/javascript'>document.location.href='signup.php?signup=taken';</script>";
            exit();
        }
        if($this->length()){
            echo "<script type='text/javascript'>document.location.href='signup.php?signup=invalidlength';</script>";
            exit();
        }
        
        $this->setUser($this->user, $this->email, $this->pwd, $this->age, $this->job, $this->birthdate, $this->birthplace, $this->address);
    }
    public function checkUser($user, $email){
        
        $query = "SELECT username FROM users WHERE username = '$user' OR email = '$email';";
        $query_run = mysqli_query($this->connect(), $query);
        if(!$query_run) {
            echo "<script type='text/javascript'>document.location.href='signup.php?signup=queryfailed';</script>";
            exit();
        }
        $resultCheck = mysqli_num_rows($query_run) > 0;
        return !$resultCheck;
    }
    public function setUser($user, $email, $pwd, $age, $job, $birthdate, $birthplace, $address){
        $hashPwd = password_hash($pwd, PASSWORD_DEFAULT);
        $query = "INSERT INTO users (username, email, pass, age, job, birthdate, birthplace, address) VALUES ('$user', '$email', '$hashPwd', '$age', '$job', '$birthdate', '$birthplace', '$address');";
        $query_run = mysqli_query($this->connect(), $query);
        if(!$query_run) {
            echo "<script type='text/javascript'>document.location.href='signup.php?signup=queryfailed';</script>";
            exit();
        }
        session_start();
        $query2 = "SELECT id FROM users WHERE username = '$user';";
        $query_run2 = mysqli_query($this->connect(), $query2);

        if(!$query_run2) {
            echo "<script type='text/javascript'>document.location.href='signup.php?signup=queryfailed';</script>";
            exit();
        }
        $id = mysqli_fetch_assoc($query_run2);
        $_SESSION["id"] = $id['id'];
        $this->session();
    }
}

?>