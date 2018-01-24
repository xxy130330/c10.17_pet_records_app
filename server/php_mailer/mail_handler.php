<?php
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');

if (isset($activationLink)) {
    $mail = new PHPMailer;
    $mail->SMTPDebug = 0;           // Enable verbose debug output. Change to 0 to disable debugging output.

    $mail->isSMTP();                // Set mailer to use SMTP.
    $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
    $mail->SMTPAuth = true;         // Enable SMTP authentication


    $mail->Username = EMAIL_USER;   // SMTP username
    $mail->Password = EMAIL_PASS;   // SMTP password
    $mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
    $mail->Port = 587;              // TCP port to connect to
    $options = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    $mail->smtpConnect($options);
    $mail->From = 'petvetteam@gmail.com';  // sender's email address (shows in "From" field)
    $mail->FromName = 'The PetVet Team';   // sender's name (shows in "From" field)
    $mail->addAddress($post['email']);  // Add a recipient

//$mail->addAddress('ellen@example.com');                        // Name is optional
    $mail->addReplyTo('petvetteam@gmail.com');                          // Add a reply-to address
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'The PetVet Team';
    $mail->Body    = 'Thank you for signing up for PetVet, the easiest way to care for your pets health and happiness. Follow the link to activate your account: ' . $activationLink;
    $mail->AltBody = htmlentities('something went wrong');

    if(!$mail->send()) {
        $output['success'] = false;
        $output['message'] = $mail->ErrorInfo;
    } else {
//    echo 'Message has been sent';
        $output['emailSent'] = true;
    }
} else if ($post['contact']) {
    $mail = new PHPMailer;
    $mail->SMTPDebug = 0;           // Enable verbose debug output. Change to 0 to disable debugging output.

    $mail->isSMTP();                // Set mailer to use SMTP.
    $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
    $mail->SMTPAuth = true;         // Enable SMTP authentication


    $mail->Username = EMAIL_USER;   // SMTP username
    $mail->Password = EMAIL_PASS;   // SMTP password
    $mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
    $mail->Port = 587;              // TCP port to connect to
    $options = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    $mail->smtpConnect($options);
    $mail->From = 'petvetteam@gmail.com';  // sender's email address (shows in "From" field)
    $mail->FromName = 'PetVet Bot';   // sender's name (shows in "From" field)
    $mail->addAddress('shoblik@yahoo.com');  // Add a recipient

//$mail->addAddress('ellen@example.com');                        // Name is optional
    $mail->addReplyTo($post['email']); // Add a reply-to address
    $mail->addBCC('ccampos23@gmail.com');
    $mail->addBCC('sangwoo89118@gmail.com');
    $mail->addBCC('christin0708@gmail.com');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Contact Request from PetVet';
    $mail->Body    = $post['message'];
    $mail->AltBody = htmlentities('something went wrong');

    if(!$mail->send()) {
        $output['success'] = false;
        $output['message'] = $mail->ErrorInfo;
    } else {
//    echo 'Message has been sent';
        $output['success'] = true;
        $output['emailSent'] = true;
    }
}

?>
