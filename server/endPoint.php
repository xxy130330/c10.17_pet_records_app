<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/4/2018
 * Time: 12:54 PM
 */
header("Access-Control-Allow-Origin: *");

$ID = $_GET['ID'];


$petData = file_get_contents('./pet_data.json');

$output = [
    'success' => true,
    'data' => $petData,
    'errors' => [$ID],
];
$json_output = json_encode($output);
print($json_output);




?>