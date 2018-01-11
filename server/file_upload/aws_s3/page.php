<?php
//include the S3 class
if (!class_exists('S3'))require_once('S3.php');

//AWS access info
require_once('credential.php');
if (!defined('awsAccessKey')) define('awsAccessKey', $accessKey);
if (!defined('awsSecretKey')) define('awsSecretKey', $secretKey);


//instantiate the class
$s3 = new S3(awsAccessKey, awsSecretKey);

//check whether a form was submitted
if(isset($_POST['Submit'])){

    $fileName = $_FILES['theFile']['name']; //rename the file name by adding current timestamp
    $fileTempName = $_FILES['theFile']['tmp_name'];

//create a new bucket
    $s3->putBucket("image_folder", S3::ACL_PUBLIC_READ);

//move the file
if ($s3->putObjectFile($fileTempName, "image_folder", $fileName, S3::ACL_PUBLIC_READ)) {
    echo "We successfully uploaded your file.";
}else{
    echo "Something went wrong while uploading your file... sorry.";
}}


//$contents = $s3->getBucket("image_folder");
//foreach ($contents as $file){
//
//    $fname = $file['name'];
//    $furl = "http://image_folder.s3.amazonaws.com/{$fname}";
//
//    //output a link to the file
//    echo "<a href=\"$furl\">$fname</a><br />";
//}

?>
/**
 * Created by PhpStorm.
 * User: christin
 * Date: 1/10/18
 * Time: 18:01
 */