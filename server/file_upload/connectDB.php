<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

require_once('aws_s3/credential.php');
require_once ('aws_s3/page.php');


$url = "http://{$bucketName}.s3.amazonaws.com/".$fileName;

$query = "UPDATE pets SET `avatar` ='{$url}' WHERE `ID` = 1";

echo $query;
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
        echo 'success -> true';
    } else {
        $output['errors'][] = 'no data available';
        echo 'no data available';
    }
}
else {
    echo $output['errors'][] = 'error in SQL query';
}
?>