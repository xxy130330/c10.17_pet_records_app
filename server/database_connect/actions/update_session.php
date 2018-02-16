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
$auth = $post['auth'];
$logout = $post['logout'];
$output['logoutSuccess'] = false;
$vetAccess= $post['vetAccess'];

if ($logout) {
    //clear the session if the user is logging out
    session_destroy();
    $output['success'] = true;
    $output['logoutSuccess'] = true;
    $output['authorized'] = false;
    $output['vetAccessLevel']= null;
} else if (isset($post['id'])) {
    $authObj = [
        'auth' => $auth,
        'id' => $post['id'],
        'vetAccess'=> $vetAccess
    ];
    $_SESSION['petVetAuth'] = json_encode($authObj);

} else {
    //set the session auth to whatever is passed to the backend
//    $authObj = (object) array($id => $auth);
    $authObj = [
        'auth' => $auth,
    ];
    $_SESSION['petVetAuth'] = json_encode($authObj);
}
$output['success'] = true;
if ($auth) {
    $output['authorized'] = true;
    $output['vetAccess']= true;
} else {
    $output['authorized'] = false;
}
?>