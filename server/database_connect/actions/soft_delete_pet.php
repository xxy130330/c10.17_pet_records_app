<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/10/2018
 * Time: 5:35 PM
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$ID = $post['petID'];

$query = "UPDATE `pets` 
          SET `status` = 'inactive', `updated` = CURRENT_DATE 
          WHERE `ID` = $ID";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
        $output['data'] = 'The pet is set to inactive';
    } else {$output['errors'][] = 'no data available';}
} else {$output['errors'][] = 'Error in SQL Query 404';}

//set the deceased pet's medical records to inactive
$query = "UPDATE `medical_records` 
          SET `status` = 'inactive', `updated` = CURRENT_DATE 
          WHERE `petID` = $ID";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
        $output['data'][] = 'The records is set to inactive';
    } else {$output['errors'][] = 'no record items to inactivate';}
} else {$output['errors'][] = 'Error in SQL Query';}
?>