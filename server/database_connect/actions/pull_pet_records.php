<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/5/2018
 * Time: 10:39 AM
 */
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$ID = 1;
//$ID = $_GET['ID'];

$pet_objects = [];

$query = "SELECT `ID`, `name`, `avatar` FROM  `pets` WHERE `ownerID` = $ID";

$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
//<<<<<<< HEAD
//=======

//            $obj = (object)array("name" => $row['name'], "ID" => $row['ID'], "avatar" => $row['avatar'], "dob" => $row['DOB'], "breed" => $row['animal_type'],"medicalRecords" => []);
//            array_push($pet_objects, $obj);
//>>>>>>> e92cae12a7cacf7d8664003a53442292f9a138ad
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
//<<<<<<< HEAD
//foreach($pet_objects AS $key=>$pet){
//    $query = "SELECT `title` AS `type`, `record_data` AS `details`, `treatment_date` AS `date` FROM medical_records WHERE petID = {$pet['ID']}";
//    $result = mysqli_query($conn, $query);
//
//
//    if (mysqli_num_rows($result) > 0) {
//        while ($row = mysqli_fetch_assoc($result)) {
//            $pet_objects[$key]['medicalRecords'][] = $row;
//        }
//    }
//
//}


//=======
//foreach($pet_objects AS $key=>$pet) {
//    for ($i = 0; $i < count($pet_objects); $i++) {
//        $currentPetID = $pet_objects[$i]->ID;
//        $query = "SELECT `title` AS `type`, `record_data` AS `details`, `treatment_date` AS `date` FROM medical_records WHERE petID = $currentPetID";
//        $result = mysqli_query($conn, $query);
//
//
//        if (mysqli_num_rows($result) > 0) {
////            while ($row = mysqli_fetch_assoc($result)) {
//            $pet_objects[$key]['medicalRecords'][] = $row;
////                $type = $row['type'];
////                $details = $row['details'];
////                $date = $row['date'];
////
////                $tempObj = (object)array("type" => $type, "details" => $details, "date" => $date);
////
////                array_push($pet_objects[$i]->medicalRecords, $tempObj);
//
////            }
//        }
//
//    }
//
//}
//>>>>>>> e92cae12a7cacf7d8664003a53442292f9a138ad


?>