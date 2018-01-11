<?php header('Access-Control-Allow-Origin: *'); ?>

<?php

require_once('./aws_s3/credential.php');

if(empty($_GET['course'])){
$field = 'name, grade, course';
$whereClause = '';
}else{
$field = '*';
$whereClause = "WHERE course = {$_GET['course']}";
}

$query = "INSERT INTO students SET
name = '{$_GET['name']}',
course = '{$_GET['course']}',
grade = '{$_GET['grade']}'
";

$result = mysqli_query($conn, $query); //store as an object; $query is like command line runs in sql; $conn is like a key to database($conn)

$output = [
'success' => false,
'data' => [],
'errors' => []
];

if($result){
if(mysqli_affected_rows($conn)>0){ //return num of rows
$output['success'] = true;
$output['data'] = mysqli_insert_id($conn);
}else{
$output['errors'][] = 'unable to insert data';
}
}else{
$output['errors'][] = 'error in SQL query';
}


$json_output = json_encode($output); //convert $output into json(object)

print($json_output);


?>