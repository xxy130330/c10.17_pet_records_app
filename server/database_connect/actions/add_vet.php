<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

function getRandomRefID($conn){
    do{
        $refId = uniqid();
        $checkQuery = "SELECT * FROM vets WHERE `ref_ID` = '$refId'";
        $result = mysqli_query($conn, $checkQuery);
    }while( mysqli_num_rows($result)>0);

    return $refId;
}

$queryCheckEmail = "SELECT `email` FROM `vets` WHERE `email` = '$post[email]'";

$checkResult = mysqli_query($conn, $queryCheckEmail);

if ($checkResult) {
    if (mysqli_num_rows($checkResult) === 0) {
        $ref_ID = getRandomRefID($conn);

        $query = "INSERT INTO `vets` (`name`, `email`, `phone`, `ID`, `ref_ID`, `active_pets`, `password`, `status`, `updated`, `level`) 
                  VALUES ('$post[name]', '$post[email]', '$post[phone]', NULL, '$ref_ID', 'NULL', SHA1('$post[password]'), 'inactive', CURRENT_DATE, '2')";

        $result = mysqli_query($conn, $query);
        if ($result) {
            if (mysqli_affected_rows($conn) > 0) {
                $authStr1 = uniqid();
                $authStr2 = uniqid();
                $authStr = $authStr1 . $authStr2;

                $query = "INSERT INTO `activation` (`ID`, `activation_code`) 
                          VALUES ('$ref_ID', '$authStr')";

                $results = mysqli_query($conn, $query);
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
                    } else {
                        $output['success'] = false;
                    }
                } else {
                    $output['errors'][] = 'Error in SQL query';
                    $output['success'] = false;
                }
            } else {
                $output['errors'][] = 'no data available';
            }
        }else {
            $output['errors'][] = 'Error in SQL query';
        }
    } else {
        $output['errors'][] = 'That email is already in use';
    }
} else {
    $output['errors'][] = 'Error in SQL query';
    $output['errors'][] = $queryCheckEmail;
}

?>
