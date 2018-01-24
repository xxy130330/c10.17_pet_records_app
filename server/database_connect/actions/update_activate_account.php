<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/19/2018
 * Time: 3:50 PM
 */
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}
$activation_code = $_GET['actNum'];
$output['data'][] = $activation_code;

//grab the users ID base on activation code
$query = "SELECT `ID` FROM `activation` WHERE `activation_code` = '$activation_code'";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $personID = $row['ID'];
            $IdLength = strlen($personID);
            print($personID);
            print($IdLength);

            //if its a vet
            if ($IdLength === 13) {
                $query = "UPDATE `vets` SET `status` = 'active' WHERE `ref_ID` = '$personID'";
                $result = mysqli_query($conn, $query);
            } else {
                //if its an owner
                $query = "UPDATE `owner` SET `status` = 'active' WHERE `ID` = '$personID'";
                $result = mysqli_query($conn, $query);
            }
            $output['data'][] = $query;
            $output['data'][] = $IdLength;


            if ($result) {
                if (mysqli_affected_rows($conn) > 0) {
                    $output['success'] = true;
                } else {
                    $output['errors'][] = 'no info found with that referenceID';
                }
            } else {
                $output['errors'][] = 'Error in SQL query updating vet/owner status';
            }

        }
    } else {
        $output['errors'][] = 'That activation code doesn\'t exist';
    }
} else {
    $output['errors'][] = 'Error in SQL query';
}