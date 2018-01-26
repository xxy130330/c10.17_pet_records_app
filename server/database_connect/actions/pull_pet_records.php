<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

//$ID = 1;
$ID = $_GET['ID'];

$pet_objects = [];

$query = "SELECT `ID`, `name`, `avatar` FROM  `pets` WHERE `ownerID` = $ID";

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

?>