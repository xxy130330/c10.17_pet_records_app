<?php header('Access-Control-Allow-Origin: *'); ?>


<?php
//include the S3 class
if (!class_exists('S3'))require_once('S3.php');

//AWS access info
require_once('credential.php');

if (!defined('awsAccessKey')) define('awsAccessKey', $accessKey);
if (!defined('awsSecretKey')) define('awsSecretKey', $secretKey);


//instantiate the class
$s3 = new S3(awsAccessKey, awsSecretKey);
$bucketName = 'petvetlfz';


//check whether a form was submitted
if(isset($_POST['upload'])){

    $fileName = time() . $_FILES['file']['name']; //rename the file name by adding current timestamp
    $fileTempName = $_FILES['file']['tmp_name'];
//create a new
    if(!isset($bucketName)){
        $s3->putBucket($bucketName, S3::ACL_PUBLIC_READ);
    }

//move the file
    if ($s3->putObjectFile($fileTempName, $bucketName, $fileName, S3::ACL_PUBLIC_READ)) {
        echo "We successfully uploaded your file.";
    }else{
        echo "Something went wrong while uploading your file... sorry.";
    }
}

//put url into object
//$urlObj = (object)array(
    //$_POST['ownerID'] => "http://{$bucketName}.s3.amazonaws.com/" . $fileName
//);



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