

<?php

require_once ('../../server/database_connect/connect.php');


//DELETE FROM pets WHERE status='inactive' AND updated < DATE_SUB(NOW(), INTERVAL 1 YEAR)


$query = "DELETE FROM pets WHERE status='inactive' AND updated < DATE_SUB(NOW(), INTERVAL 1 YEAR)";

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


$json_output = json_encode($output);

print($json_output);







?>



