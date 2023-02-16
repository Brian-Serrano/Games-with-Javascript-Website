<?php

class username extends database {

    private $ConUser;
    private $NewUser;

    public function __construct($ConUser, $NewUser){
        $this->ConUser = $ConUser;
        $this->NewUser = $NewUser;
    }
    public function noInput(){
        return empty($this->ConUser) || empty($this->NewUser);
    }
    public function invalidUser(){
        return !preg_match("/^[a-zA-Z0-9]{7,20}$/", $this->NewUser);
    }
    public function userMatch(){
        return $this->ConUser != $_SESSION['user'];
    }
    public function length(){
        return strlen($this->ConUser) < 7 || strlen($this->ConUser) > 20 || strlen($this->NewUser) < 7 || strlen($this->NewUser) > 20;
    }
    public function updateUser(){

        if($this->noInput()){
            header('location:account.php?username=noinput');
            exit();
        }
        if($this->invalidUser()){
            header('location:account.php?username=invaliduser');
            exit();
        }
        if($this->userMatch()){
            header('location:account.php?username=usernamedoesntmatch');
            exit();
        }
        if($this->length()){
            header('location:account.php?username=invalidlength');
            exit();
        }
        $this->queryUser($this->ConUser, $this->NewUser);
    }
    public function queryUser($ConUser, $NewUser) {
        $query = "UPDATE users SET username = '$NewUser' WHERE username = '" . $_SESSION['user'] . "';";
        $query_run = mysqli_query($this->connect(), $query);
        if (!$query_run) {
            header('location:account.php?error=queryfailed');
            exit();
        }

        $this->session();
    }
}

?>