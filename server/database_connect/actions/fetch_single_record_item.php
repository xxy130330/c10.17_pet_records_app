<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/8/2018
 * Time: 7:07 PM
 */
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}
$ID = $_GET['recordID'];

$query = "SELECT `title` AS `type`, `record_data` AS `details`, `treatment_date` AS `date` 
          FROM medical_records 
          WHERE ID = $ID";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $pet_objects[] = $row;
        }
        $output['success'] = true;
    } else {$output['errors'][] = 'no data found';}
} else {$output['errors'][] = 'error in SQL query';}
