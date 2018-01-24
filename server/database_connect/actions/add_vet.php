<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}



function getRandomRefID(){
    do{
        $refId = uniqid();
        $checkQuery = "SELECT * FROM vets WHERE `ref_ID` = '$refId'";
        $result = mysqli_query($conn, $checkQuery);
    }while( mysqli_num_rows($result)>0);

    return $refId;
}

$queryCheckEmail = "SELECT `email` FROM `vets` WHERE `email` = '$post[email]'";

$checkResult = mysqli_query($conn, $queryCheckEmail);

//Check to see if the email is already in the db
if ($checkResult) {
    if (mysqli_num_rows($checkResult) === 0) {
        $ref_id = getRandomRefID();
        $query = "INSERT INTO `vets` (`name`, `email`, `phone`, `ID`, `ref_ID`, `active_pets`, `password`, `status`, `updated`, `level`) VALUES ('$post[name]', '$post[email]', '$post[phone]', NULL, '$ref_id', 'NULL', SHA1('$post[password]'), 'inactive', CURRENT_DATE, '2')";
        $result = mysqli_query($conn, $query);
        if ($result) {
            if (mysqli_affected_rows($conn) > 0) {
                    //success!
                }else {
                    $output['errors'][] = 'no data available';
                }


                //Generate authentication number then insert it into the activation database with this user's ID, then send the email;
                $hashRef_ID = MD5($ref_ID);
                $authStr = $hashRef_ID . $ref_ID;

                $query = "INSERT INTO `activation` (`ID`, `activation_code`) VALUES ('$ref_ID', '$authStr')";
                $output['query'] = $query;
                $results = mysqli_query($conn, $query);
                $output['result'] = $results;

                if ($results) {
                    if (mysqli_affected_rows($conn) > 0) {
                        $output['success'] = true;
                        $output['code'] = $authStr;
                        if ($_SERVER['HTTP_HOST'] === 'localhost:3000') {
                            $activationLink = 'http://localhost/server/database_connect/server.php?action=get&resource=activate_account&actNum=' . $authStr;
                        } else {
                            $activationLink = 'http://petvet.tech/server/database_connect/server.php?action=get&resource=activate_account&actNum=' . $authStr;
                        }
                        require('../php_mailer/mail_handler.php');
                    } else {
                        $output['success'] = false;
                    }
                } else {
                    $output['errors'][] = 'Error in SQL query inserting into activation';
                    $output['success'] = false;
                }
//            } else {
//                $output['errors'][] = 'no data available';
//            }
            }
//        else {
//            $output['errors'][] = 'Error in SQL query, inserting user22';
//        }
        } else {
            $output['errors'][] = 'That email is already in use';
        }
    } else {
        $output['errors'][] = 'Error in SQL query, checking if the email exists';
        $output['errors'][] = $queryCheckEmail;
    }

?>
