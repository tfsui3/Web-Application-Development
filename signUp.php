<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/lib/config.php';
//create connection
$conn = mysqli_connect(_HOSTNAME_,_USERNAME_,_PASSWORD_,_DB_,_PORT_);
//check if error
if(!$conn){
    die("Connection Error". mysqli_connect_error());
}

//Post, username, password
$username = $_POST["nameSignUp"];
$email = $_POST["emailSignUp"];


$sql= "INSERT INTO LoginUser(username,email) 
        VALUES ('".$username."','".$email."')";

if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

mysqli_close($conn);