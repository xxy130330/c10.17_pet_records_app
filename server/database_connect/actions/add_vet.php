<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/15/2018
 * Time: 12:36 PM
 */
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$queryCheckEmail = "SELECT `email` FROM `vets` WHERE `email` = '$post[email]'";

$checkResult = mysqli_query($conn, $queryCheckEmail);

//Check to see if the email is already in the db
if ($checkResult) {
    if (mysqli_num_rows($checkResult) === 0) {
        $query = "INSERT INTO `vets` (`name`, `email`, `phone`, `ID`, `ref_ID`, `active_pets`, `password`, `status`, `updated`, `level`) VALUES ('$post[name]', '$post[email]', '$post[phone]', NULL, '0', 'NULL', SHA1('$post[password]'), 'active', CURRENT_DATE, '2')";
        $result = mysqli_query($conn, $query);
        if ($result) {
            if (mysqli_affected_rows($conn) > 0) {
                $resultID = mysqli_insert_id($conn);
                $ref_ID = substr(MD5($resultID),0,6);

                $output['data'][] = $ref_ID;

                //check if the ID exists in the database before inserting it
                $checkRefIdQuery = "SELECT * FROM `vets` WHERE `ref_ID` = '$ref_ID'";
                $result = mysqli_query($conn, $query);

                if ($result) {
                    if (mysqli_num_rows($result) === 0) {
                        $output['data'][] = 'Unique ID';
                    } else {
                        $output['errors'][] = 'Duplicate ID, generating new ID';

                    }
                } else {
                    $output['errors'][] = 'Error in SQL Query';
                }


                $refIDQuery = "UPDATE `vets` SET `ref_ID` = '$ref_ID' WHERE `ID` = $resultID";

		$output['query'] = $refIDQuery;
                $result = mysqli_query($conn, $refIDQuery);
                $output['ref_ID'] = $ref_ID;
                if ($result) {
                    if (mysqli_affected_rows($conn) > 0) {
                        $output['success'] = true;
                    }
                }

            } else {
                $output['errors'][] = 'no data available';
            }
        }
        else {
            $output['errors'][] = 'Error in SQL query, inserting user22';
        }
    } else {
        $output['errors'][] = 'That email is already in use';
    }
} else {
    $output['errors'][] = 'Error in SQL query, checking if the email exists';
    $output['errors'][] = $queryCheckEmail;
}

?>
