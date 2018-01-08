<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/5/2018
 * Time: 10:39 AM
 */
header("Access-Control-Allow-Origin: *");

require_once('connect.php');


$ID = $_GET['ID'];

$output = [
    'success' => false,
    'data' => [],
    'errors' => [],
];


$pet_objects = [];

$query = "SELECT `ID`, `name`, `avatar` FROM  `pets` WHERE `ownerID` = $ID";

$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {

            $obj = (object)array("name" => $row['name'], "ID" => $row['ID'], "avatar" => $row['avatar'], "medicalRecords" => []);

            array_push($pet_objects, $obj);

        }
        $output['success'] = true;
    } else {
        $output['errors'][] = 'no data found';
    }
}
else {
    $output['errors'][] = 'error in SQL query';
}

for ($i = 0; $i < count($pet_objects); $i++) {
    $currentPetID = $pet_objects[$i]->ID;
    $query = "SELECT `title` AS `type`, `record_data` AS `details`, `treatment_date` AS `date` FROM medical_records WHERE petID = $currentPetID";
    $result = mysqli_query($conn, $query);


    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $type = $row['type'];
            $details = $row['details'];
            $date = $row['date'];

            $tempObj = (object)array("type" => $type, "details" => $details, "date" => $date);

            array_push($pet_objects[$i]->medicalRecords, $tempObj);

        }
    }

}

$output['data'] = $pet_objects;






$json_output = json_encode($output);

print($json_output);


?>