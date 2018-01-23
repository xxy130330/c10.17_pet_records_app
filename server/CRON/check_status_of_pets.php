<?php
require_once ('/var/www/petvet.tech/server/database_connect/connect.php');

$query = "DELETE FROM pets WHERE status='inactive' AND updated < DATE_SUB(NOW(), INTERVAL 1 YEAR)";
$result = mysqli_query($conn, $query);
if($result){
    if(mysqli_affected_rows($conn)>0){
        $message = date('Y-m-d H:i:s') . ': deleted '. mysqli_affected_rows($conn).' rows';
    }else{
        $message = date('Y-m-d H:i:s') . ': no rows deleted';
    }

}else{
    $message = 'error in SQL query';
}

print($message . "\n");

?>