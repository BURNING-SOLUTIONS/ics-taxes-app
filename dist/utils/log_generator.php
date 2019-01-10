<?php


class LogGenerator
{

    function __construct()
    {

    }

    public function createLogFile(){

    }

    public function createLog($log_msg)
    {
        //file_put_contents(date('d-M-Y').".log", $log_msg);

        $log_filename = "logs";
        if (!file_exists($log_filename)) {
            // create directory/folder uploads.
            mkdir($log_filename, 0777, true);
        }
        $log_file_data = $log_filename . '/' . date('d-M-Y').'_hour_'.date('H').date('A').'.log';
        file_put_contents($log_file_data, $log_msg . "\r\n", FILE_APPEND);
    }

}

?>