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
        $query = "INSERT INTO `owner` (`ID`, `name`, `created`, `updated`, `level`, `email`, `password`, `status`) VALUES (NULL, '$post[name]', CURRENT_DATE(), CURRENT_TIMESTAMP, '1', '$post[email]', SHA1('$post[password]'), 'inactive')";
        $result = mysqli_query($conn, $query);
        if ($result) {
            if (mysqli_affected_rows($conn) > 0) {
                $output['success'] = true;
                $resultID = mysqli_insert_id($conn);
                $output['ID'] = $resultID;

                //Generate authentication number then insert it into the activation database with this user's ID, then send the email;
                $hashRef_ID = MD5($resultID);
                $authStr = $hashRef_ID . $resultID;

                $query = "INSERT INTO `activation` (`ID`, `activation_code`) VALUES ('$resultID', '$authStr')";
                $output['query'] = $query;
                $results = mysqli_query($conn, $query);
                $output['result'] = $results;

                if ($results) {
                    if (mysqli_affected_rows($conn) > 0) {
                        $output['success'] = true;
                        $output['code'] = $authStr;
                        if ($_SERVER['HTTP_HOST'] === 'localhost:3000') {
                            $activationLink = "<a href='http://localhost/server/database_connect/server.php?action=get&resource=activate_account&actNum=$authStr'>click here to register</a>";
                        } else {
                            $activationLink = "<a href='http://petvet.tech/server/database_connect/server.php?action=get&resource=activate_account&actNum=$authStr'>click here to register</a>";
                        }
                        require('../php_mailer/mail_handler.php');
                    }  else {
                        $output['success'] = false;
                    }
                } else {
                    $output['errors'][] = 'Error in SQL query inserting into activation';
                    $output['success'] = false;
                }




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
