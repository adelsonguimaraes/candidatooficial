<?php

Class WppAPI {
    // attr
    protected $my_apikey; 

    public function __construct() {
        $this->my_apikey  = "Y2RA5CT2I6GF28MHS3JW";
    }
    
    public function send ($number, $msg, $api) {
        // Send Message 
        $api_url = "http://panel.apiwha.com/send_message.php"; 
        $api_url .= "?apikey=". urlencode ($api); 
        $api_url .= "&number=". urlencode ($number); 
        $api_url .= "&text=". urlencode ($msg); 
        $my_result_object = json_decode(file_get_contents($api_url, false)); 
        // echo "<br>Result: ". $my_result_object->success; 
        // echo "<br>Description: ". $my_result_object->description; 
        // echo "<br>Code: ". $my_result_object->result_code;
        return $my_result_object;
    }
}

// $wpp = new WppAPI();
// $wpp->send('+559293138892', 'Testando API do Whats App');

// return
// Result: 1
// Description: Message queued
// Code: 0

?>