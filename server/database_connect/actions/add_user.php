<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/10/2018
 * Time: 2:54 PM
 */

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$query = "INSERT INTO `owner` (`ID`, `name`, `created`, `updated`, `level`, `email`, `password`) VALUES (NULL, '$post[name]', CURRENT_DATE(), CURRENT_TIMESTAMP, '1', '$post[email]', SHA1('$post[password]'))";
$giveMeMyID = "SELECT `ID` FROM `owner` WHERE `email` = '$post[email]'";


$result = mysqli_query($conn, $query);

$resultGiveMeMyID = mysqli_query($conn, $giveMeMyID);



if ($result) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;

        if($resultGiveMeMyID){
          if(mysqli_num_rows($resultGiveMeMyID) > 0){
            while ($row = mysqli_fetch_assoc($resultGiveMeMyID)) {
              $pet_objects = $row;
            }
            $output['success'] = true;
          }
        }

    } else {
        $output['errors'][] = 'no data available';

    }
}
else {
    $output['errors'][] = 'error in SQL query';
}




?>
