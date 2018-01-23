

<?php
print(getcwd());
require_once ('/var/www/petvet.tech/server/database_connect/connect.php');


//DELETE FROM pets WHERE status='inactive' AND updated < DATE_SUB(NOW(), INTERVAL 1 YEAR)


$query = "DELETE FROM pets WHERE status='inactive' AND updated < DATE_SUB(NOW(), INTERVAL 1 YEAR)";

$result = mysqli_query($conn, $query);
print_r($conn);
$output = [
    'success' => false,
    'data' => [],
    'errors' => []
];

if($result){
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
	$output['rowsDeleted'] = mysqli_affected_rows($conn);
    }else{
        $output['errors'][] = 'no rows deleted';
    }
}else{
    $output['errors'][] = 'error in SQL query';
}


$json_output = json_encode($output);

print($json_output);







?>



