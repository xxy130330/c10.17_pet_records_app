<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 2/9/2018
 * Time: 10:06 AM
 */
session_start();
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}
$id = $post['id'];
$auth = json_decode($_SESSION['petVetAuth']);
$output['authorized'] = $auth->$id;
$output['success'] = true;
?>