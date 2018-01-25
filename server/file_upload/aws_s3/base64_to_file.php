<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/24/2018
 * Time: 5:11 PM
 */
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


$postJSON = file_get_contents('php://input');
$post = json_decode($postJSON, TRUE);

$post['data'][] = $post['petID'];

$s3 = new S3(awsAccessKey, awsSecretKey);

$bucketName = 'petvetlfz';



$img = $post['rawData'];
$imgHead = substr($img, 0, 22);
$img = str_replace($imgHead, '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = uniqid() . '.png';

//$output['data'][] = $success ? $file : 'Unable to save the file.';

$fileName = time() . $file;
//if(isset($_POST['upload'])){
$fileTempName = $file;
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

    $url = "http://{$bucketName}.s3.amazonaws.com/".$fileName;
    $output['data'][] = $url;

