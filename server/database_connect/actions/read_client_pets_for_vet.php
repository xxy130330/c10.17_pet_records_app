<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/17/2018
 * Time: 2:03 PM
 */
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$ownerID = $_GET['ownerID'];
$vetID = $_GET['vetID'];
$foundPetIDArr = false;

$query = "SELECT `active_pets` FROM `vets` WHERE `ID` = $vetID";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
           $petDataObj  = json_decode($row['active_pets']);

           //iterate over the array and look for the object with the owner ID that matches $ownerID;
            $count = count($petDataObj);
            for ($i = 0; $i < $count; $i++) {
                if ($petDataObj[$i]->ownerID == $ownerID) {
                    //copy the array from this obj
                    $petIDArr = $petDataObj[$i]->petID;
                    $foundPetIDArr = true;
                    $output['success'] = true;
                    break;
                }
            }
           if ($foundPetIDArr) {
                //grab the pet info to generate a pet list
               $count = count($petIDArr);
               for ($k = 0; $k < $count; $k++) {
                   $query = "SELECT `ID` AS `petID`, `avatar`, `name` FROM `pets` WHERE `ID` = $petIDArr[$k] AND `status` = 'active'";
                   $result = mysqli_query($conn, $query);

                   if ($result) {
                       if (mysqli_affected_rows($conn) > 0) {
                           while ($row = mysqli_fetch_assoc($result)) {
                               $output['data'][] = $row;
                           }
                       } else {
                           $output['errors'][] = 'couldn\'t find an pet with that ID';
                       }
                   } else {
                       $output['errors'][] = 'Error in SQL query fetching pet data';
                   }
               }
           }

        }
    } else {
        $output['errors'][] = 'no data available';
    }
} else {
    $output['errors'][] = 'Error in SQL query fetching owner data from active_pets';
}
?>