<?php
if(!isset($PAGEACCESS) || $PAGEACCESS===false){
    die('NO DIRECT ACCESS ALLOWED');
}

$username = $post['username'];

if (!empty($post)) {
    $output['success'] = true;
    $password = sha1($post['password']);
}
$output['loginSuccess'] = false;
    //Don't store the password for longer than we need to
    unset($post['password']);

    //Sanitizing inputs
    $sanitizeUsername1 = stripslashes(strtolower($username));
    $sanitizedUsername = htmlentities($sanitizeUsername1);

    $sanitizePassword1 = stripslashes($password);
    $sanitizedPassword = htmlentities($sanitizePassword1);

$query = "SELECT * FROM `vets`
          WHERE BINARY email = '$sanitizedUsername'
          AND password = '$sanitizedPassword'";

$result = mysqli_query($conn, $query);

if ($result) {
    if(mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            //check if vet is active
            if ($row['status'] === 'active') {
                $output['accessLevel'] = $row['level'];
                $output['loginSuccess'] = true;
                $output['vetID'] = $row['ID'];
                $output['active'] = true;
            } else {
                $output['active'] = false;
            }
        }
    } else {
        $output['errors'][] = 'Incorrect username or password';
    }
} else {
    $output['errors'][] = 'Error in SQL query';
}
    unset($username, $password,  $sanitizeUsername1, $sanitizePassword1,  $sanitizedUsername, $sanitizedPassword);
?>
