<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/5/2018
 * Time: 10:39 AM
 */

require_once('connect.php');

$ID = $_GET['ID'];

$output = [
    'success' => false,
    'data' => $petData,
    'errors' => [$ID],
];

$query = "SELECT `petID` FROM  `pets` WHERE `ownerID` = $ID";

if (!empty($ID)) {
    $output['success'] = true;

} else {

}

$json_output = json_encode($output);


?>