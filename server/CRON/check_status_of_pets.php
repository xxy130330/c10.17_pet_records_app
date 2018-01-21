
<?php header('Access-Control-Allow-Origin: *'); ?>

<?php

require_once ('../../server/database_connect/connect.php');


$query = "SELECT * FROM pets";

$result = mysqli_query($conn, $query);

$output = [
    'success' => false,
    'data' => [],
    'errors' => []
];

if($result){
    if(mysqli_num_rows($result)>0){
        while($row = mysqli_fetch_assoc($result)){
            if($row['status'] === 'inactive'){
                echo "<br>";
                print_r($row);
                echo "<br>";
                $currentTime = time();
                $past = $currentTime - 86400;
                $past = date("Y-m-d h:m:s",$past);
                echo $past;
                if($row['updated'] <= $past){
                    echo "condition true";
                    $query = "DELETE FROM pets WHERE ID = $row[ID]";
                    echo $query;
                    $result = mysqli_query($conn, $query);
                    if($result){
                        echo 'true';
                    } else {
                        echo 'false';
                    }
                }
            }else {
                $output['data'][] = $row;
            }
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



