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

$query = "SELECT `active_pets`, `email`, `ref_ID` FROM `vets` WHERE `ID` = $vetID";
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
            //perform an axios call to fetch the owner data associated with that ownerID

            for ($k = 0; $k < $count; $k++) {
                $query = "SELECT `ID` AS `ownerID`, `name`, `email` FROM `owner` WHERE `ID` = $ownerArray[$k]";
                $result = mysqli_query($conn, $query);

                if ($result) {
                    if (mysqli_affected_rows($conn) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            $output['data'][] = $row;
                        }
                    } else {
                        $output['errors'][] = 'couldn\'t find an owner with that ID';
                    }
                } else {
                    $output['errors'][] = 'Error in SQL query fetching owner data';
                }
            }


        }
    } else {
        $output['errors'][] = 'That vet ID doesn\'t exist';
    }
} else {
    $output['errors'][] = 'Error in SQL query fetching vet data';
}

?>