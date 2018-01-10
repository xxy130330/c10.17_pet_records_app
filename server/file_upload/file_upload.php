<?php

if(!empty($_POST) && !empty($_FILES)){
    if(is_dir('owner_id_' . $_POST['ownerID'])) {
        if(is_dir('pet_id_' . $_POST['petID'])) {
            moveImage();
            } else {
                print('something went wrong!');
            }
        }else{
            mkdir(" ./pet_id_{$_POST['petID']}/upload_image");
            moveImage();
        }
    }else{
        mkdir(" ./owner_id{$_POST['ownerID']}/pet_id_{$_POST['petID']}/upload_image");
        moveImage();
}

function moveImage(){
    if (move_uploaded_file($_FILES['avatar']['tmp_name'], "../file_upload/owner_id_{$_POST['ownerID']}/pet_id_{$_POST['petID']}/upload_image/{$_FILES['avatar']['name']}")) {
        print('Your file was uploaded.');
        ?>
        <img src="../file_upload/owner_id_{$_POST['ownerID']}/pet_id_{$_POST['petID']}/upload_image/<?= $_FILES['avatar']['name']; ?>">
        <?php
    } else {
        print('something went wrong!');
    }
}


?>




