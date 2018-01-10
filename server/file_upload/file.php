<?php

if(!empty($_POST) && !empty($_FILES)){
    if(!is_dir("owner_id_1")){
        mkdir("./owner_id_1");
        if(!is_dir(".pet_id_1")) {
            mkdir(".pet_id_1");
        }
    }

    moveImage();
}


function moveImage(){
    if(move_uploaded_file($_FILES['avatar']['tmp_name'], "./owner_id_1/pet_id_1/{$_FILES['avatar']['name']}")){
        print('Your file was uploaded.');
        ?>
        <img src="./owner_id_1/pet_id_1/<?=$_FILES['avatar']['name'];?>">
        <?php
    }else{
        print('something went wrong!');
    }
}


?>