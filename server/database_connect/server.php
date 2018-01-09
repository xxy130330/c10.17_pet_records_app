<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 1/8/2018
 * Time: 2:29 PM
 */
header("Access-Control-Allow-Origin: *");



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
                    require('./actions/pull_pet_records.php');
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
}

$output['data'] = $pet_objects;
$json_output = json_encode($output);

print($json_output);