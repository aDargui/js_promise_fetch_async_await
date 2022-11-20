<?php
//take raw data form the request
$json = file_get_contents('php://input');

//converts it into PHP object
$data = json_decode($json);
$submittedText = $data->text;
$message = "Vous m'avez dit : ". $submittedText;
echo json_decode($message)

?>
