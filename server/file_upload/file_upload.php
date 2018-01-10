<?php

if(!empty($_POST) && !empty($_FILES)){
    if(is_dir('owner_id_' . $_POST['ownerID'])) {
        if(is_dir('pet_id_' . $_POST['petID'])) {
            if (move_uploaded_file($_FILES['avatar']['tmp_name'], "../file_upload/owner_id_{$_POST['ownerID']}/pet_id_{$_POST['petID']}/upload_image/{$_FILES['avatar']['name']}")) {
                print('Your file was uploaded.');
                ?>
                <img src="../file_upload/owner_id_1/upload_image/<?= $_FILES['avatar']['name']; ?>">
                <?php
            } else {
                print('something went wrong!');
            }
        }else{
            mkdir(" ./'owner_id_' {$_POST['ownerID']}/'pet_id_' {$_POST['petID']}/upload_image");
        }
    }
}


?>


/**
 * Created by PhpStorm.
 * User: christin
 * Date: 1/9/18
 * Time: 16:13
 */