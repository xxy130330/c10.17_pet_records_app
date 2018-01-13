<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/12/2018
 * Time: 5:50 PM
 */
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$ID = $post['recordID'];

$query = "UPDATE `medical_records` SET `status` = 'inactive', `updated` = CURRENT_DATE WHERE `ID` = $ID";

$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
        $output['data'] = 'The record is set to inactive';
    } else {
        $output['errors'][] = 'no data available';
    }
} else {
    $output['errors'][] = 'Error in SQL Query';
}
?>