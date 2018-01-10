<?php

if(!empty($_POST) && !empty($_FILES)){
    if(move_uploaded_file($_FILES['avatar']['tmp_name'], "../uploads/{$_FILES['avatar']['name']}")){ //将上传文件从临时存放处，转移到最终存放处
        print('Your file was uploaded.');
        ?>
        <img src="../uploads/<?=$_FILES['avatar']['name'];?>">
        <?php
    }else{
        print('something went wrong!');
    }
}






?>/**
 * Created by PhpStorm.
 * User: christin
 * Date: 1/9/18
 * Time: 16:13
 */