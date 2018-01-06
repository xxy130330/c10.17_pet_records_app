<?php header('Access-Control-Allow-Origin: *'); ?>


<?php

require_once ('mycredentials.php');

//if(empty($_GET['id'])){
//    $field = 'id, name, email, password';
//    $whereClause = '';
//}else{
//    $field = '*';
//    $whereClause = "WHERE id = {$_GET['id']}";
//}

$query = "SELECT
             o.name AS Owner_name,
             p.name AS Pet_name,
             m.title AS Medical_record_title
          FROM pets AS p
          JOIN owner AS o
          ON o.ID = p.ownerID
          JOIN medical_records AS m 
          ON m.petID = p.ID
          
          ";



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