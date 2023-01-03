<?php

// edit rolly
$url = 'http://10.14.200.20:3333/whatsauth';
$ch = curl_init($url);
$data = array(
    'uuid' => $_POST['uuid']
);
$payload = json_encode($data);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);
$response=json_decode($result, true);
echo $result;
?>