<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/16/2018
 * Time: 9:57 AM
 */
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$email = $post['vetEmail'];
$refNum = $post['refNum'];

//Check to see if the email and reference number match
$query = "SELECT * FROM `vets` WHERE `ref_ID` = '$refNum' AND `email` = '$email'";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $output['data'][] = 'correct email and reference number';

        //Insert the users ID into the vet db



    } else {
        $output['errors'][] = 'No data available';
    }
} else {
    $output['errors'][] = 'Error in SQL query';
}