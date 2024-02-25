<?php
//header('Content-Type:text/json;charset=utf-8');

require_once $_SERVER['DOCUMENT_ROOT'] . '/methods.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/lib/config.php';
//create connection
$conn = mysqli_connect(_HOSTNAME_, _USERNAME_, _PASSWORD_, _DB_, _PORT_);
//check if error
if (!$conn) {
    die("Connection Error" . mysqli_connect_error());
}

//Post, username, password
$date = $_POST["myDate"];
$username = $_POST["username"];

$rows = checkInAlreadyOrNot($username,$conn,$date);
checkIn($username,$conn,$date,$rows);
$str = getInfo($username,$conn);


$json_encode = json_encode($str);
echo $json_encode;
mysqli_close($conn);
