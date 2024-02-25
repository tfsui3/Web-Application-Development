<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/lib/config.php';
//create connection
$conn = mysqli_connect(_HOSTNAME_,_USERNAME_,_PASSWORD_,_DB_,_PORT_);
//check if error
if(!$conn){
    die("Connection Error". mysqli_connect_error());
}

//Post, username, password
$username = $_POST["username"];
$password = $_POST["password"];

function selectFromLoginUser($conn, $username, $password){
    $sql= "SELECT * FROM LoginUser WHERE username = '".$username."' and password = '".$password."'";
    $result = mysqli_query($conn,$sql);
    $rows = mysqli_num_rows($result);
    if (mysqli_num_rows($result) > 0) {
        echo "good";
    }else{
        echo "bad";
    }
}

selectFromLoginUser($conn,$username,$password);

mysqli_close($conn);
