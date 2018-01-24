<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

function handleErrors($errorNum, $errorStr, $errorFile){
    $message = date('H:i:s h:m:s') . " error from " . $_SERVER['PHP_SELF'] . " $errorNum : $errorStr in $errorFile \n at IP " . $_SERVER['REMOTE_ADDR'];
//    $message = date('H:i:s h:m:s') . " error from " . $_SERVER['PHP_SELF'] . " $errorNum : $errorStr in $errorFile \n at IP " . $_SERVER['REMOTE_ADDR'] .
//        'GET: ' . print_r($_GET, true) . ' POST: ' . print_r($_POST,true) . ' SERVER: ' . print_r($_SERVER);
    error_log($message);  //var/log/apache2/error.log
}

set_error_handler('handleErrors');

$postJSON = file_get_contents('php://input');
$post = json_decode($postJSON, TRUE);

$PAGEACCESS = true;
require_once ('./connect.php');
//require_once('../file_upload/aws_s3/credential.php');


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
try{
switch($_GET['action']) {
    case 'get':
        switch ($_GET['resource']) {
            case 'pets': {
                if (empty($_GET['petID'])) {
                    //require('actions/pull_pet_records.php?ID=1');


                    require('./actions/pull_users_pets.php');
                } else {
                    //pull all pet records
                }
                break;
            }
            case 'record-item': {
                if (!empty($_GET['recordID'])) {
                    require('./actions/fetch_single_record_item.php');
                } else {
                    //pulls all record items
                    require('./actions/fetch_record_items.php');
                }
                break;
            }
            case 'client_list': {
                if (!empty($_GET['vetID'])) {
                    require('./actions/read_vets_owners.php');
                }
                else{

                }
                break;
            }
            case 'pets_for_vet': {
                if (!empty($_GET['ownerID']) && !empty($_GET['vetID'])) {
                    require('./actions/read_client_pets_for_vet.php');
                }
                break;
            }
            case 'activate_account': {
                if (!empty($_GET['actNum'])) {
                    require('./actions/update_activate_account.php');
                }
                break;
            }

        }
    case 'post':
        switch ($_GET['resource']) {
            case 'record-item':
                if (!empty($post)) {
                    require('./actions/add_record_item.php');
                } else{
                    throw new Exception('Must have a post variable when getting resource record-item');
                }
                break;
            case 'login':
                if (!empty($post)) {
                    require('./actions/login.php');
                }else{
                    throw new Exception('Must have a post variable when getting resource login');
                }
                break;
            case 'vetlogin':
                if (!empty($post)) {
                    require('./actions/vet_login.php');
                }else{
                    throw new Exception('Must have a post variable when getting resource vet_login');
                }
                break;

            case 'pet':
                if (!empty($post)) {
                    require('./actions/add_pet.php');
                }else{
                    throw new Exception('Must have a post variable when getting resource pet');
                }
                break;
            case 'deletePet':
                if (!empty($post)) {
                    require('./actions/soft_delete_pet.php');
                }else{
                    throw new Exception('Must have a post variable when getting resource deletePet');
                }
                break;

            case 'register':
                if (!empty($post)) {
                    require('./actions/add_user.php');
                }else{
                    throw new Exception('Must have a post variable when getting resource register');
                }
                break;

            case 'upload-item': {
//                if (empty($post)) {
                    require('../file_upload/aws_s3/page.php');
//                }else{
//                    throw new Exception('Must have a post variable when getting resource upload-item');
//                }
                break;
            }
            case 'deleteRecord': {
                if (!empty($post)) {
                    require('./actions/soft_delete_record.php');
                }else{
                    throw new Exception('Must have a post variable when getting resource delete-record');
                }
                break;
            }
            case 'registerVet': {
                if (!empty($post)) {
                    require('./actions/add_vet.php');
                }else{
                    throw new Exception('Must have a post variable when getting resource register-vet');
                }
                break;
            }
            case 'editMedicalRecord': {
                if (!empty($post)) {
                    require('./actions/edit_medical_record.php');
                }else{
                    throw new Exception('Must have a post variable when getting resource edit medical record');
                }
                break;
            }
            case 'petVetConnect': {
                if (!empty($post)) {
                    require('./actions/connect_pet_to_vet.php');
                }else{
                    throw new Exception('Must have a post variable when getting resource pet vet connect');
                }
                break;
            }
            case 'disconnectPet': {
                if (!empty($post)) {
                    require('./actions/update_delete_pet_from_vet.php');
                }
            }
        }

    }
} catch( Exception $err){
    $message = date('H:i:s h:m:s') . " error from " . $_SERVER['PHP_SELF'] . " $err \n at IP {$_SERVER['REMOTE_ADDR']} ";
    error_log($message);
}



if (isset($pet_objects)) {
    $output['data'] = $pet_objects;
}

$json_output = json_encode($output);

if ($_GET['resource'] === 'activate_account') {
    print('Your account has been activated! Thanks for using PetVet, the easiest way to care for your pets health and happiness');

} else {
    print($json_output);
}

