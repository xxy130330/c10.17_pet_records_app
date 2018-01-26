<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/17/2018
 * Time: 10:04 AM
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}
$vetID = $_GET['vetID'];
$ownerArray = array();

//pull active_pets from vets table
$query = "SELECT `active_pets`, `email`, `ref_ID` 
          FROM `vets` 
          WHERE `ID` = $vetID";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $ownerDataObj = json_decode($row['active_pets']);
            $output['success'] = true;
            $output['vet_email'] = $row['email'];
            $output['ref_id'] = $row['ref_ID'];
            $count = count($ownerDataObj);
            for ($i = 0; $i < $count; $i++) {
                $ownerArray[] = $ownerDataObj[$i]->ownerID;
            }

            //loop over the ownerID's in the $ownerArray
            for ($k = 0; $k < $count; $k++) {
                $query = "SELECT `ID` AS `ownerID`, `name`, `email` 
                          FROM `owner` 
                          WHERE `ID` = $ownerArray[$k]";
                $result = mysqli_query($conn, $query);

                if ($result) {
                    if (mysqli_affected_rows($conn) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            $output['data'][] = $row;
                        }
                    } else {$output['errors'][] = 'no data found';}
                } else {$output['errors'][] = 'error in query';}
            }
        }
    } else {$output['errors'][] = 'no data available';}
} else {$output['errors'][] = 'error in query';}

?>