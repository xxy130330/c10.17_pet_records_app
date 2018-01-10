<?php

if(!empty($_POST) && !empty($_FILES)){
    if(move_uploaded_file($_FILES['avatar']['tmp_name'], "../uploads/{$_FILES['avatar']['name']}")){
        print('Your file was uploaded.');
        ?>
        <img src="../uploads/<?=$_FILES['avatar']['name'];?>">
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