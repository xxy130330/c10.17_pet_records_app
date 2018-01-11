<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/10/2018
 * Time: 5:35 PM
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$ID = $post['petID'];

$query = "UPDATE `pets` SET `status` = 'inactive' WHERE `ID` = $ID";

$result = mysqli_query($conn, $query);

if ($result) {
    if (mysqli_affected_rows($result) > 0) {
        $output['success'] = true;
        $output['data'] = 'The pet is set to inactive';

    }
}
?>