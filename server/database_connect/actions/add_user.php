<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/10/2018
 * Time: 2:54 PM
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$queryCheckEmail = "SELECT `email` FROM `owner` WHERE `email` = '$post[email]'";

$checkResult = mysqli_query($conn, $queryCheckEmail);

//Check to see if the email is already in the db
if ($checkResult) {
    if (mysqli_num_rows($checkResult) === 0) {
        $query = "INSERT INTO `owner` (`ID`, `name`, `created`, `updated`, `level`, `email`, `password`, `user`) VALUES (NULL, '$post[name]', CURRENT_DATE(), CURRENT_TIMESTAMP, '1', '$post[email]', SHA1('$post[password]'), 'owner')";
        $result = mysqli_query($conn, $query);
        if ($result) {
            if (mysqli_affected_rows($conn) > 0) {
                $output['success'] = true;
                $resultID = mysqli_insert_id($conn);
                $output['ID'] = $resultID;

            } else {
                $output['errors'][] = 'no data available';
            }
        }
        else {
            $output['errors'][] = 'Error in SQL query, inserting user';
        }
    } else {
        $output['errors'][] = 'That email is already in use';
    }
} else {
    $output['errors'][] = 'Error in SQL query, checking if the email exists';
    $output['errors'][] = $queryCheckEmail;
}


?>
