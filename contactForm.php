<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'lib/PHPMailer/Exception.php';
require 'lib/PHPMailer/PHPMailer.php';
require 'lib/PHPMailer/SMTP.php';


$error = '';
$name = '';
$email = '';
$subject = '';
$message = '';

function clean_text($string): string
{
    $string = trim($string);
    $string = stripslashes($string);
    return htmlspecialchars($string);
}


if (empty($_POST["name"])) {
    $error .= '<p><label class="text-danger">Please enter your name.
                   </label></p>';
} else {
    $name = clean_text($_POST["name"]);
    if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
        $error .= '<p><label>Must enter a valid name.</label></p>';
    }
}
if (empty($_POST["email"])) {
    $error .= '<p><label>Please enter your email.</label></p>';
} else {
    $email = clean_text($_POST["email"]);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error .= '<p><label class="text-danger"> Invalid email format.
                    </label></p>';
    }
}
if (empty($_POST["subject"])) {
    $error .= '<p><label class="text-danger"> Subject is required.
                    </label></p>';
} else {
    $subject = clean_text($_POST["subject"]);
}
if (empty($_POST["message"])) {
    $error .= '<p><label class="text-danger"> Message is required.
                    </label></p>';
} else {
    $message = clean_text($_POST["message"]);
}

if ($error == '') {
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = '587';
    $mail->SMTPAuth = true;
    $mail->Username = 'troywebproject7@gmail.com';
    $mail->Password = '.tr0ywebpr0ject7';
    $mail->SMTPSecure = 'tls';
    try {
        $mail->setFrom('troywebproject7@gmail.com');
    } catch (Exception $e) {
        $error = "Sorry, there is an unexpected error";
    }
    try {
        $mail->addReplyTo($email, $name);
    } catch (Exception $e) {
        $error = "Sorry, there is an unexpected error";
    }
    try {
        $mail->addAddress('troywebproject7@gmail.com', 'jimmy');
    } catch (Exception $e) {
        $error = "Sorry, there is an unexpected error";
    }

    $mail->WordWrap = 50;
    $mail->IsHTML(true);
    $mail->Subject = $_POST["subject"];
    $mail->Body = $_POST["message"] . " by:" . $email . ", " . $name;
    try {
        if ($mail->Send()) {
            $error = '<label class="text-success">Thank you for contacting us</label>';
            echo "Success";
        } else {
            $error = '<label class="text-success">There is an Error</label>';
            echo "Fail";
        }
    } catch (Exception $e) {
        echo "Send() error";
    }

    $mail->smtpClose();
}

