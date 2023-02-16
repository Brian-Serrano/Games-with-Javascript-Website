<?php

class password extends database {

    private $ConPwd;
    private $NewPwd;

    public function __construct($ConPwd, $NewPwd){
        $this->ConPwd = $ConPwd;
        $this->NewPwd = $NewPwd;
    }
    public function noInput(){
        return empty($this->ConPwd) || empty($this->NewPwd);
    }
    public function pwdValidation(){
        $uppercase = preg_match('@[A-Z]@', $this->NewPwd);
        $lowercase = preg_match('@[a-z]@', $this->NewPwd);
        $number = preg_match('@[0-9]@', $this->NewPwd);
        $specialChars = preg_match('@[^\w]@', $this->NewPwd);

        return !$uppercase || !$lowercase || !$number || !$specialChars;
    }
    public function pwdMatch(){
        return !password_verify($this->ConPwd, $_SESSION['pwd']);
    }
    public function length(){
        return strlen($this->ConPwd) < 7 || strlen($this->ConPwd) > 20 || strlen($this->NewPwd) < 7 || strlen($this->NewPwd) > 20;
    }
    public function updatePwd(){

        if($this->noInput()){
            header('location:account.php?password=noinput');
            exit();
        }
        if($this->pwdValidation()){
            header('location:account.php?password=invalidpassword');
            exit();
        }
        if($this->pwdMatch()){
            header('location:account.php?password=passworddoesntmatch');
            exit();
        }
        if($this->length()){
            header('location:account.php?password=invalidlength');
            exit();
        }
        $this->queryPwd($this->ConPwd, $this->NewPwd);
    }
    public function queryPwd($ConPwd, $NewPwd) {
        $hashPwd = password_hash($NewPwd, PASSWORD_DEFAULT);
        $query = "UPDATE users SET pass = '$hashPwd' WHERE pass = '" . $_SESSION['pwd'] . "';";
        $query_run = mysqli_query($this->connect(), $query);
        if (!$query_run) {
            header('location:account.php?error=queryfailed');
            exit();
        }

        $this->session();
    }
}

?>