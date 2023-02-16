<?php

class age extends database {

    private $age;

    public function __construct($age){
        $this->age = $age;
    }
    public function noInput(){
        return empty($this->age);
    }
    public function isNumber(){
        return !filter_var($this->age, FILTER_VALIDATE_INT);
    }
    public function length(){
        return $this->age > 120 || $this->age < 12;
    }
    public function setAge(){
        if($this->noInput()){
            header('location:account.php?age=noinput');
            exit();
        }
        if($this->isNumber()){
            header('location:account.php?age=notnumber');
            exit();
        }
        if($this->length()){
            header('location:account.php?age=invalidlength');
            exit();
        }
        $this->queryAge($this->age);
    }
    public function queryAge($age){
        $query = "UPDATE users SET age = '$age' WHERE username = '".$_SESSION['user']."';";
        $query_run = mysqli_query($this->connect(), $query);
        if(!$query_run) {
            header('location:account.php?error=queryfailed');
            exit();
        }

        $this->session();
    }

}

?>