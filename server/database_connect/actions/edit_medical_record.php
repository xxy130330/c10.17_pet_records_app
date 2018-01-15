<?php
/**
 * Created by PhpStorm.
 * User: christin
 * Date: 1/15/18
 * Time: 11:23
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$ID = $post['ID'];

$query = "UPDATE `medical_records` SET `title` = {$post['title']}, `type` = {$post['type']}, `petID` = {$post['petID']}, `record_data` = {$post['record_data']}, `treatment_date` = {$post['treatment_date']}, `updated` = CURRENT_TIMESTAMP WHERE `ID` = $ID";

$output['errors'][] = $query;

$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
    } else {
        $output['errors'][] = 'no data available';
    }
} else {
    $output['errors'][] = 'Error in SQL Query';
}







?>