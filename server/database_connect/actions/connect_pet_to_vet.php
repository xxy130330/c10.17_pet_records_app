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

//Check to see if the email and reference number match
$query = "SELECT * FROM `vets` WHERE `ref_ID` = '$refNum' AND `email` = '$email'";
$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $output['success'] = true;

        //Insert the users ID into the vet db if there isn't anything in active_pets otherwise pull active_pets and append data to it.
        $query = "SELECT `active_pets` FROM `vets` WHERE `ref_ID` = '$refNum'";
        $result = mysqli_query($conn, $query);

        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $petStr = $row['active_pets'];
                    $output['errors'][] = $petStr;
                    if ($petStr === "NULL") {
                        $output['errors'][] = 'No active pets';
                        //create the object to be inserted into the database
                        class OwnerObj  {
                            public $ownerID;
                            public $petID;
                        }
                        $tmpObj = new OwnerObj();
                        $tmpObj->ownerID = $ownerID;
                        $tmpObj->petID = [$petID];

                        $res = array($tmpObj);

                        $res = json_encode($res);

                        $query = "UPDATE `vets` SET `active_pets` = '$res' WHERE `ref_ID` = $refNum";

                        $result = mysqli_query($conn, $query);

                        if ($result) {
                            $output['success'] = true;
                        } else {
                            $output['success'] = false;
                        }

                    } else {
                        $output['errors'][] = 'This vet has active pets';
                    }
                }
            } else {
                $output['errors'][] = 'No data found';
            }
        } else {
            $output['errors'][] = 'Error in SQL query fetching active_pets';
        }

    } else {
        $output['errors'][] = 'No data available';
    }
} else {
    $output['errors'][] = 'Error in SQL query';
}