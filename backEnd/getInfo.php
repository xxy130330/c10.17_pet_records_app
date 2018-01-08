<?php header('Access-Control-Allow-Origin: *'); ?>


<?php

require_once ('mycredentials.php');

$id = $_GET['ID'];

$petArr = [];

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
            $pet_obj = (object)array("name" => $row['name'], "ID" => $row['ID'], "avatar" => $row['avatar'], "medicalRecords" => []);
            array_push($petArr, $pet_obj);
//            $output['data'][] = $row;
        }
        $output['success'] = true;
    }else{
        $output['errors'][] = 'no data available';
    }
}else{
    $output['errors'][] = 'error in SQL query';
}

for($i=0; $i<count($petArr); $i++){
    
}


$json_output = json_encode($output); //convert $output into json(object)

print($json_output);







?>