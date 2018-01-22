<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/16/2018
 * Time: 9:57 AM
 */
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$email = $post['vetEmail'];
$refNum = $post['refNum'];
$ownerID = $post['ownerID'];
$petID = $post['petID'];
$oldVetName = $post['oldVetName'];
$hasID = false;
$hasPetID = false;
$vetName = null;

//Check to see if the email and reference number match
$query = "SELECT * FROM `vets` WHERE `ref_ID` = '$refNum' AND `email` = '$email'";
$result = mysqli_query($conn, $query);

class OwnerObj  {
    public $ownerID;
    public $petID;
}

function createNewDataObj($ownerID, $petID) {
    $tmpObj = new OwnerObj();
    $tmpObj->ownerID = $ownerID;
    $tmpObj->petID = [$petID];

    return $tmpObj;
}

function storeActivePets($res, $refNum, $conn) {
    $res = json_encode($res);
    $query = "UPDATE `vets` SET `active_pets` = '$res' WHERE `ref_ID` = '$refNum'";
    $result = mysqli_query($conn, $query);
    return $result;
}

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $output['success'] = true;

        //Insert the users ID into the vet db if there isn't anything in active_pets otherwise pull active_pets and append data to it.

        if ($result) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $petStr = $row['active_pets'];
                    $vetName = $row['name'];
                    if ($petStr === "NULL") {
                        $output['errors'][] = 'No active pets';
                        //create the object to be inserted into the database

                        $res = createNewDataObj($ownerID, $petID);
                        $res = array($res);
                        $result = storeActivePets($res, $refNum, $conn);
                        if ($result) {
                            $output['success'] = true;
                        } else {
                            $output['success'] = false;
                        }
                    } else {
                        //decode the vets active pets
                        $petObj = json_decode($petStr);
                        $ownerCount = count($petObj);

                        for ($i = 0; $i < $ownerCount; $i++) {
                            if ($petObj[$i]->ownerID === $ownerID) {
                                $ownerIndex = $i;
                                $output['errors'][] = 'existing owner';
                                $output['errors'][] = $ownerID;
                                $hasID = true;

                                //check to see if the pet has already been added
                                $petCount = count($petObj[$ownerIndex]->petID);
                                for ($k = 0; $k < $petCount; $k++) {
                                    if ($petObj[$ownerIndex]->petID[$k] === $petID) {
                                        $hasPetID = true;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    if (!$hasID) {
                            $output['errors'][] = 'new owner';
                            //create the dataObj and append it to the existing array;
                            $res = createNewDataObj($ownerID, $petID);
                            $petObj[] = $res;
                            $output['errors'][] = $petObj;
                            $result = storeActivePets($petObj, $refNum, $conn);
                            if ($result) {
                                $output['success'] = true;
                            } else {
                                $output['success'] = false;
                            }
                        } else if ($hasID && $hasPetID === false) {
                            $output['data'][] = 'same owner new pet';
                            $petObj[$ownerIndex]->petID[] = $petID;
                            $result = storeActivePets($petObj, $refNum, $conn);
                            if ($result) {
                                $output['success'] = true;
                            } else {
                                $output['success'] = false;
                            }
                        } else {
                            $output['errors'][] = 'the pet is already filed under the vets account';
                        }
                    }
                }
            }
        } else {
            $output['errors'][] = 'Error in SQL query fetching active_pets';
        }

    } else {
        $output['errors'][] = 'No data available';
    }
    //add vet name to pet table
    if ($vetName !== null) {
        $query = "UPDATE `pets` SET `vet` = '$vetName' WHERE `ID` = $petID";
        $output['errors'][] = $query;
        $result = mysqli_query($conn, $query);

        if ($result) {
            if (mysqli_affected_rows($conn) > 0) {
                $output['data'][] = 'inserted vet name in database';
            }
        } else {
            $output['errors'][] = 'Error in SQL query';
        }
    }
 //********removing old vet***********************

    if ($oldVetName !== 'null') {
//Remove the this pet from the old vets account
        $query = "SELECT `active_pets`, `ref_ID` FROM `vets` WHERE `name` = '$oldVetName'";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $output['success'] = true;
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $activePetsObj = $row['active_pets'];

                    //iterate over the array of objects
                    $count = count($activePetsObj);
                    for ($i = 0; $i < $count; $i++) {
                        if ($activePetsObj[$i]->ownerID == $ownerID) {

                            $innerCount = count($activePetsObj[$i]->petID);
                            for ($k = 0; $k < $innerCount; $k++) {
                                //iterate over the petArray
                                if ($activePetsObj[$i]->petID[$k] == $petID) {
                                    if ($row['ref_ID'] !== $refNum) {
                                        unset($activePetsObj[$i]->petID[$k]);
                                        $output['data'][] = 'removed the pet from the vets petObj';
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                $output['errors'][] = 'No vet found with that name';
                $output['success'][] = false;
            }
        } else {
            $output['errors'][] = 'Error in SQL Query';
            $output['success'] = false;
        }
    }

    //*********removing old vet*************

?>
