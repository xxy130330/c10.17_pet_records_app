<?php

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

if (!class_exists('S3'))require_once('S3.php');

require_once('../file_upload/aws_s3/credential.php');

if (!defined('awsAccessKey')) define('awsAccessKey', $accessKey);
if (!defined('awsSecretKey')) define('awsSecretKey', $secretKey);


$s3 = new S3(awsAccessKey, awsSecretKey);
print_r($_POST);
$bucketName = 'petvetlfz';
$jsondata = file_get_contents("php://input");
$_POST = json_decode($jsondata, true);
print_r($_POST);

if(isset($_POST['upload'])){

    $fileName = time() . $_FILES['file']['name']; //rename the file name by adding current timestamp
    $output['errors'][] = $fileName;
    $fileTempName = $_FILES['file']['tmp_name'];

    if(!isset($bucketName)){
        $s3->putBucket($bucketName, S3::ACL_PUBLIC_READ);
    }

    if ($s3->putObjectFile($fileTempName, $bucketName, $fileName, S3::ACL_PUBLIC_READ)) {
//        echo "We successfully uploaded your file.";
    }else{
//        echo "Something went wrong while uploading your file... sorry.";
    }
}

require_once ('../file_upload/update_avatar_link_db.php');
//require_once('../update_avatar_link_db.php');

$url = "http://{$bucketName}.s3.amazonaws.com/".$fileName;
//$output['data'][] = $url;
//$output['errors'][] = $url;

?>