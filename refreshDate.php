<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/methods.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/lib/config.php';
//create connection
$conn = mysqli_connect(_HOSTNAME_, _USERNAME_, _PASSWORD_, _DB_, _PORT_);
//check if error
if (!$conn) {
    die("Connection Error" . mysqli_connect_error());
}

//Post, username, currDay
$currDate = $_POST["currDate"];
$username = $_POST["username"];

$rows = checkInAlreadyOrNot($username,$conn,$currDate);
if($rows == 0){
    echo "no";
}else{
    echo "yes";
}

mysqli_close($conn);