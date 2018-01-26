<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/22/2018
 * Time: 3:28 PM
 */

$oldVetName = $post['oldVetName'];
$ownerID = $post['ownerID'];
$petID = $post['petID'];
if (!isset($refNum)) {
    $refNum = null;
}

if ($oldVetName !== 'null') {
//Remove the this pet from the old vets account
    $query = "SELECT `active_pets`, `ref_ID` 
              FROM `vets` 
              WHERE `name` = '$oldVetName'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $activePetsObj = json_decode($row['active_pets']);
                $oldVetRefNum = $row['ref_ID'];

                //iterate over the array of objects
                $count = count($activePetsObj);
                for ($i = 0; $i < $count; $i++) {
                    if ($activePetsObj[$i]->ownerID == $ownerID) {
                        //check in case the new vet and old vet share the same name
                        if ($oldVetRefNum !== $refNum) {
                            $innerCount = count($activePetsObj[$i]->petID);
                            for ($k = 0; $k < $innerCount; $k++) {
                                //iterate over the petArray
                                if ($activePetsObj[$i]->petID[$k] == $petID) {
                                    if ($innerCount === 1) {
                                        array_splice($activePetsObj, $i, 1);
                                    } else {
                                        array_splice($activePetsObj[$i]->petID, $k, 1);
                                    }
                                    //check if the activePetsObj has any pets in it
                                    if (count($activePetsObj) === 0) {
                                        $activePetsObj = NULL;
                                    }
                                    $activePetsObj = json_encode($activePetsObj);
                                    //update old vets active_pets;
                                    $query = "UPDATE `vets` 
                                              SET `active_pets` = '$activePetsObj' 
                                              WHERE `ref_ID` = '$oldVetRefNum'";

                                    $result = mysqli_query($conn, $query);
                                    if ($result) {
                                        if (mysqli_affected_rows($conn)) {
                                            $output['success'] = true;
                                        }
                                    } else {
                                        $output['errors'][] = 'error in query';
                                        $output['success'] = false;
                                    }
                                    //if the user is only pulling their pet from a vet but not assigning them a new one
                                    if (!$vetName) {
                                        $query = "UPDATE `pets` 
                                                  SET `vet` = 'No vet connected' 
                                                  WHERE `ID` = $petID";

                                        $result = mysqli_query($conn, $query);
                                        if ($result) {
                                            if (mysqli_affected_rows($conn)) {
                                                $output['success'] = true;
                                            }
                                        } else {
                                            $output['errors'][] = 'error in query';
                                            $output['success'] = false;
                                        }
                                    }
                                }
                            }
                        } else {break;}
                    }
                }
            }
        } else {$output['success'] = false;}
    } else {$output['success'] = false;}
}
?>