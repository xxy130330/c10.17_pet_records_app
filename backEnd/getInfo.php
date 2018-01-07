<?php header('Access-Control-Allow-Origin: *'); ?>


<?php

require_once ('mycredentials.php');

$id = $_GET['ID'];

$query = "SELECT `ID`, `name`, `avatar` FROM pets WHERE `ownerID` = $id";



$result = mysqli_query($conn, $query);

$output = [
    'success' => false,
    'data' => [],
    'errors' => []
];

if($result){
    if(mysqli_num_rows($result)>0){
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        }
        $output['success'] = true;
    }else{
        $output['errors'][] = 'no data available';
    }
}else{
    $output['errors'][] = 'error in SQL query';
}


$json_output = json_encode($output); //convert $output into json(object)

print($json_output);







?>