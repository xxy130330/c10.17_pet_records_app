<?php

$postJSON = file_get_contents('php://input');
$post = json_decode($postJSON, TRUE);



//if(!empty($post) && !empty($_FILES)){
//    if(!is_dir("owner_id_ {$post['ownerID']}")) {
//        mkdir("./owner_id_{$post['ownerID']}");
//        if(!is_dir("./owner_id_{$post['ownerID']}/pet_id_{$post['petID']}")) {
//            mkdir("./owner_id_{$post['ownerID']}/pet_id_{$post['petID']}");
//        }
//    }
//    moveImage($post);
//}
//
//
//function moveImage($post){
//    $newName = time() . $_FILES['avatar']['name'];
//    if (move_uploaded_file($_FILES['avatar']['tmp_name'], "../file_upload/owner_id_{$post['ownerID']}/pet_id_{$post['petID']}/{$newName}")) {
//        print('Your file was uploaded.');
//        ?>
<!--        <img src="../file_upload/owner_id_{$_POST['ownerID']}/pet_id_{$_POST['petID']}/--><?//= $newName ?><!--">-->
<!--        --><?php
//    } else {
//        print('something went wrong!');
//    }
//}


?>




