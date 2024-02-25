<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/lib/config.php';
//create connection
$conn = mysqli_connect(_HOSTNAME_, _USERNAME_, _PASSWORD_, _DB_, _PORT_);
//check if error
if (!$conn) {
    die("Connection Error" . mysqli_connect_error());
}

//Post, username
$username = $_POST["nameSignUp"];

function selectNameFromLoginUser($conn, $username)
{
    $sql = "SELECT * FROM LoginUser WHERE username = '" . $username."'";
    $result = mysqli_query($conn, $sql);
    $rows = mysqli_num_rows($result);
    if ($rows > 0) {
        echo "exists";
    } else {
        echo "no";
    }
}

selectNameFromLoginUser($conn, $username);

mysqli_close($conn);
