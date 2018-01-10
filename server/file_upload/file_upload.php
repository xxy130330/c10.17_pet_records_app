<?php

if(!empty($_POST) && !empty($_FILES)){
    if(!folder_exists())
    if(move_uploaded_file($_FILES['avatar']['tmp_name'], "../file_upload/owner_id_1/upload_image/{$_FILES['avatar']['name']}")){
        print('Your file was uploaded.');
        ?>
        <img src="../file_upload/owner_id_1/upload_image/<?=$_FILES['avatar']['name'];?>">
        <?php
    }else{
        print('something went wrong!');
    }
}


?>


/**
 * Created by PhpStorm.
 * User: christin
 * Date: 1/9/18
 * Time: 16:13
 */