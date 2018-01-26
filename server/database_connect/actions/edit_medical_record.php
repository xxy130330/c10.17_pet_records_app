<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}
$ID = $post['ID'];
$title = $post['type'];
$petID = $post['petID'];
$recordData = $post['record_data'];
$treatmentDate = $post['treatment_date'];

$query = "UPDATE `medical_records` 
          SET `title` = '$title', `type` = 'hardcoded for now', `petID` = '$petID', `record_data` = '$recordData', 
          `treatment_date` = '$treatmentDate', `updated` = CURRENT_TIMESTAMP WHERE `ID` = $ID";

$output['errors'][] = $query;

$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;

    } else {$output['errors'][] = 'no data available';}
} else {$output['errors'][] = 'error in query';}

?>