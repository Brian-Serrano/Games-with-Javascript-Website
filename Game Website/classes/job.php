<?php

class job extends database {

    private $job;

    public function __construct($job){
        $this->job = $job;
    }
    public function noInput(){
        return empty($this->job);
    }
    public function length(){
        return strlen($this->job) < 7 || strlen($this->job) > 20;
    }
    public function setJob(){
        if($this->noInput()){
            header('location:account.php?job=noinput');
            exit();
        }
        if($this->length()){
            header('location:account.php?job=invalidlength');
            exit();
        }
        $this->queryJob($this->job);
    }
    public function queryJob($job){
        $query = "UPDATE users SET job = '$job' WHERE username = '".$_SESSION['user']."';";
        $query_run = mysqli_query($this->connect(), $query);
        if(!$query_run) {
            header('location:account.php?error=queryfailed');
            exit();
        }

        $this->session();
    }

}

?>