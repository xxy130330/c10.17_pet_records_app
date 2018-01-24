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


$postJSON = file_get_contents('php://input');
$post = json_decode($postJSON, TRUE);


//function base64_to_jpeg($base64_string) {
//    // open the output file for writing
////    $ifp = fopen( $output_file, 'wb' );
//
//    // split the string on commas
//    // $data[ 0 ] == "data:image/png;base64"
//    // $data[ 1 ] == <actual base64 string>
//    $data = explode( ',', $base64_string );
//
//    // we could add validation here with ensuring count( $data ) > 1
//    $output_file = base64_decode( $data[ 1 ] ) ;
//
//    // clean up the file resource
////    fclose( $ifp );
//
//    return $output_file;
//}

$result = base64_to_jpeg($post['rawData']);


$s3 = new S3(awsAccessKey, awsSecretKey);
//print_r($_POST);
$bucketName = 'petvetlfz';

$fileName = time() . $_FILES['file']['name'];

//if(isset($_POST['upload'])){

    $fileTempName = $_FILES['file']['tmp_name'];


define('UPLOAD_DIR', 'images/');
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = UPLOAD_DIR . uniqid() . '.png';
$success = file_put_contents($file, $data);
print $success ? $file : 'Unable to save the file.';

//    if(!isset($bucketName)){
//        $s3->putBucket($bucketName, S3::ACL_PUBLIC_READ);
//    }
//
//    if ($s3->putObjectFile($fileTempName, $bucketName, $fileName, S3::ACL_PUBLIC_READ)) {
////        echo "We successfully uploaded your file.";
//        $output['success'] = true;
//    }




//$output['data'][] = $url;
//$output['errors'][] = $url;
//require_once ('./credential.php');
//require_once ('../../file_upload/update_avatar_link_db.php');

//$url = "http://{$bucketName}.s3.amazonaws.com/".$fileName;
//
//$output['data'][] = $url;


//require_once '../../aws/aws-autoloader.php';
//use Aws\S3\S3Client;

//
//$image_parts = explode(";base64,", $post['rawData']);
////$output['data'][] = $image_parts;
//$image_type_aux = explode("image/", $image_parts[0]);
//$image_type = $image_type_aux[1];
//$image_base64 = $image_parts[1];
////$image_base64 = base64_decode($image_base64);
//$output['data'][] = $image_base64;
//$output['data'][] = $post['rawData'];
//
//$dateTime = new DateTime();
//$fileName = $dateTime->getTimestamp() . "." . $image_type;
//
//$s3Client = S3Client::factory(array(
//    'region' => 'eu-west-1',
//    'version' => '2006-03-01',
//    'credentials' => array(
//        'key'    => $accessKey,
//        'secret' => $secretKey,
//    )
//));
//
//try {
//    $result = $s3Client->putObject(array(
//        'Bucket'          => $bucketName,
//        'Key'             => 'banners/' . $fileName,
//        'Body'            => $image_base64,
//        'ContentType'     => 'image/' . $image_type,
//        'ACL'             => 'public-read'
//    ));
//    echo $result['ObjectURL'] . "\n";
//    $output['errors'][] = $result['ObjectURL'] . "\n";
//} catch(S3Exception $e) {
//    echo $e->getMessage() . "\n";
//    $output['errors'][] = $e->getMessage() . "\n";
//
//}


?>
