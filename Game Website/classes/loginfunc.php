<?php

class loginfunc extends database {

    private $user;
    private $pwd;

    public function __construct($user, $pwd){
        $this->user = $user;
        $this->pwd = $pwd;
    }
    public function noInput(){
        return empty($this->user) || empty($this->pwd);
    }
    public function length(){
        return strlen($this->pwd) < 7 || strlen($this->pwd) > 20 || strlen($this->user) < 7 || strlen($this->user) > 20;
    }
    public function loginUser(){

        if($this->noInput()){
            echo "<script type='text/javascript'>document.location.href='login.php?login=noinput';</script>";
            exit();
        }
        if($this->length()){
            echo "<script type='text/javascript'>document.location.href='login.php?login=invalidlength';</script>";
            exit();
        }
        $this->getUser($this->user, $this->pwd);
    }
    public function getUser($user, $pwd){

        $query = "SELECT pass FROM users WHERE username = '$user';";
        $query_run = mysqli_query($this->connect(), $query);

        if(!$query_run) {
            echo "<script type='text/javascript'>document.location.href='login.php?login=queryfailed';</script>";
            exit();
        }
        if (mysqli_num_rows($query_run) == 0) {
            echo "<script type='text/javascript'>document.location.href='login.php?login=usernotfound';</script>";
            exit();
        }
        $hashedPwd = mysqli_fetch_assoc($query_run);
        $checkPwd = password_verify($pwd, $hashedPwd['pass']);

        if (!$checkPwd){
            echo "<script type='text/javascript'>document.location.href='login.php?login=wrongpassword';</script>";
            exit();
        } else if ($checkPwd){
            session_start();
            $query2 = "SELECT id FROM users WHERE username = '$user';";
            $query_run2 = mysqli_query($this->connect(), $query2);

            if(!$query_run2) {
                echo "<script type='text/javascript'>document.location.href='login.php?login=queryfailed';</script>";
                exit();
            }
            $id = mysqli_fetch_assoc($query_run2);
            $_SESSION["id"] = $id['id'];
            $this->session();
        }
    }
}

?>