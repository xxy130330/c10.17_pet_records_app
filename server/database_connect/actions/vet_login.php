<?php
/**
 * Created by PhpStorm.
 * User: christin
 * Date: 1/16/18
 * Time: 12:12
 */



if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}



    if (!empty($post)) {
        $output['success'] = true;
        $password = sha1($post['password']);
    }
    unset($post['password']);

    $username = $post['username'];

    //Sanitizing inputs
    $sanitizeUsername1 = stripslashes($username);
    $sanitizePassword1 = stripslashes($password);
    $sanitizedUsername = htmlentities($sanitizeUsername1);
    $sanitizedPassword = htmlentities($sanitizePassword1);
    //////////////////////////////////////////////////////


$query = "SELECT * FROM `vets` WHERE BINARY email = '$sanitizedUsername' AND password = '$sanitizedPassword'";

$result = mysqli_query($conn, $query);

if ($result) {
    if(mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $output['data'] = 'successful_login';
            $output['loginSuccess'] = true;
            $output['ownerID'] = $row['ID'];
        }
    } else {
        $output['errors'][] = 'Incorrect username or password';

    }
} else {
    $output['errors'][] = 'Error in SQL query';
}


    unset($username, $password,  $sanitizeUsername1, $sanitizePassword1,  $sanitizedUsername, $sanitizedPassword);
?>
