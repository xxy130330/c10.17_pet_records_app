<?php
require_once("config.php");
set_time_limit(0);
header("Content-type:text/html;charset=utf-8");
if($_SERVER['REMOTE_ADDR'] != '52.53.120.129') {
    header('HTTP 1.1/404');
}
$line = 40;
if(function_exists('ini_get')) {
    $error_log = ini_get('error_log');
} else {
    $error_log = "/var/www/log/php_error.log";
}
$starttime = time();
readlog($error_log, $line, $starttime);

function readlog($file, $linefromlast, $starttime){
    $i = 0;
    $line = 0;
    $fp = @fopen($file, "r");
    while(stream_get_line($fp, 8192, "n")) {
        $line++;
    }
    fseek($fp, 0);
    if($fp) {
        while(!feof($fp)) {
            $i++;
            $buffer = fgets($fp, 8192);
            if($i <= ($line - $linefromlast)) {
                continue;
            }
            echo $buffer . "<br />";
        }
        fclose($fp);
    }
    $endtime = time();
    $havetime = $endtime - $starttime;
    echo "In" . $line . "find out the latest record" . $linefromlast . "timing" . $havetime . "second";
}
?>
/**
 * Created by PhpStorm.
 * User: christin
 * Date: 1/20/18
 * Time: 12:07
 */