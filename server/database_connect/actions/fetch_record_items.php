<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/8/2018
 * Time: 7:41 PM
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$ID = $_GET['petID'];



$query = "SELECT `title` AS `type`, `ID` AS `recordID` FROM medical_records WHERE petID = $ID";

$output['errors'][] = $query;

//Grab DOB and breed

$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $pet_objects[] = $row;
        }
        $output['success'] = true;
    } else {
        $output['errors'][] = 'no data available';
        $output['errors'][] = $ID;
    }
}
else {
    $output['errors'][] = 'error in SQL query 22';
}

