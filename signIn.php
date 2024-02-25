<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/lib/config.php';
//create connection
$conn = mysqli_connect(_HOSTNAME_, _USERNAME_, _PASSWORD_, _DB_, _PORT_);
//check if error
if (!$conn) {
    die("Connection Error" . mysqli_connect_error());
}

//Post, username, email
$username = $_POST["nameSignIn"];
$email = $_POST["emailSignIn"];

function selectFromLoginUser($conn, $username, $email)
{
    $sql = "SELECT * FROM LoginUser WHERE username = '" . $username."' and email = '". $email ."'";
    $result = mysqli_query($conn, $sql);
    $rows = mysqli_num_rows($result);

    if ($rows > 0) {
        echo "success";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

selectFromLoginUser($conn, $username, $email);

$conn->close();