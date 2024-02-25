<?php
//查询日期和用户名，并返回查询到的rows数量
function checkInAlreadyOrNot($username, $conn, $date){
    $sql1 = "SELECT * from CheckInLog
WHERE checkin = '".$date."' and username = '".$username."';";

    $result = mysqli_query($conn, $sql1);
    return mysqli_num_rows($result);
}

//
function checkIn($username, $conn, $date, $rows){
    if ($rows == 0) {
        $sql2 = "INSERT INTO CheckInLog(checkin, username) 
        VALUES ('".$date."','".$username."');";

        $conn->query($sql2);
    }
}

//Select, and return all the result set
function getInfo($username, $conn){

    $sql= "select * FROM CheckInLog 
where username = '".$username."';";

    echo $username;
    $result = mysqli_query($conn, $sql);
    $str = array();

    if (mysqli_num_rows($result) > 0) {
        // 输出数据
        $i = 0;
        while($row = mysqli_fetch_assoc($result)) {
            $str[$i] = $row["checkin"];
            $i++;
        }
    }

    return $str;
}