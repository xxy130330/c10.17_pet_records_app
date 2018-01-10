<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/8/2018
 * Time: 2:29 PM
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$postJSON = file_get_contents('php://input');
$post = json_decode($postJSON, TRUE);

$PAGEACCESS = true;
require_once('connect.php');


$output = [
    'success' => false,
    'data' => [],
    'errors' => [],
];

if(empty($_GET['action'])){
    $_GET['action'] = 'get';
}
if(empty($_GET['resource'])){
    $_GET['action'] = 'pets';
}

switch($_GET['action']){
    case 'get':
        switch($_GET['resource']){
            case 'pets':{
                if(empty($_GET['petID'])){
                    require('./actions/pull_users_pets.php');
                }
                else {
                    //pull all pet records
                }
                break;
            }
            case 'record-item': {
                if (!empty($_GET['recordID'])) {
                    require('./actions/fetch_single_record_item.php');
                }
                else {
                    //pulls all record items
                     require('./actions/fetch_record_items.php');
                }
                break;
            }
        }
    case 'post':
        switch($_GET['resource']) {
            case 'record-item':
                if (!empty($post)) {
                    require('./actions/add_record_item.php');
                }
                break;
            case 'pet': {
                if (!empty($post)) {
                    require('./actions/add_pet.php');
                }
                break;
            }
        }
}

$output['data'] = $pet_objects;
$json_output = json_encode($output);

print($json_output);