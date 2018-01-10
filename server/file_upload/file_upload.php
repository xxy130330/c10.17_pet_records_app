<?php

if(!empty($_POST) && !empty($_FILES)){
    if(!is_dir('owner_id_' . $_POST['ownerID'])) {
        mkdir("./owner_id_{$_POST['ownerID']}");
    }
    if(!is_dir("./owner_id_{$_POST['ownerID']}/pet_id_{$_POST['petID']}")) {
        mkdir("./owner_id_{$_POST['ownerID']}/pet_id_{$_POST['petID']}");
    }
    moveImage();
}


function moveImage(){
    $pathInfo = pathinfo($_FILES['avatar']['name']);
    $newName = $_FILES['avatar']['name'] . time() . $pathInfo['extension'];
    if (move_uploaded_file($_FILES['avatar']['tmp_name'], "../file_upload/owner_id_{$_POST['ownerID']}/pet_id_{$_POST['petID']}/{$newName}")) {
        print('Your file was uploaded.');
        ?>
        <img src="../file_upload/owner_id_{$_POST['ownerID']}/pet_id_{$_POST['petID']}/<?= $_FILES['avatar']['name']; ?>">
        <?php
    } else {
        print('something went wrong!');
    }
}


?>




