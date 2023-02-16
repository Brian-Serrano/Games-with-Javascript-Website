<?php

class birthplace extends database {

    private $birthplace;

    public function __construct($birthplace){
        $this->birthplace = $birthplace;
    }
    public function noInput(){
        return empty($this->birthplace);
    }
    public function length(){
        return strlen($this->birthplace) < 7 || strlen($this->birthplace) > 20;
    }
    public function setBirthplace(){
        if($this->noInput()){
            header('location:account.php?birthplace=noinput');
            exit();
        }
        if($this->length()){
            header('location:account.php?birthplace=invalidlength');
            exit();
        }
        $this->queryBirthplace($this->birthplace);
    }
    public function queryBirthplace($birthplace){
        $query = "UPDATE users SET birthplace = '$birthplace' WHERE username = '".$_SESSION['user']."';";
        $query_run = mysqli_query($this->connect(), $query);
        if(!$query_run) {
            header('location:account.php?error=queryfailed');
            exit();
        }

        $this->session();
    }

}

?>