<?php

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