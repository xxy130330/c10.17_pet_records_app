<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$queryCheckEmail = "SELECT `email`
                    FROM `owner`
                    WHERE `email` = '$post[email]'";

$checkResult = mysqli_query($conn, $queryCheckEmail);

$strtolowerEmail = strtolower($post[email]);

if ($checkResult) {
    if (mysqli_num_rows($checkResult) === 0) {
        $query = "INSERT INTO `owner`
                  (`ID`, `name`, `created`, `updated`, `level`, `email`, `password`, `status`)
                  VALUES (NULL, '$post[name]', CURRENT_DATE(), CURRENT_TIMESTAMP, '1', '$strtolowerEmail', SHA1('$post[password]'), 'inactive')";
        $result = mysqli_query($conn, $query);

      if ($result) {
            if (mysqli_affected_rows($conn) > 0) {
                $output['success'] = true;
                $resultID = mysqli_insert_id($conn);
                $output['ID'] = $resultID;
                $hashRef_ID = MD5($resultID);
                $authStr = $hashRef_ID . $resultID;


                $query = "INSERT INTO `activation`
                          (`ID`, `activation_code`)
                          VALUES ('$resultID', '$authStr')";
                $results = mysqli_query($conn, $query);

                if ($results) {
                    if (mysqli_affected_rows($conn) > 0) {
                        $output['success'] = true;
                        if ($_SERVER['HTTP_HOST'] === 'localhost:3000') {
                            $activationLink = "<a href='http://localhost/server/database_connect/server.php?action=get&resource=activate_account&actNum=$authStr'>click here to register</a>";
                        } else {
                            $activationLink = "<a href='http://petvet.tech/server/database_connect/server.php?action=get&resource=activate_account&actNum=$authStr'>click here to register</a>";
                        }
                        require('../php_mailer/mail_handler.php');
                    }  else {$output['success'] = false;}
                } else {
                    $output['errors'][] = 'Error in SQL query';
                    $output['success'] = false;
                }
            } else {$output['errors'][] = 'no data available';}
        } else {$output['errors'][] = 'Error in SQL query, inserting user';}
    } else {$output['errors'][] = 'That email is already in use';}
} else {
    $output['errors'][] = 'Error in SQL query';
    $output['errors'][] = $queryCheckEmail;
}


?>
