<?php

if(!empty($_POST) && !empty($_FILES)){
    if(!is_dir("owner_id_1")) {
        mkdir("./owner_id_1");
        if(!is_dir("./owner_id_1/pet_id_1")) {
            mkdir("./owner_id_1/pet_id_1");
        }
    }

    moveImage();
}


function moveImage(){
    $newName = time().$_FILES['avatar']['name'];
    if (move_uploaded_file($_FILES['avatar']['tmp_name'], "../file_upload/owner_id_1/pet_id_1/{$newName}")) {
        print('Your file was uploaded.');
        ?>
        <img src="../file_upload/owner_id_1/pet_id_1/<?= $newName ?>">
        <?php
    } else {
        print('something went wrong!');
    }
}


?>




