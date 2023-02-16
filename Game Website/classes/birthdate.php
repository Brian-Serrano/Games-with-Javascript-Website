<?php

class birthdate extends database {

    private $birthdate;

    public function __construct($birthdate){
        $this->birthdate = $birthdate;
    }
    public function noInput(){
        return empty($this->birthdate);
    }
    public function length(){
        return strlen($this->birthdate) < 7 || strlen($this->birthdate) > 20;
    }
    public function setBirthdate(){
        if($this->noInput()){
            header('location:account.php?birthdate=noinput');
            exit();
        }
        if($this->length()){
            header('location:account.php?birthdate=invalidlength');
            exit();
        }
        $this->queryBirthdate($this->birthdate);
    }
    public function queryBirthdate($birthdate){
        $query = "UPDATE users SET birthdate = '$birthdate' WHERE username = '".$_SESSION['user']."';";
        $query_run = mysqli_query($this->connect(), $query);
        if(!$query_run) {
            header('location:account.php?error=queryfailed');
            exit();
        }

        $this->session();
    }

}

?>