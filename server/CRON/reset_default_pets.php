<?php
/**
 * Created by PhpStorm.
 * User: shobl
 * Date: 3/6/2018
 * Time: 8:57 AM
 */

require_once ('../database_connect/connect.php');

$output = [
  'success' => false,
];

//delete all pets from test account
$query = 'DELETE FROM `pets`
          WHERE `ownerID` = "12"';
$result = mysqli_connect($conn, $query);

if ($result) {
    //restore pet defaults
    $query = "INSERT INTO `pets` (`ID`, `ownerID`, `name`, `avatar`, `created`, `updated`, `status`, `metadata`, `DOB`, `animal_type`, `vet`) VALUES
              (42, 12, 'Peter', 'https://petvetlfz.s3.amazonaws.com/1519157495./images/5a8c80f7a7184.png', '2018-02-20 20:11:35', '2018-02-20 23:21:06', 'active', '0', '2018-02-01', 'Bunny', 'Paul Campos'),
              (43, 12, 'Balto', 'https://petvetlfz.s3.amazonaws.com/1519157523./images/5a8c811340693.png', '2018-02-20 20:12:03', '2018-02-20 23:21:31', 'active', '0', '2018-01-11', 'Alaskan Husky', 'Paul Campos'),
              (44, 12, 'Fido', 'https://petvetlfz.s3.amazonaws.com/1519157563./images/5a8c813bedad0.png', '2018-02-20 20:12:44', '2018-02-23 01:25:56', 'active', '0', '2018-01-18', 'Cat', 'Paul Campos'),
              (45, 12, 'Poly', 'https://petvetlfz.s3.amazonaws.com/1519157611./images/5a8c816b60318.png', '2018-02-20 20:13:31', '2018-02-21 22:23:23', 'active', '0', '2018-02-08', 'Blue Jay', 'No vet connected')";
    $res = mysqli_query($conn, $query);
    if (!$res) {
        $output['success'] = false;
        $output['errors'][] = 'unable to insert pet defaults';
    }
} else {
    $output['errors'][] = 'Unable to delete pets';
    $output['success'] = false;
}

//delete all medical records from test account
    $defaultPetIDs = ['42', '43', '44', '45'];
    $defaultRecordQueries = ["INSERT INTO `medical_records` (`ID`, `title`, `type`, `petID`, `record_data`, `treatment_date`, `status`, `updated`) VALUES
(21, ' Overgrown Teeth ', ' hardcoded for now ', 42, ' A rabbitâ€™s teeth continually grow throughout its life and if a rabbit is not constantly grinding their teeth down by eating fibre we start to see their molar teeth forming sharp spikes that damage their cheeks and tongue. This causes pain that makes them reluctant or unable to eat.  The incisors at the front of the mouth can, in severe cases grow around in a curl meaning rabbits cannot close their mouth or eat at all.  Once a rabbit stops eating their gut stops working and they can die. ', '2017-11-30', 'active', '2018-02-20'),
(22, ' Snuffles ', ' hardcoded for now ', 42, ' Nasal discharge or are sniffling.\n matted paws, sneezing, and watery eyes.\n ', '2017-11-09', 'active', '2018-02-20'),
(23, ' Ear Mites ', 'hardcoded for now', 42, ' Mild to moderate itching around the ear, head, and neck.\nTiny little bugs that set up shop in your rabbitâ€™s ears. The ear looks really crusty, brown, and itchy. ', '2018-02-19', 'active', '2018-03-06');
", "INSERT INTO `medical_records` (`ID`, `title`, `type`, `petID`, `record_data`, `treatment_date`, `status`, `updated`) VALUES
(24, ' Tick Treatment ', ' hardcoded for now ', 43, ' Received A and C type tick treatments ', '2018-02-19', 'active', '2018-02-20'),
(25, ' Nail Trim ', ' hardcoded for now ', 43, ' Needed a nail trim due to overgrown nails, the vet wants me to check back in 6 months. ', '2018-02-20', 'active', '2018-02-20'),
(26, ' Eye Infection ', ' hardcoded for now ', 43, ' Minor eye infection received by poor water conditions at the local lake. We received multiPlex eye wash to use 3 times daily for 6 weeks. ', '2017-01-30', 'active', '2018-02-20');", "INSERT INTO `medical_records` (`ID`, `title`, `type`, `petID`, `record_data`, `treatment_date`, `status`, `updated`) VALUES
(27, ' Ear Infection ', ' hardcoded for now ', 44, ' Received K9 Plus ear medication to be used for five weeks twice daily. ', '2018-01-31', 'inactive', '2018-02-23'),
(28, ' Deworming ', ' hardcoded for now ', 44, ' Needed some MX Feline deworming medication to be taken once a day for two weeks. ', '2017-11-29', 'inactive', '2018-02-23');", "INSERT INTO `medical_records` (`ID`, `title`, `type`, `petID`, `record_data`, `treatment_date`, `status`, `updated`) VALUES
(29, ' Eye Infection ', ' hardcoded for now ', 45, ' Polly needed some Aviary Eye Treatment Plus for 2 weeks administered 3 times a day\n ', '2016-10-30', 'active', '2018-02-20'),
(30, ' Chipped Beak ', ' hardcoded for now ', 45, ' Polly needed beak reconstruction surgery after a careless low altitude maneuver. ', '2018-01-29', 'active', '2018-02-20');"];

    for ($i=0; $i < 4; $i++) {
        $query = 'DELETE FROM `medical_records`
          WHERE `petID` = $defaultPetIDs[$i]';
        $result = mysqli_connect($conn, $query);
        if (!$result) {
            $output['success'] = false;
            $output['errors'][] = 'couldn\'t delete a pets medical records';
        }
        $res = mysqli_query($conn, $defaultRecordQueries[$i]);
        if (!$res) {
            $output['success'] = false;
            $output['errors'][] = 'couldn\'t add pet medical record defaults';
        }
    }

    $output = json_encode($output);
    print($output);

?>