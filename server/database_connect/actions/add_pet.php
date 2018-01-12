<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/10/2018
 * Time: 2:54 PM
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$query = "INSERT INTO `pets` SET `name` = '$post[name]', `ownerID` = '$post[ownerID]', `avatar` = '$post[avatar]', `created` = CURRENT_TIMESTAMP, `status` = 'active', `DOB` = '$post[dob]', `animal_type` = '$post[breed]', `metadata` = 0";

$result = mysqli_query($conn, $query);

$output['errors'][] = $query;

if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
    } else {
        $output['errors'][] = 'no data available';

    }
}
else {
    $output['errors'][] = 'error in SQL query';
}




?>