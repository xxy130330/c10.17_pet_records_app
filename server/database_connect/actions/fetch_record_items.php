<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}
$ID = $_GET['petID'];

$query = "SELECT `title` AS `type`, `ID` AS `recordID` 
          FROM medical_records 
          WHERE petID = $ID 
          AND `status` = 'active'";

$result = mysqli_query($conn, $query);

if ($result) {
    $output['success'] = true;
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $pet_objects[] = $row;
        }

    } else {$output['errors'][] = 'no data available';}
} else {$output['errors'][] = 'error in query';}
?>
