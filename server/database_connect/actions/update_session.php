<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 2/9/2018
 * Time: 9:45 AM
 */
session_start();

if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}
$id = $post['id'];
$auth = $post['auth'];
$logout = $post['logout'];

if ($logout) {
    //clear the session if the user is logging out
    session_destroy();
    $output['success'] = true;
} else {
    //set the session auth to whatever is passed to the backend
    $authObj = (object) array($id => $auth);
    $_SESSION['petVetAuth'] = json_encode($authObj);

    $output['success'] = true;
    if ($auth) {
        $output['authorized'] = true;
    } else {
        $output['authorized'] = false;
    }
}
?>