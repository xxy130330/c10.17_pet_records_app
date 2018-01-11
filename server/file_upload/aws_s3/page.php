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

    $fileName = $_FILES['theFile']['name'];
    $fileTempName = $_FILES['theFile']['tmp_name'];

    //we'll continue our script from here in the next step!
}


?>/**
 * Created by PhpStorm.
 * User: christin
 * Date: 1/10/18
 * Time: 18:01
 */