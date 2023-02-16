<?php

class address extends database {

    private $address;

    public function __construct($address){
        $this->address = $address;
    }
    public function noInput(){
        return empty($this->address);
    }
    public function length(){
        return strlen($this->address) < 7 || strlen($this->address) > 30;
    }
    public function setAddress(){
        if($this->noInput()){
            header('location:account.php?address=noinput');
            exit();
        }
        if($this->length()){
            header('location:account.php?address=invalidlength');
            exit();
        }
        $this->queryAddress($this->address);
    }
    public function queryAddress($address){
        $query = "UPDATE users SET address = '$address' WHERE username = '".$_SESSION['user']."';";
        $query_run = mysqli_query($this->connect(), $query);
        if(!$query_run) {
            header('location:account.php?error=queryfailed');
            exit();
        }

        $this->session();
    }

}

?>