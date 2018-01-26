<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/8/2018
 * Time: 6:48 PM
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}
$ID = $_GET['ID'];

$pet_objects = [];

$query = "SELECT `ID`, `name`, `avatar`, `DOB` AS `dob`, `animal_type` AS `breed`, `vet` FROM  `pets` WHERE `ownerID` = $ID AND `status` = 'active'";


$result = mysqli_query($conn, $query);


if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $row['medicalRecords'] = [];
            $pet_objects[] = $row;
        }
        $output['success'] = true;
    } else {
        $output['errors'][] = 'no data found';
    }
}
else {
    $output['errors'][] = 'error in SQL query';
}

//$query = "SELECT `name` FROM `vets` WHERE "

?>