<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}
if (!class_exists('S3'))require_once('s3.php');
require_once('credential.php');
//require_once('../../database_connect/connect.php');
if (!defined('awsAccessKey')) define('awsAccessKey', $accessKey);
if (!defined('awsSecretKey')) define('awsSecretKey', $secretKey);
$s3 = new S3(awsAccessKey, awsSecretKey);
//print_r($_POST);
$bucketName = 'petvetlfz';
//$jsondata = file_get_contents("php://input");
//$_POST = json_decode($jsondata, true);
//print_r($_POST);
$fileName = time() . $_FILES['file']['name'];
//if(isset($_POST['upload'])){
$fileTempName = $_FILES['file']['tmp_name'];
if(!isset($bucketName)){
    $s3->putBucket($bucketName, S3::ACL_PUBLIC_READ);
}
if ($s3->putObjectFile($fileTempName, $bucketName, $fileName, S3::ACL_PUBLIC_READ)) {
//        echo "We successfully uploaded your file.";
    $output['success'] = true;
}else{
    $output['success'] = false;
//        echo "Something went wrong while uploading your file... sorry.";
};
//}
//$output['data'][] = $url;
//$output['errors'][] = $url;
//require_once ('./credential.php');
//require_once ('../../file_upload/update_avatar_link_db.php');
$url = "http://{$bucketName}.s3.amazonaws.com/".$fileName;
$output['data'][] = $url;

?>
