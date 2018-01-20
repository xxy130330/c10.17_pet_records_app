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

//grab the users ID base on activation code
$query = "SELECT `ID` FROM `activation` WHERE `activation_code` = '$activation_code'";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $personID = $row['ID'];
            $IdLength = count($personID);

            //if its a vet
            if ($IdLength == 6) {
                $query = "UPDATE `vets` SET `status` = 'active' WHERE `ref_ID` = $personID";
                $result = mysqli_query($conn, $query);
                if ($result) {
                    if (mysqli_affected_rows($conn) > 0) {
                        $output['success'] = true;
                    } else {
                        $output['errors'][] = 'no vet found with that referenceID';
                    }
                } else {
                    $output['errors'][] = 'Error in SQL query updating vet status';
                }
            }
        }
    } else {
        $output['errors'][] = 'That activation code doesn\'t exist';
    }
} else {
    $output['errors'][] = 'Error in SQL query';
}