<?php header('Access-Control-Allow-Origin: *'); ?>

<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

require_once ('../file_upload/aws_s3/credential.php');

$pwd = sha1($_POST['password']);
$confirmPwd = sha1($_POST['confirmPwd']);

if($pwd === $confirmPwd) {
    $query = "INSERT INTO `owner` SET `name` = $_POST[username], `level` = 1, `created` = CURRENT_TIMESTAMP, `email` = $_POST[email], `password` = $pwd";
    print($query);
}else{
    print('Password doesn\'t match!  Please reenter your password!');
}


$result = mysqli_query($conn, $query);

$output['errors'][] = $query;

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
    } else {
        $output['errors'][] = 'no data available';

    }
}
else {
    $output['errors'][] = 'error in SQL query';
}




?>/**
 * Created by PhpStorm.
 * User: christin
 * Date: 1/13/18
 * Time: 11:15
 */