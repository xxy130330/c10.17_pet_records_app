<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/9/2018
 * Time: 1:21 PM
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}


$ID = $post['petID'];
$title = $post['title'];
$type = $post['type'];
$recordData = $post['record_data'];
$date = $post['treatment_date'];

$query = "INSERT INTO `medical_records` SET `title` = ' $title ', `type` = ' $type ', `record_data` = ' $recordData ', `treatment_date` = ' $date ', `petID` = ' $ID ', `status` = 'active', `updated` = CURRENT_DATE";

$result = mysqli_query($conn, $query);

$output['errors'][] = $query;



if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
    } else {
        $output['errors'][] = 'no data available';
    }
}
else {
    $output['errors'][] = 'error in SQL query';
}



?>