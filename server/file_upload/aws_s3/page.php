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


?>