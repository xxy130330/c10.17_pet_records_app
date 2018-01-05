<?php

header("Access-Control-Allow-Origin: *");

$petData = file_get_contents('./pet_data.json');

$output = [
    'success' => true,
    'data' => $petData,
    'errors' => [],
];
$json_output = json_encode($output);
print($json_output);




?>